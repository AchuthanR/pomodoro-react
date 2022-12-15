import "./App.css";
import "./styles.css";
import React, { useEffect } from "react";
import { SettingsProvider } from "./SettingsContext";
import Navbar from "./Navbar";
import Timer from "./Timer";
import { getAppTheme, setAppTheme } from "./settingsHelper";

function App() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js");
        }

        window.matchMedia("(prefers-color-scheme: light)").onchange = (e) => {
            if (getAppTheme() === "default") {
                document.documentElement.setAttribute("data-theme", e.matches ? "light" : "dark");
            }
        };
        setAppTheme();
    }, []);

    return (
        <SettingsProvider>
            <div className="App">
                <div id="modal"></div>
                <main>
                    <Navbar />
                    <Timer />
                </main>
            </div>
        </SettingsProvider>
    );
}

export default App;
