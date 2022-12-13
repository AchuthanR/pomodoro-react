import "./App.css";
import "./styles.css";
import React from "react";
import Navbar from "./Navbar";
import Timer from "./Timer";

class App extends React.Component {
    constructor() {
        super();

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js");
        }

        let settings = {
            focusTimeLength: Number(localStorage.getItem("focusTimeLength") ?? 25),
            shortBreakTimeLength: Number(localStorage.getItem("shortBreakTimeLength") ?? 5),
            longBreakTimeLength: Number(localStorage.getItem("longBreakTimeLength") ?? 15),
            noRoundsTillLongBreak: Number(localStorage.getItem("noRoundsTillLongBreak") ?? 4),
            shouldFocusAutoStart: JSON.parse(localStorage.getItem("shouldFocusAutoStart") ?? false),
            shouldBreakAutoStart: JSON.parse(localStorage.getItem("shouldBreakAutoStart") ?? false),
            shouldShowFocusNotification: JSON.parse(localStorage.getItem("shouldShowFocusNotification") ?? false),
            shouldShowBreakNotification: JSON.parse(localStorage.getItem("shouldShowBreakNotification") ?? false),
            appTheme: localStorage.getItem("appTheme") ?? "dark"
        };

        window.matchMedia("(prefers-color-scheme: light)").onchange = (e) => {
            if (this.state.settings.appTheme === "default") {
                document.documentElement.setAttribute("data-theme", e.matches ? "light" : "dark");
            }
        };
        this.setAppTheme(settings.appTheme);

        this.state = { settings: settings };
    }

    setAppTheme = (theme) => {
        if (theme === "default") {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
                document.documentElement.setAttribute("data-theme", "light");
            }
            else {
                document.documentElement.setAttribute("data-theme", "dark");
            }
        }
        else {
            document.documentElement.setAttribute("data-theme", theme);
        }
    };

    settingsHandleChange = (settings) => {
        this.setState({ settings: settings });
        this.setAppTheme(settings.appTheme);
    };

    render() {
        return (
            <div className="App">
                <div id="modal"></div>
                <main>
                    <Navbar toggleModal={this.toggleModal} settings={this.state.settings} settingsHandleChange={this.settingsHandleChange} />
                    <Timer settings={this.state.settings} />
                </main>
            </div>
        );
    }
}

export default App;
