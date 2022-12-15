function getAppTheme() {
    return localStorage.getItem("appTheme") ?? "dark";
}

function setAppTheme(theme) {
    theme ??= localStorage.getItem("appTheme") ?? "dark";

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

export { getAppTheme, setAppTheme };