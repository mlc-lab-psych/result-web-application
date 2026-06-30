import React, {useEffect, useState} from "react"
import {onValue, ref} from "firebase/database";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Footer from "../components/Footer";

export default function DataTable(props){
    let db = props.db;

    const [data, setData] = useState({})
    const [headers, setHeaders] = useState([])
    const [showTable, setShowTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [showFilterOverlay, setShowFilerOverlay] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [appliedFilter, setAppliedFilter] = useState(null);
    const pageSize = 12;

    const [sortOrder, setSortOrder] = useState("desc");

    const applySelectedFilter = () => {
        setAppliedFilter(selectedFilter);
        setShowFilerOverlay(false);
        setCurrentPage(0);
    };

    function retrieveHeaders(data){
        let tempArray = []
        for(let i = 0; i < 20; i++){
            Object.keys(data[i]).forEach(value => {
                if (!tempArray.includes(value)) {
                    tempArray.push(value);
                }
            })
        }
        setHeaders(tempArray)
    }

    function getTimestampFromKey(key) {
        return Number(key.split("-")[1]);
    }

    useEffect(() => {
            let pathDB = 'users-new';

            if (props.reference) {
                pathDB = props.reference

            } else if (props.sharedDB) {
                if(props.session === 1){
                    pathDB = 'users-new-session-1'
                }
                else if (props.session === 2){
                    pathDB = 'users-new-session-2'
                }
                else if (props.session === 3){
                    pathDB = 'users-new-reverse'
                }
            } 
        
            const url = "https://result-web-application.vercel.app//firebase"
            const payload = {
                "name": db,
                "url": props.url,
                "reference": pathDB
            }

            console.log(payload)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then((data) => {
                setData(data)
                retrieveHeaders(data[Object.keys(data)[0]])
                setShowTable(true);
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
        },
    [])

    const allResponses =  Object.entries(data).flatMap(([key, responses]) =>
        responses.map(r => ({ ...r, firebaseKey: key }))
    );

    let filteredResponses = [...allResponses];

    if (appliedFilter === "removeNulls") {
        filteredResponses = filteredResponses.filter(r =>
            r.session_id !== "NULL" &&
            r.study_id !== "NULL" &&
            r.session_id !== "" &&
            r.study_id !== ""
        );
    }

    if (appliedFilter === "trialType") {
        filteredResponses = filteredResponses.filter(r =>
            r.trial_type && r.trial_type !== ""
        );
    }

    if (appliedFilter === "order") {
        filteredResponses = filteredResponses.filter(r =>
            r.order !== undefined && r.order !== null && r.order !== ""
        );
    }

    filteredResponses.sort((a, b) => {
        const timeA = getTimestampFromKey(a.firebaseKey);
        const timeB = getTimestampFromKey(b.firebaseKey);
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });

    if (appliedFilter === "trialType") {
        filteredResponses.sort((a, b) =>
            a.trial_type.localeCompare(b.trial_type)
        );
    }

    const sortedResponses = filteredResponses

    const paginatedData = sortedResponses.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const totalPages = Math.ceil(sortedResponses.length / pageSize);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

    const exportToCSV = () => {
        let csvContent = headers.join(",") + "\n";

        Object.values(data).flat().forEach(response => {
            const row = headers.map(header => {
                const value = response[header];
                if (isObject(value)) return '""';
                if (typeof value === 'boolean') return value.toString();
                return value !== undefined && value !== null ? `"${value}"` : '""';
            }).join(",");
            csvContent += row + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "table_data.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportDemoGraphicToCSV = () => {
        const dynamicHeaders = new Set();

        Object.values(data).forEach(userResponses => {
            userResponses.forEach(user => {
                if (isObject(user.response)) {
                    Object.keys(user.response).forEach(key => {
                        dynamicHeaders.add(key);
                    });
                }
            });
        });

        const hasSonaId = Object.values(data).some(userResponses =>
            userResponses[0].sona_id !== undefined
        );

        const csvHeaders = hasSonaId
            ? ["sona_id", ...Array.from(dynamicHeaders)]
            : ["worker_id", ...Array.from(dynamicHeaders)];

        let csvContent = csvHeaders.join(",") + "\n";

        Object.values(data).forEach(userResponses => {
            const rowData = hasSonaId ?
                {sona_id: userResponses[0].sona_id} :
                {worker_id: userResponses[0].worker_id};

            userResponses.forEach(user => {
                if (isObject(user.response)) {
                    csvHeaders.forEach(header => {
                        if (header !== "worker_id" && !rowData[header]) {
                            const value = user.response[header];
                            if (value !== undefined && value !== null) {
                                rowData[header] = value;
                            }
                        }

                        else if(header !== "sona_id" && !rowData[header]){
                            const value = user.response[header];
                            if (value !== undefined && value !== null) {
                                rowData[header] = value;
                            }
                        }
                    });
                }
            });

            const row = csvHeaders.map(header => {
                const value = rowData[header];
                return value !== undefined && value !== null ? `"${value}"` : '""';
            }).join(",");

            csvContent += row + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "demographics_data.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const exportAudio = async () => {
        const zip = new JSZip();

        const allResponses = Object.values(data).flat();

        const usersMap = {};
        let count = 1

        function capitalizeFirstLetter(string) {
            if (string){
                return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
            }

        }

        allResponses.forEach(entry => {
            if (!entry.response_audio) return;

            const subject = entry.subject || "unknown_user";
            if (!usersMap[subject]) usersMap[subject] = [];

            usersMap[subject].push({
                filename: entry.filename || capitalizeFirstLetter(entry.word) + '_' + capitalizeFirstLetter(entry.phase) + '.wav',
                base64Audio: entry.response_audio,
            });

            count += 1
        });

        count = 0

        for (const [user, files] of Object.entries(usersMap)) {
            const userFolder = zip.folder(user);
            for (const file of files) {
                const base64Data = file.base64Audio.split(",").pop(); // remove data:... part if present
                userFolder.file(file.filename, base64Data, { base64: true });
            }
        }

        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, "user_audio_files.zip");
    }

    return(
        <main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop:"72px",
            maxWidth:"unset"
        }}>
            {showTable ? (
                <>
                    <div className={"data-table-div"}>
                        <h1>
                            {props.experimentName}
                        </h1>
                        <div className={"table-filters-buttons"}>
                            <div className={"table-data-buttons"}>
                                <button onClick={exportToCSV}
                                        className={"data-buttons"}
                                >
                                    Download Responses CSV
                                </button>

                                {props.audio ?
                                    <button onClick={exportAudio}
                                            className={"data-buttons"}
                                    >
                                        Download Audio Files
                                    </button> :
                                    <button onClick={exportDemoGraphicToCSV}
                                            className={"data-buttons"}
                                    >
                                        Download Demographic CSV
                                    </button>
                                }
                            </div>

                            <div className={"filters"}>
                                <button
                                    onClick={() => setSortOrder("asc")}
                                    className={`filter-buttons ${sortOrder === "asc" ? "active-filter" : "inactive-filter"}`}
                                >
                                    Ascending Date ↑
                                </button>

                                <button
                                    onClick={() => setSortOrder("desc")}
                                    className={`filter-buttons ${sortOrder === "desc" ? "active-filter" : "inactive-filter"}`}
                                >
                                    Descending Date ↓
                                </button>
                                <button
                                    onClick={() => setShowFilerOverlay(!showFilterOverlay)}
                                    className={'filter-buttons inactive-filter'}
                                >
                                    Filters
                                </button>
                            </div>
                        </div>
                        {
                            showFilterOverlay ? (
                                <div className={"filter-overlay"}>
                                    <div className={"filter-overlay-div"}>
                                        <div className={"filter-radio-div"}>
                                            <h2>
                                                Filter User Response
                                            </h2>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="responseFilter"
                                                    value="removeNulls"
                                                    checked={selectedFilter === "removeNulls"}
                                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                                />
                                                Remove Null Session IDs & Study IDs
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="responseFilter"
                                                    value="trialType"
                                                    checked={selectedFilter === "trialType"}
                                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                                />
                                                Filter by Trial Type
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="responseFilter"
                                                    value="order"
                                                    checked={selectedFilter === "order"}
                                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                                />
                                                Filter by Order
                                            </label>
                                        </div>
                                        <div className={"filter-basic-buttons"}>
                                            <button
                                                className={"apply-button"}
                                                onClick={applySelectedFilter}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                onClick={() => setShowFilerOverlay(!showFilterOverlay)}
                                                className={"close-button"}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) :
                                <></>
                        }
                        <div style={{maxWidth: '100%', overflowY: 'auto'}}>
                            <table style={{
                                borderCollapse: 'collapse',
                                marginLeft:'32px'
                            }}>
                                <thead>
                                    <tr className={"table-header"}>
                                        {headers.map((header, index) => (
                                            header !== "view_history" ?
                                                <th key={index}>{header}</th>
                                                :
                                                <></>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                {paginatedData.map((response, responseIndex) => (
                                    <tr key={responseIndex} style={{
                                        backgroundColor: responseIndex % 2 === 0 ? '#f2f2f2' : 'white'
                                    }}>
                                        {headers.map((header, colIndex) => (
                                            header !== "view_history" ?
                                                <td key={colIndex}>
                                                    {
                                                        isObject(response[header])
                                                            ? ""
                                                            : typeof response[header] === 'boolean'
                                                                ? response[header].toString()
                                                                : response[header] ?? ""
                                                    }
                                                </td>
                                                :
                                                <></>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px',}}>
                            <button onClick={handlePreviousPage} disabled={currentPage === 0} style={{
                                padding: '12px 18px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                backgroundColor: currentPage === 0 ? '#ddd' : 'black',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                fontWeight:'600'
                            }}>
                                Previous
                            </button>
                            <span style={{
                                fontSize: '16px',
                            }}> Page {currentPage + 1} of {totalPages} </span>
                            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1} style={{
                                padding: '12px 18px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                backgroundColor: currentPage >= totalPages - 1 ? '#ddd' : 'black',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                fontWeight:'600'
                            }}>
                                Next
                            </button>
                        </div>
                    </div>
                    <Footer/>
                </>
            ) : (
                <div className={"loading-div"}>
                    <p>Loading Table</p>
                </div>

            )}
        </main>
    )
}