// const iatSteps = [
//     {
//         title: "Welcome",
//         content: "Let's set up your IAT Experiment. Follow the steps to configure your environment."
//     },
//     {
//         title: "Firebase Configuration",
//         content: "Enter your Firebase project credentials.",
//         inputs: [
//             { label: "API Key", name: "FIREBASE_API_KEY", type: "text" },
//             { label: "Auth Domain", name: "FIREBASE_AUTH_DOMAIN", type: "text" },
//             { label: "Database URL", name: "FIREBASE_DATABASE_URL", type: "text" },
//             { label: "Project ID", name: "FIREBASE_PROJECT_ID", type: "text" },
//             { label: "Storage Bucket", name: "FIREBASE_STORAGE_BUCKET", type: "text" },
//             { label: "Messaging Sender ID", name: "FIREBASE_MESSAGING_SENDER_ID", type: "text" },
//             { label: "App ID", name: "FIREBASE_APP_ID", type: "text" },
//         ],
//     },
//     {
//         title: "Airtable Configuration",
//         content: "Enter your Airtable credentials and the number of tables you are using (max 8).",
//         inputs: [
//             { label: "Airtable API Key", name: "AIRTABLE_API_KEY", type: "text" },
//             { label: "Airtable Base ID", name: "AIRTABLE_ALIVE_BASE", type: "text" },
//             { label: "Number of Airtable Tables", name: "NUM_AIRTABLE_TABLES", type: "number", max: 8 }
//         ],
//         dynamicInputs: "AIRTABLE_TABLES"
//     },
//     {
//         title: "Review & Download",
//         content: "Everything looks good! Click below to download your ZIP file containing the .env, server.js, and index.html."
//     }
// ];
//
// const aliveSteps = [
//     {
//         title: "Welcome",
//         content: "Let's set up your Alive Experiment. Follow the steps to configure your environment."
//     },
//     {
//         title: "Firebase Configuration",
//         content: "Enter your Firebase project credentials.",
//         inputs: [
//             { label: "API Key", name: "FIREBASE_API_KEY", type: "text" },
//             { label: "Auth Domain", name: "FIREBASE_AUTH_DOMAIN", type: "text" },
//             { label: "Database URL", name: "FIREBASE_DATABASE_URL", type: "text" },
//             { label: "Project ID", name: "FIREBASE_PROJECT_ID", type: "text" },
//             { label: "Storage Bucket", name: "FIREBASE_STORAGE_BUCKET", type: "text" },
//             { label: "Messaging Sender ID", name: "FIREBASE_MESSAGING_SENDER_ID", type: "text" },
//             { label: "App ID", name: "FIREBASE_APP_ID", type: "text" },
//         ],
//     },
//     {
//         title: "Airtable Configuration",
//         content: "Enter your Airtable credentials and the number of condition tables.",
//         inputs: [
//             { label: "Airtable API Key", name: "AIRTABLE_API_KEY", type: "text" },
//             { label: "Airtable Base ID", name: "AIRTABLE_ALIVE_BASE", type: "text" },
//             { label: "Number of Airtable Tables", name: "NUM_AIRTABLE_TABLES", type: "number" }
//         ],
//         dynamicInputs: "AIRTABLE_TABLES"
//     },
//     {
//         title: "AWS Configuration",
//         content: "Enter the number of AWS S3 buckets your stimuli are stored across.",
//         inputs: [
//             { label: "Number of AWS Buckets", name: "NUM_AWS_BUCKETS", type: "number" }
//         ],
//         dynamicInputs: "AWS_BUCKETS"
//     },
//     {
//         title: "Review & Download",
//         content: "Everything looks good! Click below to download your ZIP file containing the .env, server.js, and index.html."
//     }
// ];
//
// const alignmentSteps = [
//     {
//         title: "Welcome",
//         content: "Let's set up your Alignment Voice Experiment. Follow the steps to configure your environment."
//     },
//     {
//         title: "Firebase Configuration",
//         content: "Enter your Firebase project credentials.",
//         inputs: [
//             { label: "API Key", name: "FIREBASE_API_KEY", type: "text" },
//             { label: "Auth Domain", name: "FIREBASE_AUTH_DOMAIN", type: "text" },
//             { label: "Database URL", name: "FIREBASE_DATABASE_URL", type: "text" },
//             { label: "Project ID", name: "FIREBASE_PROJECT_ID", type: "text" },
//             { label: "Storage Bucket", name: "FIREBASE_STORAGE_BUCKET", type: "text" },
//             { label: "Messaging Sender ID", name: "FIREBASE_MESSAGING_SENDER_ID", type: "text" },
//             { label: "App ID", name: "FIREBASE_APP_ID", type: "text" },
//         ],
//     },
//     {
//         title: "Airtable Configuration",
//         content: "Enter your Airtable credentials. The Alignment experiment uses up to 3 voice tables (Vivian, Melissa, Alexa).",
//         inputs: [
//             { label: "Airtable API Key", name: "AIRTABLE_API_KEY", type: "text" },
//             { label: "Airtable Alignment Base ID", name: "AIRTABLE_ALIGNMENT_BASE", type: "text" },
//             { label: "Table 1 ID (Vivian)", name: "AIRTABLE_ALIGNMENT_TABLE_1", type: "text" },
//             { label: "Table 2 ID (Melissa)", name: "AIRTABLE_ALIGNMENT_TABLE_2", type: "text" },
//             { label: "Table 3 ID (Alexa)", name: "AIRTABLE_ALIGNMENT_TABLE_3", type: "text" },
//         ],
//     },
//     {
//         title: "AWS Configuration",
//         content: "Enter your AWS S3 bucket link where audio files are stored.",
//         inputs: [
//             { label: "AWS Bucket Link", name: "AWS_BUCKET_LINK", type: "text" }
//         ]
//     },
//     {
//         title: "Review & Download",
//         content: "Everything looks good! Click below to download your ZIP file containing the .env, server.js, and index.html."
//     }
// ];
//
// module.exports = { iatSteps, aliveSteps, alignmentSteps };

const iatSteps = [
    {
        title: "Welcome",
        content: "Let's set up your IAT Experiment. Follow the steps to configure your environment."
    },
    {
        title: "Firebase Configuration",
        content: "Enter your Firebase project credentials.",
        inputs: [
            { label: "API Key", name: "FIREBASE_API_KEY", type: "text" },
            { label: "Auth Domain", name: "FIREBASE_AUTH_DOMAIN", type: "text" },
            { label: "Database URL", name: "FIREBASE_DATABASE_URL", type: "text" },
            { label: "Project ID", name: "FIREBASE_PROJECT_ID", type: "text" },
            { label: "Storage Bucket", name: "FIREBASE_STORAGE_BUCKET", type: "text" },
            { label: "Messaging Sender ID", name: "FIREBASE_MESSAGING_SENDER_ID", type: "text" },
            { label: "App ID", name: "FIREBASE_APP_ID", type: "text" },
        ],
    },
    {
        title: "Airtable Configuration",
        content: "Enter your Airtable API key, then add as many bases as you need. Each base can have multiple tables.",
        inputs: [
            { label: "Airtable API Key", name: "AIRTABLE_API_KEY", type: "text" },
        ],
        dynamicInputs: "AIRTABLE_BASES"
    },
    {
        title: "Review & Download",
        content: "Everything looks good! Click below to download your ZIP file containing the .env, server.js, and index.html."
    }
];

const aliveSteps = [
    {
        title: "Welcome",
        content: "Let's set up your Alive Experiment. Follow the steps to configure your environment."
    },
    {
        title: "Firebase Configuration",
        content: "Enter your Firebase project credentials.",
        inputs: [
            { label: "API Key", name: "FIREBASE_API_KEY", type: "text" },
            { label: "Auth Domain", name: "FIREBASE_AUTH_DOMAIN", type: "text" },
            { label: "Database URL", name: "FIREBASE_DATABASE_URL", type: "text" },
            { label: "Project ID", name: "FIREBASE_PROJECT_ID", type: "text" },
            { label: "Storage Bucket", name: "FIREBASE_STORAGE_BUCKET", type: "text" },
            { label: "Messaging Sender ID", name: "FIREBASE_MESSAGING_SENDER_ID", type: "text" },
            { label: "App ID", name: "FIREBASE_APP_ID", type: "text" },
        ],
    },
    {
        title: "Airtable Configuration",
        content: "Enter your Airtable API key, then add as many bases as you need. Each base can have multiple tables.",
        inputs: [
            { label: "Airtable API Key", name: "AIRTABLE_API_KEY", type: "text" },
        ],
        dynamicInputs: "AIRTABLE_BASES"
    },
    {
        title: "AWS Configuration",
        content: "Enter the number of AWS S3 buckets your stimuli are stored across.",
        inputs: [
            { label: "Number of AWS Buckets", name: "NUM_AWS_BUCKETS", type: "number" }
        ],
        dynamicInputs: "AWS_BUCKETS"
    },
    {
        title: "Review & Download",
        content: "Everything looks good! Click below to download your ZIP file containing the .env, server.js, and index.html."
    }
];

const alignmentSteps = [
    {
        title: "Welcome",
        content: "Let's set up your Alignment Voice Experiment. Follow the steps to configure your environment."
    },
    {
        title: "Firebase Configuration",
        content: "Enter your Firebase project credentials.",
        inputs: [
            { label: "API Key", name: "FIREBASE_API_KEY", type: "text" },
            { label: "Auth Domain", name: "FIREBASE_AUTH_DOMAIN", type: "text" },
            { label: "Database URL", name: "FIREBASE_DATABASE_URL", type: "text" },
            { label: "Project ID", name: "FIREBASE_PROJECT_ID", type: "text" },
            { label: "Storage Bucket", name: "FIREBASE_STORAGE_BUCKET", type: "text" },
            { label: "Messaging Sender ID", name: "FIREBASE_MESSAGING_SENDER_ID", type: "text" },
            { label: "App ID", name: "FIREBASE_APP_ID", type: "text" },
        ],
    },
    {
        title: "Airtable Configuration",
        content: "Enter your Airtable credentials. The Alignment experiment uses up to 3 voice tables (Vivian, Melissa, Alexa).",
        inputs: [
            { label: "Airtable API Key", name: "AIRTABLE_API_KEY", type: "text" },
            { label: "Airtable Alignment Base ID", name: "AIRTABLE_ALIGNMENT_BASE", type: "text" },
            { label: "Table 1 ID (Vivian)", name: "AIRTABLE_ALIGNMENT_TABLE_1", type: "text" },
            { label: "Table 2 ID (Melissa)", name: "AIRTABLE_ALIGNMENT_TABLE_2", type: "text" },
            { label: "Table 3 ID (Alexa)", name: "AIRTABLE_ALIGNMENT_TABLE_3", type: "text" },
        ],
    },
    {
        title: "AWS Configuration",
        content: "Enter your AWS S3 bucket link where audio files are stored.",
        inputs: [
            { label: "AWS Bucket Link", name: "AWS_BUCKET_LINK", type: "text" }
        ]
    },
    {
        title: "Review & Download",
        content: "Everything looks good! Click below to download your ZIP file containing the .env, server.js, and index.html."
    }
];

module.exports = { iatSteps, aliveSteps, alignmentSteps };