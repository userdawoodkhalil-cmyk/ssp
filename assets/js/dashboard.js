document.addEventListener("DOMContentLoaded", () => {
    // Animate progress bars
    const fills = document.querySelectorAll(".progress-fill");
    fills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = "0";
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
});