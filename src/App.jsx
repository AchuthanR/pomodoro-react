import "./App.css";
import "./styles.css";
import React from "react";
import Timer from "./Timer";
import Settings from "./Settings";

class App extends React.Component {
	constructor() {
		super();

		if ('serviceWorker' in navigator) {
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

		window.matchMedia('(prefers-color-scheme: light)').onchange = e => {
			if (this.state.settings.appTheme === "default") {
				document.documentElement.setAttribute("data-theme", e.matches ? "light" : "dark");
			}
		};
		this.setAppTheme(settings.appTheme);

		this.state = { isModalVisible: false, settings: settings };
	}

	setAppTheme = (theme) => {
		if (theme === "default") {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
				document.documentElement.setAttribute("data-theme", "light");
			}
			else {
				document.documentElement.setAttribute("data-theme", "dark");
			}
		}
		else {
			document.documentElement.setAttribute("data-theme", theme);
		}
	}

	openSettingsHandleClick = () => {
		this.setState({ isModalVisible: true });
	}

	closeSettingsHandleClick = () => {
		this.setState({ isModalVisible: false });
	}

	settingsHandleChange = (settings) => {
		this.setState({ settings: settings });
		this.setAppTheme(settings.appTheme);
	}

	render() {
		return (
			<div className="App">
				<Timer openSettingsOnClick={this.openSettingsHandleClick}
					closeSettingsOnClick={this.closeSettingsHandleClick}
					settings={this.state.settings} />
				{this.state.isModalVisible ?
					<div className="modal">
						<Settings closeSettingsOnClick={this.closeSettingsHandleClick} settings={this.state.settings} settingsHandleChange={this.settingsHandleChange} />
					</div>
					: null}
				{this.state.isModalVisible ?
					<div className="overlay" />
					: null}
			</div>
		);
	}
}

export default App;
