import React, { useState } from "react";

const SettingsContext = React.createContext([{}, () => { }]);

const SettingsProvider = (props) => {
    const [state, setState] = useState({
        focusTimeLength: Number(localStorage.getItem("focusTimeLength") ?? 25),
        shortBreakTimeLength: Number(localStorage.getItem("shortBreakTimeLength") ?? 5),
        longBreakTimeLength: Number(localStorage.getItem("longBreakTimeLength") ?? 15),
        noRoundsTillLongBreak: Number(localStorage.getItem("noRoundsTillLongBreak") ?? 4),
        shouldFocusAutoStart: JSON.parse(localStorage.getItem("shouldFocusAutoStart") ?? false),
        shouldBreakAutoStart: JSON.parse(localStorage.getItem("shouldBreakAutoStart") ?? false),
        shouldShowFocusNotification: JSON.parse(localStorage.getItem("shouldShowFocusNotification") ?? false),
        shouldShowBreakNotification: JSON.parse(localStorage.getItem("shouldShowBreakNotification") ?? false)
    });

    return (
        <SettingsContext.Provider value={[state, setState]}>
            {props.children}
        </SettingsContext.Provider>
    );
}

export { SettingsContext, SettingsProvider };