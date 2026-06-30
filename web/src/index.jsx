import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './multi-step.css'
import App from './App';
import { routes } from './routeconfig';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


// import {
//     database,
//     databaseAlignmentVoice,
//     databaseAlive3,
//     databaseAlive4,
//     databaseAlive4B, databaseAliveIndivDiffPilot1, databaseAliveIndivDiffPilot2, databaseAliveIndivRep,
//     databaseAlivePilot1,
//     databaseAlivePilot2, databaseCategorizationOrders,
//     databaseIAT, databaseIATAnimals,
//     databaseIATAnnat,
//     databaseIATHuman, databaseIATHumans, databaseIATNatart,
//     databaseIATNatVeh,
//     databaseIATPaart, databaseIATPlanat,
//     databaseIATPlant, databaseIATPlaveh
// } from "./firebase";

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

        ...routes.map(({ path, db, url, audio, experimentName, sharedDB, session }) => ({
        path,
        element: (
        <ProtectedRoute>
            <NavBar />
            <DataTable
            db={db}
            url={url}
            audio={audio}
            experimentName={experimentName}
            {...(sharedDB !== undefined && { sharedDB })}
            {...(session  !== undefined && { session  })}
            {...(session  !== undefined && { session  })}
            />
        </ProtectedRoute>
        ),
    })),

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
