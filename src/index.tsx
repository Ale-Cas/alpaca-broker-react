import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./services/store";
import App from "./App";
import { darkTheme } from "./theme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
