import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import Routes from "./routes/routes";
import { UserProvider } from "./hooks/UserContext";
import GlobalStyles from "./styles/globalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <UserProvider>
            <Routes />
        </UserProvider>
        <ToastContainer autoClose={2000} theme="colored" />
        <GlobalStyles />
    </>
)
