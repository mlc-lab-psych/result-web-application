import React, { useState } from "react";
import Footer from "../components/Footer";

export default function AddJSONtoCSV() {
    const [data, setData] = useState({});
    const [headers, setHeaders] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [showFilterOverlay, setShowFilerOverlay] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [appliedFilter, setAppliedFilter] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");

    const [fileName, setFileName] = useState(null);
    const [error, setError] = useState(null);
    const [pathOptions, setPathOptions] = useState(null);

    const pageSize = 12;

    const applySelectedFilter = () => {
        setAppliedFilter(selectedFilter);
        setShowFilerOverlay(false);
        setCurrentPage(0);
    };

    function retrieveHeaders(rawData) {
        const seen = new Set();
        Object.values(rawData).forEach(responses => {
            if (Array.isArray(responses)) {
                responses.forEach(response => {
                    if (response && typeof response === "object") {
                        Object.keys(response).forEach(key => seen.add(key));
                    }
                });
            }
        });
        setHeaders(Array.from(seen));
    }

    function getTimestampFromKey(key) {
        const ts = Number(key.split("-")[1]);
        return Number.isNaN(ts) ? 0 : ts;
    }

    function looksLikeResponseMap(obj) {
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
        const values = Object.values(obj);
        return values.length > 0 && values.every(v => Array.isArray(v));
    }

    function loadData(responseMap) {
        setData(responseMap);
        retrieveHeaders(responseMap);
        setShowTable(true);
        setPathOptions(null);
        setCurrentPage(0);
        setAppliedFilter(null);
        setSelectedFilter(null);
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError(null);
        setFileName(file.name);
        setPathOptions(null);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);

                if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
                    throw new Error("This doesn't look like a Firebase export — expected a JSON object.");
                }
                let candidates = [];

                if (looksLikeResponseMap(parsed)) {
                    candidates = [{ key: "root", value: parsed }];
                } else {
                    Object.entries(parsed).forEach(([key, value]) => {
                        if (looksLikeResponseMap(value)) {
                            candidates.push({ key, value });
                        }
                    });
                }

                if (candidates.length === 0) {
                    throw new Error(
                        "Couldn't find response data in this file — expected an object mapping keys to arrays of responses (e.g. a \"users-new\" node)."
                    );
                }

                if (candidates.length === 1) {
                    loadData(candidates[0].value);
                } else {
                    setShowTable(false);
                    setPathOptions(candidates);
                }
            } catch (err) {
                setError(err.message || "Could not parse this file as JSON.");
                setShowTable(false);
                setPathOptions(null);
            }
        };
        reader.onerror = () => setError("Failed to read the file.");
        reader.readAsText(file);

        e.target.value = "";
    };

    const handleReset = () => {
        setData({});
        setHeaders([]);
        setShowTable(false);
        setCurrentPage(0);
        setAppliedFilter(null);
        setSelectedFilter(null);
        setFileName(null);
        setError(null);
        setPathOptions(null);
    };

    const allResponses = Object.entries(data).flatMap(([key, responses]) =>
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

    const sortedResponses = filteredResponses;

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

    const isObject = (value) => typeof value === "object" && !Array.isArray(value) && value !== null;

    const exportToCSV = () => {
        let csvContent = headers.join(",") + "\n";

        Object.values(data).flat().forEach(response => {
            const row = headers.map(header => {
                const value = response[header];
                if (isObject(value)) return '""';
                if (typeof value === "boolean") return value.toString();
                return value !== undefined && value !== null ? `"${value}"` : '""';
            }).join(",");
            csvContent += row + "\n";
        });

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
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
            userResponses[0] && userResponses[0].sona_id !== undefined
        );

        const csvHeaders = hasSonaId
            ? ["sona_id", ...Array.from(dynamicHeaders)]
            : ["worker_id", ...Array.from(dynamicHeaders)];

        let csvContent = csvHeaders.join(",") + "\n";

        Object.values(data).forEach(userResponses => {
            if (!userResponses[0]) return;

            const rowData = hasSonaId
                ? { sona_id: userResponses[0].sona_id }
                : { worker_id: userResponses[0].worker_id };

            userResponses.forEach(user => {
                if (isObject(user.response)) {
                    csvHeaders.forEach(header => {
                        if (header !== "worker_id" && !rowData[header]) {
                            const value = user.response[header];
                            if (value !== undefined && value !== null) {
                                rowData[header] = value;
                            }
                        } else if (header !== "sona_id" && !rowData[header]) {
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

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "demographics_data.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "72px",
            maxWidth: "unset"
        }}>
            {!showTable && !pathOptions ? (
                <div style={{display:"grid", placeItems:"center", placeContent:"center", width:"100%"}}>

                    <p>Pick a .json file exported from the experiment's Firebase Realtime Database.</p>

                    <label
                        htmlFor="json-upload-input"
                        style={{
                            display: "inline-block",
                            padding: "12px 18px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            backgroundColor: "black",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontWeight: "600",
                            marginTop: "16px"
                        }}
                    >
                        Choose JSON File
                    </label>
                    <input
                        id="json-upload-input"
                        type="file"
                        accept=".json,application/json"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                    />

                    {fileName && !error && (
                        <p style={{ marginTop: "12px" }}>Selected: {fileName}</p>
                    )}

                    {error && (
                        <p style={{ marginTop: "12px", color: "#c00" }}>{error}</p>
                    )}
                </div>
            ) : pathOptions ? (
                <div>
                    <h1>Choose a Data Node</h1>
                    <p>This file has more than one node that looks like response data. Pick which one to load:</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                        {pathOptions.map(({ key, value }) => (
                            <button
                                key={key}
                                onClick={() => loadData(value)}
                                className={"data-buttons"}
                                style={{ textAlign: "left" }}
                            >
                                {key} — {Object.keys(value).length} entries
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleReset}
                        className={"filter-buttons inactive-filter"}
                        style={{ marginTop: "16px" }}
                    >
                        Choose a Different File
                    </button>
                </div>
            ) : (
                <>
                    <div className={"data-table-div"}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <h1>{fileName}</h1>
                            <button
                                onClick={handleReset}
                                className={"filter-buttons inactive-filter"}
                            >
                                Upload a Different File
                            </button>
                        </div>

                        <div className={"table-filters-buttons"}>
                            <div className={"table-data-buttons"}>
                                <button onClick={exportToCSV} className={"data-buttons"}>
                                    Download Responses CSV
                                </button>
                                <button onClick={exportDemoGraphicToCSV} className={"data-buttons"}>
                                    Download Demographic CSV
                                </button>
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
                                    className={"filter-buttons inactive-filter"}
                                >
                                    Filters
                                </button>
                            </div>
                        </div>

                        {showFilterOverlay && (
                            <div className={"filter-overlay"}>
                                <div className={"filter-overlay-div"}>
                                    <div className={"filter-radio-div"}>
                                        <h2>Filter User Response</h2>
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
                                        <button className={"apply-button"} onClick={applySelectedFilter}>
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
                        )}

                        <div style={{ maxWidth: "100%", overflowY: "auto" }}>
                            <table style={{ borderCollapse: "collapse", marginLeft: "32px" }}>
                                <thead>
                                <tr className={"table-header"}>
                                    {headers.map((header, index) => (
                                        header !== "view_history" ? <th key={index}>{header}</th> : null
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedData.map((response, responseIndex) => (
                                    <tr key={responseIndex} style={{
                                        backgroundColor: responseIndex % 2 === 0 ? "#f2f2f2" : "white"
                                    }}>
                                        {headers.map((header, colIndex) => (
                                            header !== "view_history" ? (
                                                <td key={colIndex}>
                                                    {isObject(response[header])
                                                        ? ""
                                                        : typeof response[header] === "boolean"
                                                            ? response[header].toString()
                                                            : response[header] ?? ""}
                                                </td>
                                            ) : null
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
                            <button onClick={handlePreviousPage} disabled={currentPage === 0} style={{
                                padding: "12px 18px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                backgroundColor: currentPage === 0 ? "#ddd" : "black",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "600"
                            }}>
                                Previous
                            </button>
                            <span style={{ fontSize: "16px" }}> Page {currentPage + 1} of {totalPages || 1} </span>
                            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1} style={{
                                padding: "12px 18px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                backgroundColor: currentPage >= totalPages - 1 ? "#ddd" : "black",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "600"
                            }}>
                                Next
                            </button>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </main>
    );
}