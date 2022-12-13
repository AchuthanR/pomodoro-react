import "./Timer.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: "focus", status: "unbegun", currentRound: 1 };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.status === "unbegun" && state.mode === "focus") {
            return { ticks: 0, totalTicks: props.settings.focusTimeLength * 60 };
        }
        else if (state.status === "unbegun" && state.mode === "shortBreak") {
            return { ticks: 0, totalTicks: props.settings.shortBreakTimeLength * 60 };
        }
        else if (state.status === "unbegun" && state.mode === "longBreak") {
            return { ticks: 0, totalTicks: props.settings.longBreakTimeLength * 60 };
        }
        else {
            return {};
        }
    }

    startTimer = () => {
        this.intervalID = setInterval(() => {
            if (this.state.ticks >= this.state.totalTicks) {
                this.switchTimerMode(null, true);
                return;
            }
            this.setState({ ticks: this.state.ticks + 1 });
        }, 1000);
    };

    stopTimer = () => {
        clearInterval(this.intervalID);
    };

    switchTimerStatus = () => {
        if (this.state.status === "running") {
            this.stopTimer();
            this.setState({ status: "paused" });
        }
        else {
            this.startTimer();
            this.setState({ status: "running" });
        }
    };

    switchTimerMode = (e, isProgrammatic = false) => {
        this.stopTimer();
        if (this.state.mode === "focus") {
            let totalTicks, mode;
            if (this.state.currentRound === this.props.settings.noRoundsTillLongBreak) {
                totalTicks = this.props.settings.longBreakTimeLength * 60;
                mode = "longBreak";
            }
            else {
                totalTicks = this.props.settings.shortBreakTimeLength * 60;
                mode = "shortBreak";
            }
            if (isProgrammatic && this.props.settings.shouldBreakAutoStart) {
                this.startTimer();
                this.setState({
                    ticks: 0,
                    totalTicks: totalTicks,
                    mode: mode,
                    status: "running",
                });
            }
            else {
                this.setState({
                    ticks: 0,
                    totalTicks: totalTicks,
                    mode: mode,
                    status: "unbegun",
                });
            }

            this.notification?.close();
            if (isProgrammatic && this.props.settings.shouldShowFocusNotification && Notification.permission === "granted") {
                if (mode === "shortBreak") {
                    this.notification = new Notification("Focus session ended! Time for a short break...");
                }
                else {
                    this.notification = new Notification("Focus session ended! Time for a long break...");
                }
            }
        }
        else {
            let nextRound = (this.state.currentRound % this.props.settings.noRoundsTillLongBreak) + 1;
            if (isProgrammatic && this.props.settings.shouldFocusAutoStart) {
                this.startTimer();
                this.setState({
                    ticks: 0,
                    totalTicks: this.props.settings.focusTimeLength * 60,
                    mode: "focus",
                    status: "running",
                    currentRound: nextRound,
                });
            }
            else {
                this.setState({
                    ticks: 0,
                    totalTicks: this.props.settings.focusTimeLength * 60,
                    mode: "focus",
                    status: "unbegun",
                    currentRound: nextRound,
                });
            }

            this.notification?.close();
            if (isProgrammatic && this.props.settings.shouldShowBreakNotification && Notification.permission === "granted") {
                this.notification = new Notification("Break ended! Time to focus...");
            }
        }
    };

    resetTimerState = () => {
        this.stopTimer();
        if (this.state.mode === "focus") {
            this.setState({ ticks: 0, status: "unbegun" });
        }
        else if (this.state.mode === "shortBreak") {
            this.setState({ ticks: 0, status: "unbegun" });
        }
        else {
            this.setState({ ticks: 0, status: "unbegun" });
        }
    };

    render() {
        let ticksString, modeString, statusString;
        let statusIcon;
        let progressValue;

        ticksString = Math.floor((this.state.totalTicks - this.state.ticks) / 60).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":"
            + ((this.state.totalTicks - this.state.ticks) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });

        if (this.state.mode === "focus") {
            modeString = "Focus";
            progressValue = (this.state.ticks / this.state.totalTicks) * 100;
        }
        else if (this.state.mode === "shortBreak") {
            modeString = "Short break";
            progressValue = (this.state.ticks / this.state.totalTicks) * 100;
        }
        else {
            modeString = "Long break";
            progressValue = (this.state.ticks / this.state.totalTicks) * 100;
        }

        if (this.state.status === "unbegun") {
            statusString = "Start";
            statusIcon = <FontAwesomeIcon icon={solid("play")} style={{ marginRight: "8px" }} />;
        }
        else if (this.state.status === "running") {
            statusString = "Pause";
            statusIcon = <FontAwesomeIcon icon={solid("pause")} style={{ marginRight: "8px" }} />;
        }
        else {
            statusString = "Continue";
            statusIcon = <FontAwesomeIcon icon={solid("play")} style={{ marginRight: "8px" }} />;
        }

        return (
            <div className="Timer">
                {this.state.status === "unbegun"
                    ? (<progress className="Timer__progress" value={Math.floor(progressValue)} max="100" style={{ visibility: "hidden" }}></progress>)
                    : (<progress className="Timer__progress" value={Math.floor(progressValue)} max="100"></progress>)}
                <span className="Timer__ticks">{ticksString}</span>
                <span className="Timer__mode caption-text">{modeString}</span>
                <span className="caption-text">{this.state.currentRound}/{this.props.settings.noRoundsTillLongBreak}</span>
                <button type="button" className="Timer__control-btn primary-btn" onClick={this.switchTimerStatus}>
                    {statusIcon}{statusString}
                </button>
                <button type="button" className="Timer__reset-btn text-btn" onClick={this.resetTimerState}>Reset</button>
                <button type="button" className="Timer__skip-btn secondary-btn" onClick={this.switchTimerMode}>
                    <FontAwesomeIcon icon={solid("forward-step")} style={{ marginRight: "8px" }} />
                    Skip
                </button>
            </div>
        );
    }
}

export default Timer;
