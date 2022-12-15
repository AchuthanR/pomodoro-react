import "./Timer.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { SettingsContext } from "./SettingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Timer() {
    const [settings] = useContext(SettingsContext);
    const [mode, setMode] = useState("focus");
    const [status, setStatus] = useState("unbegun");
    const [currentRound, setCurrentRound] = useState(1);
    const [ticks, setTicks] = useState(0);
    const [totalTicks, setTotalTicks] = useState(settings.focusTimeLength * 60);

    let notificationRef = useRef();

    useEffect(() => {
        if (ticks >= totalTicks) {
            switchTimerMode(null, true);
        }
    }, [ticks]);

    useEffect(() => {
        if (status !== "running") {
            return;
        }

        let intervalID = setInterval(function () {
            setTicks(ticks => ticks + 1);
        }, 1000);

        return () => clearInterval(intervalID);
    }, [status]);

    useEffect(() => {
        if (status === "unbegun" && mode === "focus") {
            setTotalTicks(settings.focusTimeLength * 60);
        }
        else if (status === "unbegun" && mode === "shortBreak") {
            setTotalTicks(settings.shortBreakTimeLength * 60);
        }
        else if (status === "unbegun" && mode === "longBreak") {
            setTotalTicks(settings.longBreakTimeLength * 60);
        }
    }, [status, settings.focusTimeLength, settings.shortBreakTimeLength, settings.longBreakTimeLength]);

    function switchTimerStatus() {
        if (status === "running") {
            setStatus("paused");
        }
        else {
            setStatus("running");
        }
    };

    function switchTimerMode(e, isProgrammatic = false) {
        if (mode === "focus") {
            let newTotalTicks, newMode;
            if (currentRound === settings.noRoundsTillLongBreak) {
                newTotalTicks = settings.longBreakTimeLength * 60;
                newMode = "longBreak";
            }
            else {
                newTotalTicks = settings.shortBreakTimeLength * 60;
                newMode = "shortBreak";
            }
            if (isProgrammatic && settings.shouldBreakAutoStart) {
                setStatus("running");
            }
            else {
                setStatus("unbegun");
            }
            setTicks(0);
            setTotalTicks(newTotalTicks);
            setMode(newMode);

            notificationRef.current?.close();
            if (isProgrammatic && settings.shouldShowFocusNotification && Notification.permission === "granted") {
                if (newMode === "shortBreak") {
                    notificationRef.current = new Notification("Focus session ended! Time for a short break...");
                }
                else {
                    notificationRef.current = new Notification("Focus session ended! Time for a long break...");
                }
            }
        }
        else {
            let nextRound = (currentRound % settings.noRoundsTillLongBreak) + 1;
            if (isProgrammatic && settings.shouldFocusAutoStart) {
                setStatus("running");
            }
            else {
                setStatus("unbegun");
            }
            setTicks(0);
            setTotalTicks(settings.focusTimeLength * 60);
            setMode("focus");
            setCurrentRound(nextRound);

            notificationRef.current?.close();
            if (isProgrammatic && settings.shouldShowBreakNotification && Notification.permission === "granted") {
                notificationRef.current = new Notification("Break ended! Time to focus...");
            }
        }
    };

    function resetTimerState() {
        setTicks(0);
        setStatus("unbegun");
    };



    let ticksString, modeString, statusString;
    let statusIcon;
    let progressValue;

    let hours = Math.floor((totalTicks - ticks) / 60 / 60);
    ticksString = (hours >= 1) ? (hours + ":") : "";
    let minutes = Math.floor((totalTicks - ticks) / 60) - hours * 60;
    ticksString += minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":";
    let seconds = (totalTicks - ticks) % 60;
    ticksString += seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 });

    if (mode === "focus") {
        modeString = "Focus";
        progressValue = Math.floor((ticks / totalTicks) * 100);
    }
    else if (mode === "shortBreak") {
        modeString = "Short break";
        progressValue = Math.floor((ticks / totalTicks) * 100);
    }
    else {
        modeString = "Long break";
        progressValue = Math.floor((ticks / totalTicks) * 100);
    }

    if (status === "unbegun") {
        statusString = "Start";
        statusIcon = <FontAwesomeIcon icon={solid("play")} style={{ marginRight: "8px" }} />;
    }
    else if (status === "running") {
        statusString = "Pause";
        statusIcon = <FontAwesomeIcon icon={solid("pause")} style={{ marginRight: "8px" }} />;
    }
    else {
        statusString = "Continue";
        statusIcon = <FontAwesomeIcon icon={solid("play")} style={{ marginRight: "8px" }} />;
    }

    return (
        <div className="Timer">
            {status === "unbegun"
                ? (<progress className="Timer__progress" value={progressValue} max="100" style={{ visibility: "hidden" }}></progress>)
                : (<progress className="Timer__progress" value={progressValue} max="100"></progress>)}
            <span className="Timer__ticks">{ticksString}</span>
            <span className="Timer__mode caption-text">{modeString}</span>
            <span className="caption-text">{currentRound}/{settings.noRoundsTillLongBreak}</span>
            <button type="button" className="Timer__control-btn primary-btn" onClick={switchTimerStatus}>
                {statusIcon}{statusString}
            </button>
            <button type="button" className="Timer__reset-btn text-btn" onClick={resetTimerState}>Reset</button>
            <button type="button" className="Timer__skip-btn secondary-btn" onClick={switchTimerMode}>
                <FontAwesomeIcon icon={solid("forward-step")} style={{ marginRight: "8px" }} />
                Skip
            </button>
        </div>
    );
}

export default Timer;
