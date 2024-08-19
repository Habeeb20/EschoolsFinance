import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ExpContextProvider } from "./context/ExpContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <WorkoutContextProvider>
      <ExpContextProvider>
      <App />
      </ExpContextProvider>
   
    </WorkoutContextProvider>

    </AuthContextProvider>
   
  </React.StrictMode>
);
