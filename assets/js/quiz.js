document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const submitBtn = document.getElementById("submit-quiz");
    const quizResult = document.getElementById("quiz-result");

    // Placeholder quiz data
    const quizQuestions = [
        { q: "What is 2 + 2?", options: ["3", "4", "5"], answer: 1 },
        { q: "Motion is measured in?", options: ["kg", "m/s", "N"], answer: 1 }
    ];

    // Load questions
    quizQuestions.forEach((q, i) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${i+1}. ${q.q}</p>` + q.options.map((opt, idx) =>
            `<label><input type="radio" name="q${i}" value="${idx}"> ${opt}</label><br>`
        ).join("");
        quizContainer.appendChild(div);
    });

    // Submit
  submitBtn.addEventListener("click", () => {
    let score = 0;
    quizQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) score++;
    });
    quizResult.textContent = `You scored ${score} / ${quizQuestions.length}`;

    // Save quiz completion as progress
    const key = subject + "_completedTopics_" + chapterIndex;
    let completed = JSON.parse(localStorage.getItem(key)) || [];
    for (let i = 0; i < quizQuestions.length; i++) {
        if (!completed.includes(i)) completed.push(i);
    }
    localStorage.setItem(key, JSON.stringify(completed));

    // Update subject progress
    const allChapters = Object.keys(quizzes[subject]).length;
    let totalCompleted = 0;
    for (let c = 0; c < allChapters; c++) {
        let arr = JSON.parse(localStorage.getItem(subject + "_completedTopics_" + c)) || [];
        totalCompleted += arr.length / 3; // 3 topics placeholder
    }
    let percent = Math.round((totalCompleted / allChapters) * 100);
    localStorage.setItem(subject + "_progress", percent);
});
});