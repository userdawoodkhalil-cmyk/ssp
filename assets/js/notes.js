document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes-list");

    // Placeholder notes
    const notes = [
        { title: "Scalars & Vectors PDF", link: "#" },
        { title: "Motion Notes", link: "#" }
    ];

    notes.forEach(note => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${note.link}" target="_blank">${note.title}</a>`;
        notesList.appendChild(li);
    });
});