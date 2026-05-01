document.addEventListener("DOMContentLoaded", () => {

    // --- Helpers ---
    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    const subjectsData = {
        "Physics": ["Motion", "Force", "Work & Energy"],
        "Chemistry": ["Atoms", "Periodic Table", "Chemical Reactions"],
        "Math": ["Algebra", "Geometry", "Calculus"],
        "English": ["Grammar", "Comprehension", "Writing Skills"]
    };

    // --- Topics Page Logic ---
    const topicUl = document.getElementById("topic-ul");
    const startQuizBtn = document.getElementById("start-quiz");
    const chapterTitle = document.getElementById("chapter-title");

    const subject = getQueryParam("subject");
    const chapterIndex = getQueryParam("chapter");

    if (topicUl && subject && chapterIndex !== null) {

        const chapterName = subjectsData[subject][chapterIndex];
        chapterTitle.textContent = chapterName + " Topics";

        // Placeholder topics: 3 per chapter
        const topics = ["Topic 1", "Topic 2", "Topic 3"];

        topics.forEach((topic, i) => {
            const li = document.createElement("li");
            li.dataset.index = i;
            li.innerHTML = `${topic} <span class="status">Incomplete</span>`;
            topicUl.appendChild(li);
        });

        // Load saved completion
        const completed = JSON.parse(localStorage.getItem(subject + "_completedTopics_" + chapterIndex)) || [];
        topicUl.querySelectorAll("li").forEach((li, i) => {
            if (completed.includes(i)) {
                li.querySelector(".status").textContent = "Completed";
                li.querySelector(".status").style.color = "green";
            }
        });

        // Click to mark complete
        topicUl.querySelectorAll("li").forEach((li, i) => {
            li.addEventListener("click", () => {
                li.querySelector(".status").textContent = "Completed";
                li.querySelector(".status").style.color = "green";

                let updated = JSON.parse(localStorage.getItem(subject + "_completedTopics_" + chapterIndex)) || [];
                if (!updated.includes(i)) updated.push(i);
                localStorage.setItem(subject + "_completedTopics_" + chapterIndex, JSON.stringify(updated));

                // Update dashboard progress
                const allChapters = subjectsData[subject].length;
                let totalCompleted = 0;
                for (let c = 0; c < allChapters; c++) {
                    let arr = JSON.parse(localStorage.getItem(subject + "_completedTopics_" + c)) || [];
                    totalCompleted += arr.length / 3;
                }
                let percent = Math.round((totalCompleted / allChapters) * 100);
                localStorage.setItem(subject + "_progress", percent);
            });
        });

        // --- Start Quiz Button ---
        startQuizBtn.style.display = "block";
        startQuizBtn.addEventListener("click", () => {
            window.location.href = `quiz.html?subject=${subject}&chapter=${chapterIndex}`;
        });
    }
    
    // --- Dashboard Progress Logic ---
    const cards = document.querySelectorAll(".progress-cards .card");
    cards.forEach(card => {
        const subName = card.querySelector("h3").textContent;
        const savedProgress = localStorage.getItem(subName + "_progress") || 0;
        card.querySelector(".progress-fill").style.width = savedProgress + "%";
        card.querySelector("span").textContent = savedProgress + "% Completed";
    });

});