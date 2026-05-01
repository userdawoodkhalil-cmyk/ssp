// APPLY THEME IMMEDIATELY (no waiting)
(function () {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.className = theme;
})();

// WAIT FOR PAGE LOAD THEN ATTACH BUTTON
window.onload = function () {
    const btn = document.getElementById("themeToggle");

    if (btn) {
        btn.onclick = function () {
            const current = localStorage.getItem("theme") || "light";
            const newTheme = current === "light" ? "dark" : "light";

            localStorage.setItem("theme", newTheme);
            document.documentElement.className = newTheme;
        };
    }
};