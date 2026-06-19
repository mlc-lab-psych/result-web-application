// import React, { useState } from "react";
// import { saveAs } from "file-saver";
// import JSZip from "jszip";
//
// // ─── Server file generators ───────────────────────────────────────────────────
//
// function generateIATServer() {
//     return `const express = require('express');
// const { initializeApp } = require('firebase/app');
// const { getDatabase, ref, child, get, update, set } = require('firebase/database');
// const dotenv = require('dotenv');
// const fetch = require('node-fetch');
// const cors = require('cors');
// const path = require('path');
// const bodyParser = require('body-parser');
// dotenv.config();
//
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };
//
// const firebaseApp = initializeApp(firebaseConfig);
// const database = getDatabase(firebaseApp);
// const app = express();
//
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
//
// app.get('/get-data', (req, res) => {
//     let images = [];
//     let test_stimuli = [];
//     let category_display = { 1: [[], []], 2: [[], []], 3: [[], []] };
//     let category_word_image = "words_animate_Cat1.PNG";
//
//     async function processCountData() {
//         const dbRef = ref(database);
//         try {
//             const snapshot = await get(child(dbRef, 'count'));
//             if (snapshot.exists()) {
//                 const countData = snapshot.val();
//                 function lowestValueAndKey(obj) {
//                     let [lowestItems] = Object.entries(obj).sort(([, v1], [, v2]) => v1 - v2);
//                     return lowestItems[0];
//                 }
//                 const key = lowestValueAndKey(countData);
//                 const updates = {};
//                 updates[\`count/\${key}\`] = countData[key] + 1;
//                 await update(dbRef, updates);
//                 return key;
//             } else {
//                 console.log("No count data available");
//                 return null;
//             }
//         } catch (error) {
//             console.error("Error processing count data:", error);
//         }
//     }
//
//     processCountData().then((results) => {
//         const tableMap = {
//             table_one: process.env.AIRTABLE_ALIVE_TABLE_1,
//             table_two: process.env.AIRTABLE_ALIVE_TABLE_2,
//             table_three: process.env.AIRTABLE_ALIVE_TABLE_3,
//             table_four: process.env.AIRTABLE_ALIVE_TABLE_4,
//             table_five: process.env.AIRTABLE_ALIVE_TABLE_5,
//             table_six: process.env.AIRTABLE_ALIVE_TABLE_6,
//             table_seven: process.env.AIRTABLE_ALIVE_TABLE_7,
//             table_eight: process.env.AIRTABLE_ALIVE_TABLE_8,
//         };
//         return tableMap[results] || process.env.AIRTABLE_ALIVE_TABLE_1;
//     }).then(async (tableAirtable) => {
//         const url = \`https://api.airtable.com/v0/\${process.env.AIRTABLE_ALIVE_BASE}/\${tableAirtable}\`;
//         let allRecords = [];
//         let offset = null;
//         do {
//             let fetchUrl = url + (offset ? \`?offset=\${offset}\` : '');
//             const response = await fetch(fetchUrl, {
//                 headers: { 'Authorization': \`Bearer \${process.env.AIRTABLE_API_KEY}\`, 'Content-Type': 'application/json' }
//             });
//             if (!response.ok) throw new Error(\`Error: \${response.status}\`);
//             const result = await response.json();
//             allRecords = allRecords.concat(result.records);
//             offset = result.offset;
//         } while (offset);
//
//         allRecords.sort((a, b) => a.fields["trial"] - b.fields["trial"]);
//         for (let rows in allRecords) {
//             const fields = allRecords[rows].fields;
//             if (fields['stimulus'] === "inert" && fields['correct_key'] === "d") {
//                 category_word_image = "words_animate_Cat2.PNG";
//             }
//             if (fields['stimulus_type'] === "image") images.push(fields["stimulus"]);
//             fields["association"] = fields['correct_key'] === "d" ? "left" : "right";
//             test_stimuli.push(fields);
//             const block = fields['block'];
//             const category = fields['category_display'];
//             if (fields['association'] === "left") {
//                 if (!category_display[block][0].includes(category)) category_display[block][0].push(category);
//             } else {
//                 if (!category_display[block][1].includes(category)) category_display[block][1].push(category);
//             }
//         }
//         for (const block in category_display) {
//             category_display[block][0].sort((a, b) => a.length - b.length);
//             category_display[block][1].sort((a, b) => a.length - b.length);
//         }
//         res.status(200).json({ test_stimuli, images, category_display, category_word_image });
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching data.' });
//     });
// });
//
// app.post('/submit-results', async (req, res) => {
//     const cleanedData = JSON.parse(JSON.stringify(req.body, (key, value) => value === null ? "null" : value));
//     const randomId = "user-" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
//     try {
//         await set(ref(database, 'users-new/' + randomId), cleanedData);
//         res.status(200).json({ message: 'Results received successfully!' });
//     } catch (error) {
//         console.error('Error saving data: ', error);
//         res.status(500).json({ message: 'Error saving results.' });
//     }
// });
//
// app.get('*', (req, res) => res.redirect('/'));
// const PORT = 3000;
// app.listen(PORT, () => console.log(\`Server is running on http://localhost:\${PORT}\`));
// `;
// }
//
// function generateAliveServer() {
//     return `const express = require('express');
// const { initializeApp } = require('firebase/app');
// const { getDatabase, ref, child, get, update, set } = require('firebase/database');
// const dotenv = require('dotenv');
// const fetch = require('node-fetch');
// const cors = require('cors');
// const path = require('path');
// const bodyParser = require('body-parser');
// dotenv.config();
//
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };
//
// const firebaseApp = initializeApp(firebaseConfig);
// const database = getDatabase(firebaseApp);
// const app = express();
//
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
//
// app.get('/get-data', (req, res) => {
//     let images = [];
//     let test_stimuli = [];
//
//     async function processCountData() {
//         const dbRef = ref(database);
//         try {
//             const snapshot = await get(child(dbRef, 'count'));
//             if (snapshot.exists()) {
//                 const countData = snapshot.val();
//                 function lowestValueAndKey(obj) {
//                     let [lowestItems] = Object.entries(obj).sort(([, v1], [, v2]) => v1 - v2);
//                     return lowestItems[0];
//                 }
//                 const key = lowestValueAndKey(countData);
//                 const updates = {};
//                 updates[\`count/\${key}\`] = countData[key] + 1;
//                 await update(dbRef, updates);
//                 return key;
//             } else {
//                 console.log("No count data available");
//                 return null;
//             }
//         } catch (error) {
//             console.error("Error processing count data:", error);
//         }
//     }
//
//     processCountData().then((results) => {
//         const tableMap = {
//             table_one: process.env.AIRTABLE_ALIVE_TABLE_1,
//             table_two: process.env.AIRTABLE_ALIVE_TABLE_2,
//             table_three: process.env.AIRTABLE_ALIVE_TABLE_3,
//             table_four: process.env.AIRTABLE_ALIVE_TABLE_4,
//             table_five: process.env.AIRTABLE_ALIVE_TABLE_5,
//             table_six: process.env.AIRTABLE_ALIVE_TABLE_6,
//             table_seven: process.env.AIRTABLE_ALIVE_TABLE_7,
//             table_eight: process.env.AIRTABLE_ALIVE_TABLE_8,
//             table_nine: process.env.AIRTABLE_ALIVE_TABLE_9,
//             table_ten: process.env.AIRTABLE_ALIVE_TABLE_10,
//             table_eleventh: process.env.AIRTABLE_ALIVE_TABLE_11,
//             table_twelfth: process.env.AIRTABLE_ALIVE_TABLE_12,
//         };
//         return tableMap[results] || process.env.AIRTABLE_ALIVE_TABLE_1;
//     }).then(async (tableAirtable) => {
//         const url = \`https://api.airtable.com/v0/\${process.env.AIRTABLE_ALIVE_BASE}/\${tableAirtable}\`;
//         let allRecords = [];
//         let offset = null;
//         do {
//             let fetchUrl = url + (offset ? \`?offset=\${offset}\` : '');
//             const response = await fetch(fetchUrl, {
//                 headers: { 'Authorization': \`Bearer \${process.env.AIRTABLE_API_KEY}\`, 'Content-Type': 'application/json' }
//             });
//             if (!response.ok) throw new Error(\`Error: \${response.status}\`);
//             const result = await response.json();
//             allRecords = allRecords.concat(result.records);
//             offset = result.offset;
//         } while (offset);
//
//         for (let rows in allRecords) {
//             let temp_data = allRecords[rows].fields;
//             let image_name;
//             switch (temp_data['bucket'].split('/')[1]) {
//                 case "Study2+resized+for+online":
//                     image_name = process.env.AWS_BUCKET_TWO_LINK + "/" + temp_data['item'];
//                     break;
//                 default:
//                     image_name = process.env.AWS_BUCKET_LINK + "/" + temp_data['item'];
//             }
//             images.push(image_name);
//             temp_data['url'] = image_name;
//             test_stimuli.push(allRecords[rows].fields);
//         }
//         images.push(process.env.AWS_BUCKET_LINK + "mask1.jpg");
//         res.status(200).json({ test_stimuli, images });
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching data.' });
//     });
// });
//
// app.post('/submit-results', async (req, res) => {
//     const cleanedData = JSON.parse(JSON.stringify(req.body, (key, value) => value === null ? "null" : value));
//     const randomId = "user-" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
//     try {
//         await set(ref(database, 'users-new/' + randomId), cleanedData);
//         res.status(200).json({ message: 'Results received successfully!' });
//     } catch (error) {
//         console.error('Error saving data: ', error);
//         res.status(500).json({ message: 'Error saving results.' });
//     }
// });
//
// app.get('*', (req, res) => res.redirect('/'));
// const PORT = 3000;
// app.listen(PORT, () => console.log(\`Server is running on http://localhost:\${PORT}\`));
// `;
// }
//
// function generateAlignmentServer() {
//     return `const express = require('express');
// const { initializeApp } = require('firebase/app');
// const { getDatabase, ref, child, get, update, set } = require('firebase/database');
// const dotenv = require('dotenv');
// const fetch = require('node-fetch');
// const cors = require('cors');
// const path = require('path');
// const bodyParser = require('body-parser');
// dotenv.config();
//
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };
//
// const firebaseApp = initializeApp(firebaseConfig);
// const database = getDatabase(firebaseApp);
// const app = express();
//
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
//
// app.get('/get-data', (req, res) => {
//     let audio = [];
//     let test_stimuli = [];
//
//     async function processCountData() {
//         const dbRef = ref(database);
//         try {
//             function lowestValueAndKey(obj) {
//                 let [lowestItems] = Object.entries(obj).sort(([, v1], [, v2]) => v1 - v2);
//                 return lowestItems[0];
//             }
//             let returnVal = [];
//             const labeled_snapshot = await get(child(dbRef, 'count_label'));
//             if (labeled_snapshot.exists()) {
//                 const countLabel = labeled_snapshot.val();
//                 const labelKey = lowestValueAndKey(countLabel);
//                 const labelUpdates = {};
//                 labelUpdates[\`count_label/\${labelKey}\`] = countLabel[labelKey] + 1;
//                 await update(dbRef, labelUpdates);
//                 returnVal.push(labelKey);
//             } else {
//                 console.log("No count label data available");
//                 return null;
//             }
//             const snapshot = await get(child(dbRef, 'count_table'));
//             if (snapshot.exists()) {
//                 const countData = snapshot.val();
//                 const key = lowestValueAndKey(countData);
//                 const updates = {};
//                 updates[\`count_table/\${key}\`] = countData[key] + 1;
//                 await update(dbRef, updates);
//                 returnVal.push(key);
//             } else {
//                 console.log("No count table data available");
//                 return null;
//             }
//             return returnVal;
//         } catch (error) {
//             console.error("Error processing count data:", error);
//         }
//     }
//
//     processCountData().then((results) => {
//         if (results) {
//             const tableMap = {
//                 table_one:   { table: process.env.AIRTABLE_ALIGNMENT_TABLE_1, voice: "vivian" },
//                 table_two:   { table: process.env.AIRTABLE_ALIGNMENT_TABLE_2, voice: "melissa" },
//                 table_three: { table: process.env.AIRTABLE_ALIGNMENT_TABLE_3, voice: "alexa" },
//             };
//             const match = tableMap[results[1]] || tableMap.table_one;
//             return [results[0], match.table, match.voice];
//         }
//         return null;
//     }).then(async (results) => {
//         const url = \`https://api.airtable.com/v0/\${process.env.AIRTABLE_ALIGNMENT_BASE}/\${results[1]}\`;
//         let allRecords = [];
//         let offset = null;
//         do {
//             let fetchUrl = url + (offset ? \`?offset=\${offset}\` : '');
//             const response = await fetch(fetchUrl, {
//                 headers: { 'Authorization': \`Bearer \${process.env.AIRTABLE_API_KEY}\`, 'Content-Type': 'application/json' }
//             });
//             if (!response.ok) throw new Error(\`Error: \${response.status}\`);
//             const result = await response.json();
//             allRecords = allRecords.concat(result.records);
//             offset = result.offset;
//         } while (offset);
//
//         let index = 1;
//         for (let rows in allRecords) {
//             let temp_data = allRecords[rows].fields;
//             const audio_url = process.env.AWS_BUCKET_LINK + "/" + temp_data['filename'];
//             audio.push(audio_url);
//             temp_data['url'] = audio_url;
//             temp_data['index'] = index++;
//             test_stimuli.push(allRecords[rows].fields);
//         }
//         res.status(200).json({ test_stimuli, audio, labeled: results[0], table: results[2] });
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching data.' });
//     });
// });
//
// app.post('/submit-results', async (req, res) => {
//     const cleanedData = JSON.parse(JSON.stringify(req.body, (key, value) => value === null ? "null" : value));
//     const randomId = "user-" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
//     try {
//         await set(ref(database, 'users-new/' + randomId), cleanedData);
//         res.status(200).json({ message: 'Results received successfully!' });
//     } catch (error) {
//         console.error('Error saving data: ', error);
//         res.status(500).json({ message: 'Error saving results.' });
//     }
// });
//
// app.get('*', (req, res) => res.redirect('/'));
// const PORT = 3000;
// app.listen(PORT, () => console.log(\`Server is running on http://localhost:\${PORT}\`));
// `;
// }
//
// function generateIndexHTML() {
//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Experiment</title>
//     <script src="https://unpkg.com/jspsych@8.2.1"></script>
//     <link href="https://unpkg.com/jspsych@8.2.1/css/jspsych.css" rel="stylesheet" type="text/css" />
//     <link rel="stylesheet" href="https://unpkg.com/@jspsych/plugin-survey@1.0.1/css/survey.css">
//     <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.3"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-survey-text@1.1.3"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-survey-html-form@1.0.3"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-survey@1.0.1"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.3"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-initialize-microphone@1.0.3"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-survey-multi-choice@1.1.3"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-html-button-response@1.2.0"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-html-audio-response@1.0.3"></script>
//     <script src="https://unpkg.com/@jspsych/plugin-audio-keyboard-response@2.1.0"></script>
//     <script>
//         console.warn = () => {};
//         let test_stimuli;
//         let images;
//
//         async function preload_images(data) {
//             let preloadedImages = [];
//             data.forEach(img => {
//                 let ogImg = new Image();
//                 ogImg.src = img;
//                 preloadedImages.push(ogImg);
//             });
//             return preloadedImages;
//         }
//
//         async function fetchData() {
//             try {
//                 const response = await fetch('http://localhost:3000/get-data');
//                 if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
//                 const data = await response.json();
//                 test_stimuli = data['test_stimuli'];
//                 images = data['images'];
//                 await preload_images(images).then((result) => { images = result; });
//                 initializeJsPsych();
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }
//
//         function initializeJsPsych() {
//             const jsPsych = initJsPsych();
//
//             function getParamFromURL(name) {
//                 name = name.replace(/\\[/, "\\\\[").replace(/]/, "\\\\]");
//                 let regex = new RegExp("[?&]" + name + "=([^&#]*)");
//                 let results = regex.exec(window.location.href);
//                 try {
//                     return results ? decodeURIComponent(results[1]) : "";
//                 } catch (error) {
//                     return "";
//                 }
//             }
//
//             let subject_id = "subject_" + Math.floor(Math.random() * 1000000);
//             let worker_id = getParamFromURL('PROLIFIC_PID') || subject_id;
//             let study_id = getParamFromURL('STUDY_ID') || "NULL";
//             let session_id = getParamFromURL('SESSION_ID') || "NULL";
//
//             jsPsych.data.addProperties({ subject: subject_id, worker_id, study_id, session_id });
//
//             let timeline = [];
//             jsPsych.run({ timeline, preload_images: images });
//         }
//
//         async function sendResults(results) {
//             try {
//                 const response = await fetch('http://localhost:3000/submit-results', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(results)
//                 });
//                 if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
//                 const result = await response.json();
//                 console.log(result.message);
//             } catch (error) {
//                 console.error('Error sending results:', error);
//             }
//         }
//
//         window.onload = function () { fetchData(); };
//     </script>
// </head>
// <body></body>
// </html>`;
// }
//
// function generateEnvContent(formData, experimentType) {
//     const baseKeys = [
//         "FIREBASE_API_KEY",
//         "FIREBASE_AUTH_DOMAIN",
//         "FIREBASE_DATABASE_URL",
//         "FIREBASE_PROJECT_ID",
//         "FIREBASE_STORAGE_BUCKET",
//         "FIREBASE_MESSAGING_SENDER_ID",
//         "FIREBASE_APP_ID",
//         "AIRTABLE_API_KEY",
//     ];
//
//     let lines = baseKeys.map((key) => `${key}=${formData[key] || ""}`);
//
//     if (experimentType === "iat") {
//         lines.push(`AIRTABLE_ALIVE_BASE=${formData.AIRTABLE_ALIVE_BASE || ""}`);
//         const tableEntries = Object.entries(formData.AIRTABLE_TABLES || {})
//             .map(([key, value]) => `${key}=${value}`);
//         lines = lines.concat(tableEntries);
//     }
//
//     if (experimentType === "alive") {
//         lines.push(`AIRTABLE_ALIVE_BASE=${formData.AIRTABLE_ALIVE_BASE || ""}`);
//         const tableEntries = Object.entries(formData.AIRTABLE_TABLES || {})
//             .map(([key, value]) => `${key}=${value}`);
//         lines = lines.concat(tableEntries);
//         const bucketEntries = Object.entries(formData.AWS_BUCKETS || {})
//             .map(([key, value]) => `${key}=${value}`);
//         lines = lines.concat(bucketEntries);
//     }
//
//     if (experimentType === "alignment") {
//         lines.push(`AIRTABLE_ALIGNMENT_BASE=${formData.AIRTABLE_ALIGNMENT_BASE || ""}`);
//         lines.push(`AIRTABLE_ALIGNMENT_TABLE_1=${formData.AIRTABLE_ALIGNMENT_TABLE_1 || ""}`);
//         lines.push(`AIRTABLE_ALIGNMENT_TABLE_2=${formData.AIRTABLE_ALIGNMENT_TABLE_2 || ""}`);
//         lines.push(`AIRTABLE_ALIGNMENT_TABLE_3=${formData.AIRTABLE_ALIGNMENT_TABLE_3 || ""}`);
//         lines.push(`AWS_BUCKET_LINK=${formData.AWS_BUCKET_LINK || ""}`);
//     }
//
//     return lines.join("\n");
// }
//
// // ─── Initial form state per experiment type ───────────────────────────────────
//
// function getInitialFormData(experimentType) {
//     const base = {
//         FIREBASE_API_KEY: "",
//         FIREBASE_AUTH_DOMAIN: "",
//         FIREBASE_DATABASE_URL: "",
//         FIREBASE_PROJECT_ID: "",
//         FIREBASE_STORAGE_BUCKET: "",
//         FIREBASE_MESSAGING_SENDER_ID: "",
//         FIREBASE_APP_ID: "",
//         AIRTABLE_API_KEY: "",
//     };
//     if (experimentType === "iat") {
//         return { ...base, AIRTABLE_ALIVE_BASE: "", NUM_AIRTABLE_TABLES: 0, AIRTABLE_TABLES: {} };
//     }
//     if (experimentType === "alive") {
//         return { ...base, AIRTABLE_ALIVE_BASE: "", NUM_AIRTABLE_TABLES: 0, AIRTABLE_TABLES: {}, NUM_AWS_BUCKETS: 0, AWS_BUCKETS: {} };
//     }
//     if (experimentType === "alignment") {
//         return {
//             ...base,
//             AIRTABLE_ALIGNMENT_BASE: "",
//             AIRTABLE_ALIGNMENT_TABLE_1: "",
//             AIRTABLE_ALIGNMENT_TABLE_2: "",
//             AIRTABLE_ALIGNMENT_TABLE_3: "",
//             AWS_BUCKET_LINK: "",
//         };
//     }
//     return base;
// }
//
// // ─── Component ────────────────────────────────────────────────────────────────
//
// export default function CreateMultiStepForm({ steps, experimentType, onClose }) {
//     const [stepIndex, setStepIndex] = useState(0);
//     const [formData, setFormData] = useState(() => getInitialFormData(experimentType));
//     const [downloading, setDownloading] = useState(false);
//     const [downloaded, setDownloaded] = useState(false);
//
//     const isLastStep = stepIndex === steps.length - 1;
//     const progress = Math.round(((stepIndex) / (steps.length - 1)) * 100);
//
//     const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
//     const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleDynamicChange = (type, index, value) => {
//         const keyPrefix = type === "AIRTABLE_TABLES" ? "AIRTABLE_ALIVE_TABLE" : "AWS_BUCKET_LINK";
//         const suffixMap = [
//             "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
//         ];
//         const bucketSuffixMap = ["", "_TWO", "_THREE", "_FOUR", "_FIVE"];
//         const key = type === "AIRTABLE_TABLES"
//             ? `${keyPrefix}_${suffixMap[index]}`
//             : index === 0 ? "AWS_BUCKET_LINK" : `AWS_BUCKET_${bucketSuffixMap[index]}_LINK`;
//
//         setFormData((prev) => ({
//             ...prev,
//             [type]: { ...prev[type], [key]: value }
//         }));
//     };
//
//     const generateAndDownload = async () => {
//         setDownloading(true);
//         try {
//             const zip = new JSZip();
//
//             // .env
//             zip.file(".env", generateEnvContent(formData, experimentType));
//
//             // server.js
//             const serverContent = experimentType === "iat"
//                 ? generateIATServer()
//                 : experimentType === "alive"
//                     ? generateAliveServer()
//                     : generateAlignmentServer();
//             zip.file("server.js", serverContent);
//
//             // public/index.html
//             const publicFolder = zip.folder("public");
//             publicFolder.file("index.html", generateIndexHTML());
//
//             // package.json
//             zip.file("package.json", JSON.stringify({
//                 name: `${experimentType}-experiment`,
//                 version: "1.0.0",
//                 description: `${experimentType.toUpperCase()} Experiment Server`,
//                 main: "server.js",
//                 scripts: { start: "node server.js" },
//                 dependencies: {
//                     "body-parser": "^1.20.2",
//                     "cors": "^2.8.5",
//                     "dotenv": "^16.0.3",
//                     "express": "^4.18.2",
//                     "firebase": "^10.7.0",
//                     "node-fetch": "^2.7.0"
//                 }
//             }, null, 2));
//
//             const content = await zip.generateAsync({ type: "blob" });
//             saveAs(content, `${experimentType}-experiment-setup.zip`);
//             setDownloaded(true);
//         } catch (err) {
//             console.error("Error generating ZIP:", err);
//         } finally {
//             setDownloading(false);
//         }
//     };
//
//     const currentStep = steps[stepIndex];
//
//     return (
//         <div className="multistep-wrapper">
//             {/* Header */}
//             <div className="multistep-header">
//                 <div className="multistep-meta">
//                     <span className="multistep-experiment-tag">{experimentType.toUpperCase()}</span>
//                     <button className="multistep-close" onClick={onClose}>✕</button>
//                 </div>
//                 <div className="multistep-progress-bar">
//                     <div className="multistep-progress-fill" style={{ width: `${progress}%` }} />
//                 </div>
//                 <div className="multistep-step-count">Step {stepIndex + 1} of {steps.length}</div>
//             </div>
//
//             {/* Body */}
//             <div className="multistep-body">
//                 <h2 className="multistep-title">{currentStep.title}</h2>
//                 <p className="multistep-content">{currentStep.content}</p>
//
//                 {/* Static inputs */}
//                 {currentStep.inputs && (
//                     <div className="multistep-inputs">
//                         {currentStep.inputs.map((input) => (
//                             <div className="multistep-input-row" key={input.name}>
//                                 <label className="multistep-label">{input.label}</label>
//                                 <input
//                                     className="multistep-input"
//                                     type={input.type}
//                                     name={input.name}
//                                     value={formData[input.name] ?? ""}
//                                     onChange={handleChange}
//                                     min={input.type === "number" ? 0 : undefined}
//                                     max={input.max || undefined}
//                                     placeholder={input.type === "number" ? "0" : `Enter ${input.label}`}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 )}
//
//                 {/* Dynamic Airtable table inputs */}
//                 {currentStep.dynamicInputs === "AIRTABLE_TABLES" && Number(formData.NUM_AIRTABLE_TABLES) > 0 && (
//                     <div className="multistep-inputs">
//                         <div className="multistep-dynamic-label">Airtable Table IDs</div>
//                         {Array.from({ length: Number(formData.NUM_AIRTABLE_TABLES) }).map((_, index) => (
//                             <div className="multistep-input-row" key={index}>
//                                 <label className="multistep-label">Table {index + 1} ID</label>
//                                 <input
//                                     className="multistep-input"
//                                     type="text"
//                                     placeholder={`Enter Table ${index + 1} ID`}
//                                     value={formData.AIRTABLE_TABLES[`AIRTABLE_ALIVE_TABLE_${index + 1}`] || ""}
//                                     onChange={(e) => handleDynamicChange("AIRTABLE_TABLES", index, e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 )}
//
//                 {/* Dynamic AWS bucket inputs */}
//                 {currentStep.dynamicInputs === "AWS_BUCKETS" && Number(formData.NUM_AWS_BUCKETS) > 0 && (
//                     <div className="multistep-inputs">
//                         <div className="multistep-dynamic-label">AWS Bucket Links</div>
//                         {Array.from({ length: Number(formData.NUM_AWS_BUCKETS) }).map((_, index) => (
//                             <div className="multistep-input-row" key={index}>
//                                 <label className="multistep-label">Bucket {index + 1} Link</label>
//                                 <input
//                                     className="multistep-input"
//                                     type="text"
//                                     placeholder={`https://your-bucket-${index + 1}.s3.amazonaws.com`}
//                                     value={
//                                         index === 0
//                                             ? formData.AWS_BUCKETS["AWS_BUCKET_LINK"] || ""
//                                             : formData.AWS_BUCKETS[`AWS_BUCKET_${["TWO","THREE","FOUR","FIVE"][index - 1]}_LINK`] || ""
//                                     }
//                                     onChange={(e) => handleDynamicChange("AWS_BUCKETS", index, e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 )}
//
//                 {/* Final step download */}
//                 {isLastStep && (
//                     <div className="multistep-download-area">
//                         <div className="multistep-download-info">
//                             <div className="multistep-file-list">
//                                 <span className="multistep-file-item">📄 .env</span>
//                                 <span className="multistep-file-item">🖥️ server.js</span>
//                                 <span className="multistep-file-item">🌐 public/index.html</span>
//                                 <span className="multistep-file-item">📦 package.json</span>
//                             </div>
//                         </div>
//                         <button
//                             className={`multistep-download-btn ${downloaded ? "downloaded" : ""}`}
//                             onClick={generateAndDownload}
//                             disabled={downloading}
//                         >
//                             {downloading ? "Generating..." : downloaded ? "✓ Downloaded!" : "Download ZIP"}
//                         </button>
//                     </div>
//                 )}
//             </div>
//
//             {/* Navigation */}
//             <div className="multistep-nav">
//                 {stepIndex > 0 && (
//                     <button className="multistep-btn-back" onClick={prevStep}>← Back</button>
//                 )}
//                 {!isLastStep && (
//                     <button className="multistep-btn-next" onClick={nextStep}>Next →</button>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";

// ─── Ordinal helpers ──────────────────────────────────────────────────────────

const ORDINALS = [
    'one','two','three','four','five','six','seven','eight','nine','ten',
    'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen',
    'eighteen','nineteen','twenty'
];

function buildSlots(bases) {
    const slots = [];
    bases.forEach((base, bi) => {
        base.tables.forEach((_, ti) => {
            slots.push({
                ordinal: ORDINALS[slots.length],
                baseEnv: `AIRTABLE_BASE_${bi + 1}`,
                tableEnv: `AIRTABLE_BASE_${bi + 1}_TABLE_${ti + 1}`,
            });
        });
    });
    return slots;
}

// ─── .env generator ──────────────────────────────────────────────────────────

function generateEnvContent(formData, experimentType) {
    const baseKeys = [
        "FIREBASE_API_KEY","FIREBASE_AUTH_DOMAIN","FIREBASE_DATABASE_URL",
        "FIREBASE_PROJECT_ID","FIREBASE_STORAGE_BUCKET","FIREBASE_MESSAGING_SENDER_ID",
        "FIREBASE_APP_ID","AIRTABLE_API_KEY",
    ];
    let lines = baseKeys.map((key) => `${key}=${formData[key] || ""}`);

    if (experimentType === "iat" || experimentType === "alive") {
        const bases = formData.AIRTABLE_BASES || [];
        bases.forEach((base, bi) => {
            lines.push(`AIRTABLE_BASE_${bi + 1}=${base.id || ""}`);
            base.tables.forEach((table, ti) => {
                lines.push(`AIRTABLE_BASE_${bi + 1}_TABLE_${ti + 1}=${table || ""}`);
            });
        });
    }

    if (experimentType === "alive") {
        const buckets = formData.AWS_BUCKETS || {};
        Object.entries(buckets).forEach(([key, value]) => lines.push(`${key}=${value}`));
    }

    if (experimentType === "alignment") {
        lines.push(`AIRTABLE_ALIGNMENT_BASE=${formData.AIRTABLE_ALIGNMENT_BASE || ""}`);
        lines.push(`AIRTABLE_ALIGNMENT_TABLE_1=${formData.AIRTABLE_ALIGNMENT_TABLE_1 || ""}`);
        lines.push(`AIRTABLE_ALIGNMENT_TABLE_2=${formData.AIRTABLE_ALIGNMENT_TABLE_2 || ""}`);
        lines.push(`AIRTABLE_ALIGNMENT_TABLE_3=${formData.AIRTABLE_ALIGNMENT_TABLE_3 || ""}`);
        lines.push(`AWS_BUCKET_LINK=${formData.AWS_BUCKET_LINK || ""}`);
    }

    return lines.join("\n");
}

// ─── Server boilerplate ───────────────────────────────────────────────────────

const SERVER_BOILERPLATE = `const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, child, get, update, set } = require('firebase/database');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});`;

const SERVER_FOOTER = `
app.post('/submit-results', async (req, res) => {
    const cleanedData = JSON.parse(JSON.stringify(req.body, (key, value) => value === null ? "null" : value));
    const randomId = "user-" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
    try {
        await set(ref(database, 'users-new/' + randomId), cleanedData);
        res.status(200).json({ message: 'Results received successfully!' });
    } catch (error) {
        console.error('Error saving data: ', error);
        res.status(500).json({ message: 'Error saving results.' });
    }
});

app.get('*', (req, res) => res.redirect('/'));
const PORT = 3000;
app.listen(PORT, () => console.log(\`Server is running on http://localhost:\${PORT}\`));
`;

function buildTableMapCode(slots) {
    if (slots.length === 0) return `    const tableMap = {};\n`;
    const entries = slots.map(s =>
        `        table_${s.ordinal}: { base: process.env.${s.baseEnv}, table: process.env.${s.tableEnv} }`
    );
    return `    const tableMap = {\n${entries.join(',\n')}\n    };\n`;
}

const PROCESS_COUNT_FN = `
    async function processCountData() {
        const dbRef = ref(database);
        try {
            const snapshot = await get(child(dbRef, 'count'));
            if (snapshot.exists()) {
                const countData = snapshot.val();
                function lowestValueAndKey(obj) {
                    let [lowestItems] = Object.entries(obj).sort(([, v1], [, v2]) => v1 - v2);
                    return lowestItems[0];
                }
                const key = lowestValueAndKey(countData);
                const updates = {};
                updates[\`count/\${key}\`] = countData[key] + 1;
                await update(dbRef, updates);
                return key;
            } else {
                console.log("No count data available");
                return null;
            }
        } catch (error) {
            console.error("Error processing count data:", error);
        }
    }`;

function generateIATServer(bases) {
    const slots = buildSlots(bases);
    const tableMapCode = buildTableMapCode(slots);
    const fallbackBase = slots[0]?.baseEnv || 'AIRTABLE_BASE_1';
    const fallbackTable = slots[0]?.tableEnv || 'AIRTABLE_BASE_1_TABLE_1';

    return `${SERVER_BOILERPLATE}

app.get('/get-data', (req, res) => {
    let images = [];
    let test_stimuli = [];
    let category_display = { 1: [[], []], 2: [[], []], 3: [[], []] };
    let category_word_image = "words_animate_Cat1.PNG";
${PROCESS_COUNT_FN}

    processCountData().then((results) => {
${tableMapCode}
        return tableMap[results] || { base: process.env.${fallbackBase}, table: process.env.${fallbackTable} };
    }).then(async (match) => {
        const url = \`https://api.airtable.com/v0/\${match.base}/\${match.table}\`;
        let allRecords = [];
        let offset = null;
        do {
            let fetchUrl = url + (offset ? \`?offset=\${offset}\` : '');
            const response = await fetch(fetchUrl, {
                headers: { 'Authorization': \`Bearer \${process.env.AIRTABLE_API_KEY}\`, 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(\`Error: \${response.status}\`);
            const result = await response.json();
            allRecords = allRecords.concat(result.records);
            offset = result.offset;
        } while (offset);

        allRecords.sort((a, b) => a.fields["trial"] - b.fields["trial"]);
        for (let rows in allRecords) {
            const fields = allRecords[rows].fields;
            if (fields['stimulus'] === "inert" && fields['correct_key'] === "d") category_word_image = "words_animate_Cat2.PNG";
            if (fields['stimulus_type'] === "image") images.push(fields["stimulus"]);
            fields["association"] = fields['correct_key'] === "d" ? "left" : "right";
            test_stimuli.push(fields);
            const block = fields['block'];
            const category = fields['category_display'];
            if (fields['association'] === "left") {
                if (!category_display[block][0].includes(category)) category_display[block][0].push(category);
            } else {
                if (!category_display[block][1].includes(category)) category_display[block][1].push(category);
            }
        }
        for (const block in category_display) {
            category_display[block][0].sort((a, b) => a.length - b.length);
            category_display[block][1].sort((a, b) => a.length - b.length);
        }
        res.status(200).json({ test_stimuli, images, category_display, category_word_image });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data.' });
    });
});
${SERVER_FOOTER}`;
}

function generateAliveServer(bases, awsBuckets) {
    const slots = buildSlots(bases);
    const tableMapCode = buildTableMapCode(slots);
    const fallbackBase = slots[0]?.baseEnv || 'AIRTABLE_BASE_1';
    const fallbackTable = slots[0]?.tableEnv || 'AIRTABLE_BASE_1_TABLE_1';
    const bucketKeys = Object.keys(awsBuckets || {});
    const bucketSwitch = bucketKeys.length <= 1
        ? `        const image_name = process.env.${bucketKeys[0] || 'AWS_BUCKET_LINK'} + "/" + temp_data['item'];`
        : `        let image_name;\n        switch(temp_data['bucket'].split('/')[1]) {\n${bucketKeys.map((k, i) =>
            `            case "${i === 0 ? '' : `bucket_${i + 1}`}":\n                image_name = process.env.${k} + "/" + temp_data['item'];\n                break;`
        ).join('\n')}\n            default:\n                image_name = process.env.${bucketKeys[0]} + "/" + temp_data['item'];\n        }`;

    return `${SERVER_BOILERPLATE}

app.get('/get-data', (req, res) => {
    let images = [];
    let test_stimuli = [];
${PROCESS_COUNT_FN}

    processCountData().then((results) => {
${tableMapCode}
        return tableMap[results] || { base: process.env.${fallbackBase}, table: process.env.${fallbackTable} };
    }).then(async (match) => {
        const url = \`https://api.airtable.com/v0/\${match.base}/\${match.table}\`;
        let allRecords = [];
        let offset = null;
        do {
            let fetchUrl = url + (offset ? \`?offset=\${offset}\` : '');
            const response = await fetch(fetchUrl, {
                headers: { 'Authorization': \`Bearer \${process.env.AIRTABLE_API_KEY}\`, 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(\`Error: \${response.status}\`);
            const result = await response.json();
            allRecords = allRecords.concat(result.records);
            offset = result.offset;
        } while (offset);

        for (let rows in allRecords) {
            let temp_data = allRecords[rows].fields;
${bucketSwitch}
            images.push(image_name);
            temp_data['url'] = image_name;
            test_stimuli.push(allRecords[rows].fields);
        }
        images.push(process.env.${bucketKeys[0] || 'AWS_BUCKET_LINK'} + "mask1.jpg");
        res.status(200).json({ test_stimuli, images });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data.' });
    });
});
${SERVER_FOOTER}`;
}

function generateAlignmentServer() {
    return `${SERVER_BOILERPLATE}

app.get('/get-data', (req, res) => {
    let audio = [];
    let test_stimuli = [];

    async function processCountData() {
        const dbRef = ref(database);
        try {
            function lowestValueAndKey(obj) {
                let [lowestItems] = Object.entries(obj).sort(([, v1], [, v2]) => v1 - v2);
                return lowestItems[0];
            }
            let returnVal = [];
            const labeled_snapshot = await get(child(dbRef, 'count_label'));
            if (labeled_snapshot.exists()) {
                const countLabel = labeled_snapshot.val();
                const labelKey = lowestValueAndKey(countLabel);
                const labelUpdates = {};
                labelUpdates[\`count_label/\${labelKey}\`] = countLabel[labelKey] + 1;
                await update(dbRef, labelUpdates);
                returnVal.push(labelKey);
            } else { return null; }
            const snapshot = await get(child(dbRef, 'count_table'));
            if (snapshot.exists()) {
                const countData = snapshot.val();
                const key = lowestValueAndKey(countData);
                const updates = {};
                updates[\`count_table/\${key}\`] = countData[key] + 1;
                await update(dbRef, updates);
                returnVal.push(key);
            } else { return null; }
            return returnVal;
        } catch (error) {
            console.error("Error processing count data:", error);
        }
    }

    processCountData().then((results) => {
        if (results) {
            const tableMap = {
                table_one:   { table: process.env.AIRTABLE_ALIGNMENT_TABLE_1, voice: "vivian" },
                table_two:   { table: process.env.AIRTABLE_ALIGNMENT_TABLE_2, voice: "melissa" },
                table_three: { table: process.env.AIRTABLE_ALIGNMENT_TABLE_3, voice: "alexa" },
            };
            const match = tableMap[results[1]] || tableMap.table_one;
            return [results[0], match.table, match.voice];
        }
        return null;
    }).then(async (results) => {
        const url = \`https://api.airtable.com/v0/\${process.env.AIRTABLE_ALIGNMENT_BASE}/\${results[1]}\`;
        let allRecords = [];
        let offset = null;
        do {
            let fetchUrl = url + (offset ? \`?offset=\${offset}\` : '');
            const response = await fetch(fetchUrl, {
                headers: { 'Authorization': \`Bearer \${process.env.AIRTABLE_API_KEY}\`, 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(\`Error: \${response.status}\`);
            const result = await response.json();
            allRecords = allRecords.concat(result.records);
            offset = result.offset;
        } while (offset);

        let index = 1;
        for (let rows in allRecords) {
            let temp_data = allRecords[rows].fields;
            const audio_url = process.env.AWS_BUCKET_LINK + "/" + temp_data['filename'];
            audio.push(audio_url);
            temp_data['url'] = audio_url;
            temp_data['index'] = index++;
            test_stimuli.push(allRecords[rows].fields);
        }
        res.status(200).json({ test_stimuli, audio, labeled: results[0], table: results[2] });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data.' });
    });
});
${SERVER_FOOTER}`;
}

function generateIndexHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Experiment</title>
    <script src="https://unpkg.com/jspsych@8.2.1"></script>
    <link href="https://unpkg.com/jspsych@8.2.1/css/jspsych.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://unpkg.com/@jspsych/plugin-survey@1.0.1/css/survey.css">
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-survey-text@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-survey-html-form@1.0.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-survey@1.0.1"></script>
    <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-initialize-microphone@1.0.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-survey-multi-choice@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-button-response@1.2.0"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-audio-response@1.0.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-audio-keyboard-response@2.1.0"></script>
    <script>
        console.warn = () => {};
        let test_stimuli; let images;
        async function preload_images(data) {
            let preloadedImages = [];
            data.forEach(img => { let ogImg = new Image(); ogImg.src = img; preloadedImages.push(ogImg); });
            return preloadedImages;
        }
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/get-data');
                if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
                const data = await response.json();
                test_stimuli = data['test_stimuli']; images = data['images'];
                await preload_images(images).then((result) => { images = result; });
                initializeJsPsych();
            } catch (error) { console.error('Error fetching data:', error); }
        }
        function initializeJsPsych() {
            const jsPsych = initJsPsych();
            function getParamFromURL(name) {
                name = name.replace(/\\[/, "\\\\[").replace(/]/, "\\\\]");
                let regex = new RegExp("[?&]" + name + "=([^&#]*)");
                let results = regex.exec(window.location.href);
                try { return results ? decodeURIComponent(results[1]) : ""; } catch (error) { return ""; }
            }
            let subject_id = "subject_" + Math.floor(Math.random() * 1000000);
            let worker_id = getParamFromURL('PROLIFIC_PID') || subject_id;
            let study_id = getParamFromURL('STUDY_ID') || "NULL";
            let session_id = getParamFromURL('SESSION_ID') || "NULL";
            jsPsych.data.addProperties({ subject: subject_id, worker_id, study_id, session_id });
            let timeline = [];
            jsPsych.run({ timeline, preload_images: images });
        }
        async function sendResults(results) {
            try {
                const response = await fetch('http://localhost:3000/submit-results', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(results)
                });
                if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
                const result = await response.json(); console.log(result.message);
            } catch (error) { console.error('Error sending results:', error); }
        }
        window.onload = function () { fetchData(); };
    </script>
</head>
<body></body>
</html>`;
}

// ─── Initial form state ───────────────────────────────────────────────────────

function getInitialFormData(experimentType) {
    const base = {
        FIREBASE_API_KEY: "", FIREBASE_AUTH_DOMAIN: "", FIREBASE_DATABASE_URL: "",
        FIREBASE_PROJECT_ID: "", FIREBASE_STORAGE_BUCKET: "", FIREBASE_MESSAGING_SENDER_ID: "",
        FIREBASE_APP_ID: "", AIRTABLE_API_KEY: "",
    };
    if (experimentType === "iat") return { ...base, AIRTABLE_BASES: [{ id: "", tables: [""] }] };
    if (experimentType === "alive") return { ...base, AIRTABLE_BASES: [{ id: "", tables: [""] }], NUM_AWS_BUCKETS: 0, AWS_BUCKETS: {} };
    if (experimentType === "alignment") return { ...base, AIRTABLE_ALIGNMENT_BASE: "", AIRTABLE_ALIGNMENT_TABLE_1: "", AIRTABLE_ALIGNMENT_TABLE_2: "", AIRTABLE_ALIGNMENT_TABLE_3: "", AWS_BUCKET_LINK: "" };
    return base;
}

// ─── Airtable Bases Builder ───────────────────────────────────────────────────

function AirtableBasesBuilder({ bases, onChange }) {
    const updateBaseId = (bi, value) => {
        onChange(bases.map((b, i) => i === bi ? { ...b, id: value } : b));
    };
    const updateTable = (bi, ti, value) => {
        onChange(bases.map((b, i) => i !== bi ? b : { ...b, tables: b.tables.map((t, j) => j === ti ? value : t) }));
    };
    const addTable = (bi) => {
        onChange(bases.map((b, i) => i !== bi ? b : { ...b, tables: [...b.tables, ""] }));
    };
    const removeTable = (bi, ti) => {
        onChange(bases.map((b, i) => {
            if (i !== bi) return b;
            const tables = b.tables.filter((_, j) => j !== ti);
            return { ...b, tables: tables.length === 0 ? [""] : tables };
        }));
    };
    const addBase = () => onChange([...bases, { id: "", tables: [""] }]);
    const removeBase = (bi) => { if (bases.length > 1) onChange(bases.filter((_, i) => i !== bi)); };

    const totalSlots = bases.reduce((acc, b) => acc + b.tables.length, 0);

    return (
        <div className="airtable-bases-builder">
            {bases.map((base, bi) => {
                // Calculate slot offset for this base
                const slotOffset = bases.slice(0, bi).reduce((acc, b) => acc + b.tables.length, 0);
                return (
                    <div className="airtable-base-card" key={bi}>
                        <div className="airtable-base-card-header">
                            <span className="airtable-base-label">Base {bi + 1}</span>
                            {bases.length > 1 && (
                                <button className="airtable-remove-base-btn" onClick={() => removeBase(bi)} type="button">
                                    Remove base
                                </button>
                            )}
                        </div>

                        <div className="multistep-input-row">
                            <label className="multistep-label">Base ID</label>
                            <input
                                className="multistep-input"
                                type="text"
                                placeholder="appXXXXXXXXXXXXXX"
                                value={base.id}
                                onChange={(e) => updateBaseId(bi, e.target.value)}
                            />
                        </div>

                        <div className="airtable-tables-section">
                            <div className="airtable-tables-heading">
                                Tables
                                <span className="airtable-slot-hint">
                                    Firebase keys: <code>table_{ORDINALS[slotOffset]}</code>
                                    {base.tables.length > 1 && <> → <code>table_{ORDINALS[slotOffset + base.tables.length - 1]}</code></>}
                                </span>
                            </div>
                            {base.tables.map((table, ti) => (
                                <div className="airtable-table-row" key={ti}>
                                    <div className="multistep-input-row" style={{ flex: 1 }}>
                                        <label className="multistep-label">
                                            Table {ti + 1}
                                            <span className="airtable-key-badge">table_{ORDINALS[slotOffset + ti]}</span>
                                        </label>
                                        <input
                                            className="multistep-input"
                                            type="text"
                                            placeholder="tblXXXXXXXXXXXXXX"
                                            value={table}
                                            onChange={(e) => updateTable(bi, ti, e.target.value)}
                                        />
                                    </div>
                                    {base.tables.length > 1 && (
                                        <button className="airtable-remove-table-btn" onClick={() => removeTable(bi, ti)} type="button">✕</button>
                                    )}
                                </div>
                            ))}
                            <button className="airtable-add-table-btn" onClick={() => addTable(bi)} type="button">
                                + Add table
                            </button>
                        </div>
                    </div>
                );
            })}

            <button className="airtable-add-base-btn" onClick={addBase} type="button">
                + Add another base
            </button>

            <div className="airtable-summary">
                {totalSlots} total table slot{totalSlots !== 1 ? "s" : ""} across {bases.length} base{bases.length !== 1 ? "s" : ""}
                {totalSlots > 0 && <> · Firebase keys: <code>table_one</code>{totalSlots > 1 && <> → <code>table_{ORDINALS[totalSlots - 1]}</code></>}</>}
            </div>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CreateMultiStepForm({ steps, experimentType, onClose }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [formData, setFormData] = useState(() => getInitialFormData(experimentType));
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const isLastStep = stepIndex === steps.length - 1;
    const progress = Math.round((stepIndex / (steps.length - 1)) * 100);

    const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleBasesChange = (updated) => setFormData((prev) => ({ ...prev, AIRTABLE_BASES: updated }));

    const handleDynamicBucketChange = (index, value) => {
        const keys = ["AWS_BUCKET_LINK","AWS_BUCKET_TWO_LINK","AWS_BUCKET_THREE_LINK","AWS_BUCKET_FOUR_LINK","AWS_BUCKET_FIVE_LINK"];
        const key = keys[index] || `AWS_BUCKET_${index + 1}_LINK`;
        setFormData((prev) => ({ ...prev, AWS_BUCKETS: { ...prev.AWS_BUCKETS, [key]: value } }));
    };

    const generateAndDownload = async () => {
        setDownloading(true);
        try {
            const zip = new JSZip();
            zip.file(".env", generateEnvContent(formData, experimentType));
            const serverContent = experimentType === "iat"
                ? generateIATServer(formData.AIRTABLE_BASES || [])
                : experimentType === "alive"
                    ? generateAliveServer(formData.AIRTABLE_BASES || [], formData.AWS_BUCKETS || {})
                    : generateAlignmentServer();
            zip.file("server.js", serverContent);
            zip.folder("public").file("index.html", generateIndexHTML());
            zip.file("package.json", JSON.stringify({
                name: `${experimentType}-experiment`, version: "1.0.0",
                main: "server.js", scripts: { start: "node server.js" },
                dependencies: { "body-parser": "^1.20.2", "cors": "^2.8.5", "dotenv": "^16.0.3", "express": "^4.18.2", "firebase": "^10.7.0", "node-fetch": "^2.7.0" }
            }, null, 2));
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `${experimentType}-experiment-setup.zip`);
            setDownloaded(true);
        } catch (err) {
            console.error("Error generating ZIP:", err);
        } finally {
            setDownloading(false);
        }
    };

    const currentStep = steps[stepIndex];

    return (
        <div className="multistep-wrapper">
            <div className="multistep-header">
                <div className="multistep-meta">
                    <span className="multistep-experiment-tag">{experimentType.toUpperCase()}</span>
                    <button className="multistep-close" onClick={onClose}>✕</button>
                </div>
                <div className="multistep-progress-bar">
                    <div className="multistep-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="multistep-step-count">Step {stepIndex + 1} of {steps.length}</div>
            </div>

            <div className="multistep-body">
                <h2 className="multistep-title">{currentStep.title}</h2>
                <p className="multistep-content">{currentStep.content}</p>

                {currentStep.inputs && (
                    <div className="multistep-inputs">
                        {currentStep.inputs.map((input) => (
                            <div className="multistep-input-row" key={input.name}>
                                <label className="multistep-label">{input.label}</label>
                                <input
                                    className="multistep-input"
                                    type={input.type}
                                    name={input.name}
                                    value={formData[input.name] ?? ""}
                                    onChange={handleChange}
                                    min={input.type === "number" ? 0 : undefined}
                                    max={input.max || undefined}
                                    placeholder={input.type === "number" ? "0" : `Enter ${input.label}`}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {currentStep.dynamicInputs === "AIRTABLE_BASES" && (
                    <AirtableBasesBuilder
                        bases={formData.AIRTABLE_BASES || [{ id: "", tables: [""] }]}
                        onChange={handleBasesChange}
                    />
                )}

                {currentStep.dynamicInputs === "AWS_BUCKETS" && Number(formData.NUM_AWS_BUCKETS) > 0 && (
                    <div className="multistep-inputs">
                        <div className="multistep-dynamic-label">AWS Bucket Links</div>
                        {Array.from({ length: Number(formData.NUM_AWS_BUCKETS) }).map((_, index) => {
                            const keys = ["AWS_BUCKET_LINK","AWS_BUCKET_TWO_LINK","AWS_BUCKET_THREE_LINK","AWS_BUCKET_FOUR_LINK","AWS_BUCKET_FIVE_LINK"];
                            return (
                                <div className="multistep-input-row" key={index}>
                                    <label className="multistep-label">Bucket {index + 1} Link</label>
                                    <input
                                        className="multistep-input"
                                        type="text"
                                        placeholder={`https://your-bucket-${index + 1}.s3.amazonaws.com`}
                                        value={formData.AWS_BUCKETS[keys[index]] || ""}
                                        onChange={(e) => handleDynamicBucketChange(index, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {isLastStep && (
                    <div className="multistep-download-area">
                        <div className="multistep-file-list">
                            <span className="multistep-file-item">📄 .env</span>
                            <span className="multistep-file-item">🖥️ server.js</span>
                            <span className="multistep-file-item">🌐 public/index.html</span>
                            <span className="multistep-file-item">📦 package.json</span>
                        </div>
                        <button
                            className={`multistep-download-btn ${downloaded ? "downloaded" : ""}`}
                            onClick={generateAndDownload}
                            disabled={downloading}
                        >
                            {downloading ? "Generating..." : downloaded ? "✓ Downloaded!" : "Download ZIP"}
                        </button>
                    </div>
                )}
            </div>

            <div className="multistep-nav">
                {stepIndex > 0 && <button className="multistep-btn-back" onClick={prevStep}>← Back</button>}
                {!isLastStep && <button className="multistep-btn-next" onClick={nextStep}>Next →</button>}
            </div>
        </div>
    );
}