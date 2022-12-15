import "./Settings.css";
import React, { useState, useEffect, useContext } from "react";
import { SettingsContext } from "./SettingsContext";
import { getAppTheme, setAppTheme } from "./settingsHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Settings(props) {
    const [settings, setSettings] = useContext(SettingsContext);
    const [focusTimeLength, setFocusTimeLength] = useState(settings.focusTimeLength);
    const [shortBreakTimeLength, setShortBreakTimeLength] = useState(settings.shortBreakTimeLength);
    const [longBreakTimeLength, setLongBreakTimeLength] = useState(settings.longBreakTimeLength);
    const [noRoundsTillLongBreak, setNoRoundsTillLongBreak] = useState(settings.noRoundsTillLongBreak);
    const [theme, setTheme] = useState(getAppTheme());

    const { closeModal } = props;

    useEffect(() => {
        document.onkeyup = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        return () => document.onkeyup = null;
    }, [closeModal]);

    function focusTimeLengthHandleChange(e) {
        setFocusTimeLength(Number(e.target.value));
        localStorage.setItem("focusTimeLength", Number(e.target.value));
        setSettings(settings => { return { ...settings, focusTimeLength: Number(e.target.value) } });
    };

    function shortBreakTimeLengthHandleChange(e) {
        setShortBreakTimeLength(Number(e.target.value));
        localStorage.setItem("shortBreakTimeLength", Number(e.target.value));
        setSettings(settings => { return { ...settings, shortBreakTimeLength: Number(e.target.value) } });
    };

    function longBreakTimeLengthHandleChange(e) {
        setLongBreakTimeLength(Number(e.target.value));
        localStorage.setItem("longBreakTimeLength", Number(e.target.value));
        setSettings(settings => { return { ...settings, longBreakTimeLength: Number(e.target.value) } });
    };

    function noRoundsTillLongBreakHandleChange(e) {
        setNoRoundsTillLongBreak(Number(e.target.value));
        localStorage.setItem("noRoundsTillLongBreak", Number(e.target.value));
        setSettings(settings => { return { ...settings, noRoundsTillLongBreak: Number(e.target.value) } });
    };

    function focusAutoStartHandleChange(e) {
        localStorage.setItem("shouldFocusAutoStart", e.target.checked);
        setSettings(settings => { return { ...settings, shouldFocusAutoStart: e.target.checked } });
    };

    function breakAutoStartHandleChange(e) {
        localStorage.setItem("shouldBreakAutoStart", e.target.checked);
        setSettings(settings => { return { ...settings, shouldBreakAutoStart: e.target.checked } });
    };

    function focusNotificationHandleChange(e) {
        if (!e.target.checked) {
            localStorage.setItem("shouldShowFocusNotification", false);
            setSettings(settings => { return { ...settings, shouldShowFocusNotification: false } });
            return;
        }

        if (Notification.permission === "granted") {
            localStorage.setItem("shouldShowFocusNotification", true);
            setSettings(settings => { return { ...settings, shouldShowFocusNotification: true } });
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
                    localStorage.setItem("shouldShowFocusNotification", true);
                    setSettings(settings => { return { ...settings, shouldShowFocusNotification: true } });
                }
                else if (permission === "denied") {
                    e.target.disabled = true;
                }
            });
        }
    };

    function breakNotificationHandleChange(e) {
        if (!e.target.checked) {
            localStorage.setItem("shouldShowBreakNotification", false);
            setSettings(settings => { return { ...settings, shouldShowBreakNotification: false } });
            return;
        }

        if (Notification.permission === "granted") {
            localStorage.setItem("shouldShowBreakNotification", true);
            setSettings(settings => { return { ...settings, shouldShowBreakNotification: true } });
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
                    localStorage.setItem("shouldShowBreakNotification", true);
                    setSettings(settings => { return { ...settings, shouldShowBreakNotification: true } });
                }
                else if (permission === "denied") {
                    e.target.disabled = true;
                }
            });
        }
    };

    function appThemeHandleChange(e) {
        setTheme(e.target.value);
        localStorage.setItem("appTheme", e.target.value);
        setAppTheme(e.target.value);
    };

    let focusTimeLengthString = "";
    let hours = Math.floor(focusTimeLength / 60);
    if (hours > 1) {
        focusTimeLengthString = hours + " hrs ";
    }
    else if (hours === 1) {
        focusTimeLengthString = hours + " hr ";
    }
    let minutes = focusTimeLength - hours * 60;
    if (minutes > 1) {
        focusTimeLengthString += minutes + " mins";
    }
    else if (minutes === 1) {
        focusTimeLengthString += minutes + " min";
    }

    return (
        <div className="Settings">
            <button type="button" className="Settings__close-btn secondary-btn" title="Close" onClick={closeModal}>
                <FontAwesomeIcon icon={solid("close")} style={{ height: "16px", width: "16px" }} />
            </button>

            <h2 className="Settings__header">Settings</h2>
            <div className="Settings__content">
                <div className="Settings__range-setting">
                    <label>Length of focus session</label>
                    <div>
                        <input type="range" min="15" max="120" value={focusTimeLength} onChange={focusTimeLengthHandleChange} id="focus-time-range" />
                        {focusTimeLengthString}
                    </div>
                </div>
                <div className="Settings__range-setting">
                    <label>Length of short break</label>
                    <div>
                        <input type="range" min="1" max="30" value={shortBreakTimeLength} onChange={shortBreakTimeLengthHandleChange} id="short-break-time-range" />
                        {shortBreakTimeLength + (shortBreakTimeLength > 1 ? " mins" : " min")}
                    </div>
                </div>
                <div className="Settings__range-setting">
                    <label>Length of long break</label>
                    <div>
                        <input type="range" min="5" max="60" value={longBreakTimeLength} onChange={longBreakTimeLengthHandleChange} id="long-break-time-range" />
                        {longBreakTimeLength + " mins"}
                    </div>
                </div>
                <div className="Settings__range-setting">
                    <label>Number of rounds till long break</label>
                    <div>
                        <input type="range" min="2" max="12" value={noRoundsTillLongBreak} onChange={noRoundsTillLongBreakHandleChange} id="no-rounds-time-range" />
                        {noRoundsTillLongBreak + " rounds"}
                    </div>
                </div>

                <div className="Settings__checkbox-setting">
                    <input type="checkbox" id="auto-start-focus" name="auto-start-focus" onClick={focusAutoStartHandleChange} defaultChecked={settings.shouldFocusAutoStart} />
                    <label htmlFor="auto-start-focus">Auto-start focus session after break ends</label>
                </div>
                <div className="Settings__checkbox-setting">
                    <input type="checkbox" id="auto-start-break" name="auto-start-braek" onClick={breakAutoStartHandleChange} defaultChecked={settings.shouldBreakAutoStart} />
                    <label htmlFor="auto-start-break">Auto-start break after focus session ends</label>
                </div>
                {("Notification" in window) ?
                    <div className="Settings__checkbox-setting">
                        <input type="checkbox" id="focus-notification" name="focus-notification" onClick={focusNotificationHandleChange} defaultChecked={settings.shouldShowFocusNotification && Notification.permission === "granted"} disabled={Notification.permission === "denied"} />
                        <label htmlFor="focus-notification">Show a notification when focus session ends</label>
                    </div>
                    : null}
                {("Notification" in window) ?
                    <div className="Settings__checkbox-setting">
                        <input type="checkbox" id="break-notification" name="break-notification" onClick={breakNotificationHandleChange} defaultChecked={settings.shouldShowBreakNotification && Notification.permission === "granted"} disabled={Notification.permission === "denied"} />
                        <label htmlFor="break-notification">Show a notification when break ends</label>
                    </div>
                    : null}
                {(Notification.permission === "denied") ?
                    <p className="Settings__notifications-disabled-info caption-text">You have manually blocked this website from showing notifications. Please enable it by going to site settings.</p>
                    : null}

                <label htmlFor="app-theme">Color theme:</label>
                <div className="Settings__radio-group" id="app-theme" onChange={appThemeHandleChange}>
                    <div className="Settings__radio-setting">
                        <input type="radio" value="default" name="app-theme" id="default-app-theme" defaultChecked={theme === "default"} />
                        <label htmlFor="default-app-theme">Default</label>
                    </div>
                    <div className="Settings__radio-setting">
                        <input type="radio" value="light" name="app-theme" id="light-app-theme" defaultChecked={theme === "light"} />
                        <label htmlFor="light-app-theme">Light</label>
                    </div>
                    <div className="Settings__radio-setting">
                        <input type="radio" value="dark" name="app-theme" id="dark-app-theme" defaultChecked={theme === "dark"} />
                        <label htmlFor="dark-app-theme">Dark</label>
                    </div>
                </div>

                <p style={{ marginTop: "24px" }}>Made with ❤️ by Achuthan R, inspired by <a href="https://splode.github.io/pomotroid/">Pomotroid</a>.</p>
            </div>
        </div>
    );
}

export default Settings;
