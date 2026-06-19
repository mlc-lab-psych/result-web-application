import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './multi-step.css'
import App from './App';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


import {
    database,
    databaseAlignmentVoice,
    databaseAlive3,
    databaseAlive4,
    databaseAlive4B, databaseAliveIndivDiffPilot1, databaseAliveIndivDiffPilot2, databaseAliveIndivRep,
    databaseAlivePilot1,
    databaseAlivePilot2, databaseCategorizationOrders,
    databaseIAT, databaseIATAnimals,
    databaseIATAnnat,
    databaseIATHuman, databaseIATHumans, databaseIATNatart,
    databaseIATNatVeh,
    databaseIATPaart, databaseIATPlanat,
    databaseIATPlant, databaseIATPlaveh
} from "./firebase";
import DataTable from "./pages/data-table";
import ProtectedRoute from "./protected-route";
import NavBar from "./components/Navbar";
import AuthPage from "./pages/sign-in";
import ForgotPassword from "./pages/forgot-password";
import Footer from "./components/Footer";
import CreateExperiment from "./pages/create";
import AddJSONtoCSV from "./pages/add";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <App/>
                <Footer/>
            </ProtectedRoute>

        )
    },
    {
        path:"/login",
        element: (
            <AuthPage/>
        )
    },
    {
        path:"/forgot-password",
        element: <ForgotPassword />
    },
    {
        path:"/alive-2b",
        element:
            (
                <ProtectedRoute>
                    <NavBar/>
                    <DataTable db={database} audio={false} experimentName={"Alive Experiment 2B"}/>
                </ProtectedRoute>
            )
    },
    {
        path:"/alive-3",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAlive3} audio={false} experimentName={"Alive Experiment 3"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/alive-4",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAlive4} audio={false} experimentName={"Alive Experiment 4"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/alive-4b",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAlive4B} audio={false} experimentName={"Alive Experiment 4B"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/pilot-1",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAlivePilot1} audio={false} experimentName={"Alive Experiment Pilot 1"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/pilot-1-session-2",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAlivePilot2} audio={false} experimentName={"Alive Experiment Pilot 1 Session 2"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/alive-indiv-diff-1",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAliveIndivDiffPilot1} audio={false} experimentName={"Alive Experiment Indiv Diff Pilot Session 1"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/alive-indiv-diff-2",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAliveIndivDiffPilot2} audio={false} experimentName={"Alive Experiment Indiv Diff Pilot Session 2"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/alignment-voice",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAlignmentVoice} audio={true} experimentName={"Alignment Voice Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-anart",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIAT} audio={false} experimentName={"IAT Animal Artifact Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-hyuart",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATHuman} audio={false} experimentName={"IAT Human Artifact Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-anpla",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATPlant} audio={false} experimentName={"IAT Animal Plant Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-plaart",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATPaart} audio={false} experimentName={"IAT Plant Artifact Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-natveh",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATNatVeh} audio={false} experimentName={"IAT Nature Vehicle Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-annat",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATAnnat} audio={false} experimentName={"IAT Animal Nature Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-planat",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATPlanat} audio={false} experimentName={"IAT Plant Nature Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-natart",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATNatart} audio={false} experimentName={"IAT Nature Artifact Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-plaveh",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATPlaveh} audio={false} experimentName={"IAT Plant Vehicle Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-animals",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATAnimals} audio={false} experimentName={"IAT Animals Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/iat-humans",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseIATHumans} audio={false} experimentName={"IAT Humans Experiment"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/categorization-order",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseCategorizationOrders} audio={false} experimentName={"Categorization Order"}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/categorization-order-reverse",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseCategorizationOrders} audio={false} experimentName={"Categorization Order Reverse"} sharedDB={true} session={3}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/alive-indiv-rep",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAliveIndivRep} audio={false} experimentName={"Alive Indiv Rep"} sharedDB={true} session={1}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/alive-indiv-rep-session-2",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <DataTable db={databaseAliveIndivRep} audio={false} experimentName={"Alive Indiv Rep Session 2"} sharedDB={true} session={2}/>
            </ProtectedRoute>
        )
    },
    {
        path:"/add-json-file",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <AddJSONtoCSV/>
            </ProtectedRoute>
        )
    },
    {
        path:"/create-experiment",
        element: (
            <ProtectedRoute>
                <NavBar/>
                <CreateExperiment/>
            </ProtectedRoute>
        )
    }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
