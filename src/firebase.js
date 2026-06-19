import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig, "Alive-2b");
const database = getDatabase(firebaseApp);

const firebaseConfigAlive3 = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_ALIVE_3,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_ALIVE_3,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_ALIVE_3,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_ALIVE_3,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_ALIVE_3,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_ALIVE_3,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_ALIVE_3
}

const firebaseAppAlive3 = initializeApp(firebaseConfigAlive3, "Alive-3");
const databaseAlive3 = getDatabase(firebaseAppAlive3);

const firebaseConfigAlive4 = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_ALIVE_4,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_ALIVE_4,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_ALIVE_4,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_ALIVE_4,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_ALIVE_4,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_ALIVE_4,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_ALIVE_4
}

const firebaseAppAlive4 = initializeApp(firebaseConfigAlive4, "Alive-4");
const databaseAlive4 = getDatabase(firebaseAppAlive4);

const firebaseConfigAlive4B = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_ALIVE_4B,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_ALIVE_4B,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_ALIVE_4B,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_ALIVE_4B,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_ALIVE_4B,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_ALIVE_4B,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_ALIVE_4B
}

const firebaseAppAlive4B = initializeApp(firebaseConfigAlive4B, "Alive-4B");
const databaseAlive4B = getDatabase(firebaseAppAlive4B);

const firebaseConfigAlivePilot1 = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_PILOT_1,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_PILOT_1,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_PILOT_1,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_PILOT_1,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PILOT_1,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_PILOT_1,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_PILOT_1
}

const firebaseAppAlivePilot1 = initializeApp(firebaseConfigAlivePilot1, "Pilot-1");
const databaseAlivePilot1 = getDatabase(firebaseAppAlivePilot1);

const firebaseConfigAlivePilot2 = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_PILOT_2,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_PILOT_2,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_PILOT_2,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_PILOT_2,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PILOT_2,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_PILOT_2,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_PILOT_2
}

const firebaseAppAlivePilot2 = initializeApp(firebaseConfigAlivePilot2, "Pilot-2");
const databaseAlivePilot2 = getDatabase(firebaseAppAlivePilot2);

const firebaseConfigAliveIndivDiffPilot1 = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_INDIV_PILOT_1,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_INDIV_PILOT_1,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_INDIV_PILOT_1,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_INDIV_PILOT_1,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_INDIV_PILOT_1,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_INDIV_PILOT_1,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_INDIV_PILOT_1
}

const firebaseAppAliveIndivDiffPilot1 = initializeApp(firebaseConfigAliveIndivDiffPilot1, "Indiv-Diff-Pilot-1");
const databaseAliveIndivDiffPilot1 = getDatabase(firebaseAppAliveIndivDiffPilot1);

const firebaseConfigAliveIndivDiffPilot2 = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_INDIV_PILOT_2,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_INDIV_PILOT_2,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_INDIV_PILOT_2,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_INDIV_PILOT_2,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_INDIV_PILOT_2,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_INDIV_PILOT_2,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_INDIV_PILOT_2
}

const firebaseAppAliveIndivDiffPilot2 = initializeApp(firebaseConfigAliveIndivDiffPilot2, "Indiv-Diff-Pilot-2");
const databaseAliveIndivDiffPilot2 = getDatabase(firebaseAppAliveIndivDiffPilot2);

const firebaseConfigAlignmentVoice = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_ALIGNMENNT_VOICE,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_ALIGNMENT_VOICE,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_ALIGNMENT_VOICE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_ALIGNMENT_VOICE,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_ALIGNMENT_VOICE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_ALIGNMENT_VOICE,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_ALIGNMENT_VOICE
}

const firebaseAppAlignmentVoice = initializeApp(firebaseConfigAlignmentVoice, "Alignment-Voice");
const databaseAlignmentVoice = getDatabase(firebaseAppAlignmentVoice);

const firebaseConfigIAT = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT
}

const firebaseAppIAT = initializeApp(firebaseConfigIAT, "IAT");
const databaseIAT = getDatabase(firebaseAppIAT);

const firebaseConfigIATHuman = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_HUMAN,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_HUMAN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_HUMAN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_HUMAN,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_HUMAN,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_HUMAN,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_HUMAN
}

const firebaseAppIATHuman = initializeApp(firebaseConfigIATHuman, "IAT-Human");
const databaseIATHuman = getDatabase(firebaseAppIATHuman);

const firebaseConfigIATPlant = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_PLANT,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_PLANT,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_PLANT,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_PLANT,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_PLANT,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_PLANT,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_PLANT
}

const firebaseAppIATPlant = initializeApp(firebaseConfigIATPlant, "IAT-Plant");
const databaseIATPlant = getDatabase(firebaseAppIATPlant);

const firebaseConfigIATPaart = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_PLAARTS,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_PLAARTS,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_PLAARTS,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_PLAARTS,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_PLAARTS,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_PLAARTS,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_PLAARTS
}

const firebaseAppIATPaart = initializeApp(firebaseConfigIATPaart, "IAT-Plant-Artifact");
const databaseIATPaart = getDatabase(firebaseAppIATPaart);

const firebaseConfigIATNatVeh = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_VEHICLE,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_VEHICLE,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_VEHICLE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_VEHICLE,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_VEHICLE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_VEHICLE,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_VEHICLE
}

const firebaseAppIATNatVeh = initializeApp(firebaseConfigIATNatVeh, "IAT-Nature-Vehicle");
const databaseIATNatVeh = getDatabase(firebaseAppIATNatVeh);

const firebaseConfigIATAnnat = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_ANNAT,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_ANNAT,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_ANNAT,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_ANNAT,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_ANNAT,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_ANNAT,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_ANNAT
}

const firebaseAppIATAnnat = initializeApp(firebaseConfigIATAnnat, "IAT-Animal-Nature");
const databaseIATAnnat = getDatabase(firebaseAppIATAnnat);

const firebaseConfigIATNatart = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_NATART,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_NATART,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_NATART,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_NATART,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_NATART,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_NATART,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_NATART
}

const firebaseAppIATNatart = initializeApp(firebaseConfigIATNatart, "IAT-Nature-Artifact");
const databaseIATNatart = getDatabase(firebaseAppIATNatart);

const firebaseConfigIATPlaveh = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_PLAVEH,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_PLAVEH,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_PLAVEH,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_PLAVEH,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_PLAVEH,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_PLAVEH,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_PLAVEH
}

const firebaseAppIATPlaveh = initializeApp(firebaseConfigIATPlaveh, "IAT-Plant-Vehicle");
const databaseIATPlaveh = getDatabase(firebaseAppIATPlaveh);

const firebaseConfigIATPlanat = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_PLANAT,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_PLANAT,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_PLANAT,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_PLANAT,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_PLANAT,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_PLANAT,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_PLANAT
}

const firebaseAppIATPlanat = initializeApp(firebaseConfigIATPlanat, "IAT-Plant-Nature");
const databaseIATPlanat = getDatabase(firebaseAppIATPlanat);

const firebaseConfigIATAnimals = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_ANIMALS,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_ANIMALS,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_ANIMALS,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_ANIMALS,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_ANIMALS,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_ANIMALS,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_ANIMALS
}

const firebaseAppIATAnimals = initializeApp(firebaseConfigIATAnimals, "IAT-Animals");
const databaseIATAnimals = getDatabase(firebaseAppIATAnimals);

const firebaseConfigIATHumans = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_IAT_HUMANS,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_IAT_HUMANS,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_IAT_HUMANS,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_IAT_HUMANS,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_IAT_HUMANS,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_IAT_HUMANS,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_IAT_HUMANS
}

const firebaseAppIATHumans = initializeApp(firebaseConfigIATHumans, "IAT-Humans");
const databaseIATHumans = getDatabase(firebaseAppIATHumans);

const firebaseConfigCategorizationOrders = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_CATEGORIZATION_ORDERS,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_CATEGORIZATION_ORDERS,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_CATEGORIZATION_ORDERS,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_CATEGORIZATION_ORDERS,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_CATEGORIZATION_ORDERS,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_CATEGORIZATION_ORDERS,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_CATEGORIZATION_ORDERS
}

const firebaseAppCategorizationOrders = initializeApp(firebaseConfigCategorizationOrders, "Categorization-Order");
const databaseCategorizationOrders = getDatabase(firebaseAppCategorizationOrders);

const firebaseConfigAliveIndivRep = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_ALIVE_INDIV_REP,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_ALIVE_INDIV_REP,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_ALIVE_INDIV_REP,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_ALIVE_INDIV_REP,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_ALIVE_INDIV_REP,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_ALIVE_INDIV_REP,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_ALIVE_INDIV_REP
}

const firebaseAppAliveIndivRep = initializeApp(firebaseConfigAliveIndivRep, "Alive Indiv Rep");
const databaseAliveIndivRep = getDatabase(firebaseAppAliveIndivRep);

const auth = getAuth(firebaseApp);

export {database, databaseAlive3, databaseAlive4, databaseAlive4B,
    databaseAlivePilot1, databaseAlivePilot2, databaseAliveIndivDiffPilot1,
    databaseAliveIndivDiffPilot2, databaseAlignmentVoice,
    databaseIAT, databaseIATHuman, databaseIATPlant,databaseIATPaart,
    databaseIATNatVeh, databaseIATAnnat, databaseIATPlaveh, databaseIATPlanat,
    databaseIATNatart, databaseIATAnimals, databaseIATHumans, databaseCategorizationOrders,
    databaseAliveIndivRep, ref, onValue, auth};