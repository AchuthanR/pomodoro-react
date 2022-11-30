import "./Settings.css";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusTimeLength: this.props.settings.focusTimeLength,
            shortBreakTimeLength: this.props.settings.shortBreakTimeLength,
            longBreakTimeLength: this.props.settings.longBreakTimeLength,
            noRoundsTillLongBreak: this.props.settings.noRoundsTillLongBreak,
            appTheme: this.props.settings.appTheme
        };
        this.uncontrolledSettings = {
            shouldFocusAutoStart: this.props.settings.shouldFocusAutoStart,
            shouldBreakAutoStart: this.props.settings.shouldBreakAutoStart,
            shouldShowFocusNotification: this.props.settings.shouldShowFocusNotification,
            shouldShowBreakNotification: this.props.settings.shouldShowBreakNotification
        };
        document.onkeyup = e => {
            if ((e.which || e.keyCode) === 27) {
                this.props.closeSettingsOnClick();
            }
        };
    }

    focusTimeLengthHandleChange = e => {
        this.setState({ focusTimeLength: Number(e.target.value) });
    };

    shortBreakTimeLengthHandleChange = e => {
        this.setState({ shortBreakTimeLength: Number(e.target.value) });
    };

    longBreakTimeLengthHandleChange = e => {
        this.setState({ longBreakTimeLength: Number(e.target.value) });
    };

    noRoundsTillLongBreakHandleChange = e => {
        this.setState({ noRoundsTillLongBreak: Number(e.target.value) });
    };

    focusAutoStartHandleChange = e => {
        this.uncontrolledSettings.shouldFocusAutoStart = e.target.checked;
    };

    breakAutoStartHandleChange = e => {
        this.uncontrolledSettings.shouldBreakAutoStart = e.target.checked;
    };

    focusNotificationHandleChange = e => {
        if (!e.target.checked) {
            this.uncontrolledSettings.shouldShowFocusNotification = false;
            return;
        }

        if (Notification.permission === "granted") {
            this.uncontrolledSettings.shouldShowFocusNotification = true;
        }
        else if (Notification.permission === "denied") {
            e.target.checked = false;
            e.target.disabled = true;
        }
        else {
            e.target.checked = false;
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    e.target.checked = true;
                    this.uncontrolledSettings.shouldShowFocusNotification = true;
                }
                else if (permission === "denied") {
                    e.target.disabled = true;
                }
            });
        }
    };

    breakNotificationHandleChange = e => {
        if (!e.target.checked) {
            this.uncontrolledSettings.shouldShowBreakNotification = false;
            return;
        }

        if (Notification.permission === "granted") {
            this.uncontrolledSettings.shouldShowBreakNotification = true;
        }
        else if (Notification.permission === "denied") {
            e.target.checked = false;
            e.target.disabled = true;
        }
        else {
            e.target.checked = false;
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    e.target.checked = true;
                    this.uncontrolledSettings.shouldShowBreakNotification = true;
                }
                else if (permission === "denied") {
                    e.target.disabled = true;
                }
            });
        }
    };

    appThemeHandleChange = e => {
        this.setState({ appTheme: e.target.value });
    };

    saveHandleClick = () => {
        let settings = {
            focusTimeLength: this.state.focusTimeLength,
            shortBreakTimeLength: this.state.shortBreakTimeLength,
            longBreakTimeLength: this.state.longBreakTimeLength,
            noRoundsTillLongBreak: this.state.noRoundsTillLongBreak,
            shouldFocusAutoStart: this.uncontrolledSettings.shouldFocusAutoStart,
            shouldBreakAutoStart: this.uncontrolledSettings.shouldBreakAutoStart,
            shouldShowFocusNotification: this.uncontrolledSettings.shouldShowFocusNotification,
            shouldShowBreakNotification: this.uncontrolledSettings.shouldShowBreakNotification,
            appTheme: this.state.appTheme
        };
        localStorage.setItem("focusTimeLength", settings.focusTimeLength);
        localStorage.setItem("shortBreakTimeLength", settings.shortBreakTimeLength);
        localStorage.setItem("longBreakTimeLength", settings.longBreakTimeLength);
        localStorage.setItem("noRoundsTillLongBreak", settings.noRoundsTillLongBreak);
        localStorage.setItem("shouldFocusAutoStart", settings.shouldFocusAutoStart);
        localStorage.setItem("shouldBreakAutoStart", settings.shouldBreakAutoStart);
        localStorage.setItem("shouldShowFocusNotification", settings.shouldShowFocusNotification);
        localStorage.setItem("shouldShowBreakNotification", settings.shouldShowBreakNotification);
        localStorage.setItem("appTheme", settings.appTheme);
        this.props.settingsHandleChange(settings);
        this.props.closeSettingsOnClick();
    };

    render() {
        return (
            <div className="Settings">
                <button type="button" className="Settings__close-btn secondary-btn" title="Close" onClick={this.props.closeSettingsOnClick}>
                    <FontAwesomeIcon icon={solid("close")} style={{ height: "16px", width: "16px" }} />
                </button>
                <h2>Settings</h2>

                <p className="caption-text">Do not forget to save your changes.</p>
                <div className="Settings__range-setting">
                    <label>Length of focus session</label>
                    <div>
                        <input type="range" min="15" max="120" value={this.state.focusTimeLength} onChange={this.focusTimeLengthHandleChange} id="focus-time-range" />
                        {this.state.focusTimeLength + " mins"}
                    </div>
                </div>
                <div className="Settings__range-setting">
                    <label>Length of short break</label>
                    <div>
                        <input type="range" min="1" max="30" value={this.state.shortBreakTimeLength} onChange={this.shortBreakTimeLengthHandleChange} id="short-break-time-range" />
                        {this.state.shortBreakTimeLength + " mins"}
                    </div>
                </div>
                <div className="Settings__range-setting">
                    <label>Length of long break</label>
                    <div>
                        <input type="range" min="5" max="60" value={this.state.longBreakTimeLength} onChange={this.longBreakTimeLengthHandleChange} id="long-break-time-range" />
                        {this.state.longBreakTimeLength + " mins"}
                    </div>
                </div>
                <div className="Settings__range-setting">
                    <label>Number of rounds till long break</label>
                    <div>
                        <input type="range" min="2" max="12" value={this.state.noRoundsTillLongBreak} onChange={this.noRoundsTillLongBreakHandleChange} id="no-rounds-time-range" />
                        {this.state.noRoundsTillLongBreak + " rounds"}
                    </div>
                </div>

                <div className="Settings__checkbox-setting">
                    <input type="checkbox" id="auto-start-focus" name="auto-start-focus" onClick={this.focusAutoStartHandleChange} defaultChecked={this.uncontrolledSettings.shouldFocusAutoStart} />
                    <label htmlFor="auto-start-focus">Auto-start focus session after break ends</label>
                </div>
                <div className="Settings__checkbox-setting">
                    <input type="checkbox" id="auto-start-break" name="auto-start-braek" onClick={this.breakAutoStartHandleChange} defaultChecked={this.uncontrolledSettings.shouldBreakAutoStart} />
                    <label htmlFor="auto-start-break">Auto-start break after focus session ends</label>
                </div>
                {("Notification" in window) ?
                    <div className="Settings__checkbox-setting">
                        <input type="checkbox" id="focus-notification" name="focus-notification" onClick={this.focusNotificationHandleChange} defaultChecked={this.uncontrolledSettings.shouldShowFocusNotification && Notification.permission === "granted"} disabled={Notification.permission === "denied"} />
                        <label htmlFor="focus-notification">Show a notification when focus session ends</label>
                    </div>
                    : null}
                {("Notification" in window) ?
                    <div className="Settings__checkbox-setting">
                        <input type="checkbox" id="break-notification" name="break-notification" onClick={this.breakNotificationHandleChange} defaultChecked={this.uncontrolledSettings.shouldShowBreakNotification && Notification.permission === "granted"} disabled={Notification.permission === "denied"} />
                        <label htmlFor="break-notification">Show a notification when break ends</label>
                    </div>
                    : null}
                {(Notification.permission === "denied") ?
                    <p className="Settings__notifications-disabled-info caption-text">You have manually blocked this website from showing notifications. Please enable it by going to site settings.</p>
                    : null}

                <label htmlFor="app-theme">Color theme:</label>
                <div className="Settings__radio-group" id="app-theme" onChange={this.appThemeHandleChange}>
                    <div className="Settings__radio-setting">
                        <input type="radio" value="default" name="app-theme" id="default-app-theme" defaultChecked={this.state.appTheme === "default"} />
                        <label htmlFor="default-app-theme">Default</label>
                    </div>
                    <div className="Settings__radio-setting">
                        <input type="radio" value="light" name="app-theme" id="light-app-theme" defaultChecked={this.state.appTheme === "light"} />
                        <label htmlFor="light-app-theme">Light</label>
                    </div>
                    <div className="Settings__radio-setting">
                        <input type="radio" value="dark" name="app-theme" id="dark-app-theme" defaultChecked={this.state.appTheme === "dark"} />
                        <label htmlFor="dark-app-theme">Dark</label>
                    </div>
                </div>

                <button type="button" className="Settings__save-btn primary-btn" onClick={this.saveHandleClick}>Save</button>
            </div >
        );
    }

    componentWillUnmount() {
        document.onkeyup = null;
    }
}

export default Settings;
