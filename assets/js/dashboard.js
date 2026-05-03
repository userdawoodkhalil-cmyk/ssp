// Load instantly from localStorage (before Firebase)
document.addEventListener("DOMContentLoaded", () => {
  const streak = localStorage.getItem("streak");
  const best = localStorage.getItem("bestStreak");

  if (streak) {
    document.getElementById("streak").innerText = streak;
  }

  if (best) {
    document.getElementById("best").innerText = best;
  }
});



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

let currentUser;

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    loadData();
  }
});

function loadData() {
  const ref = db.collection("users").doc(currentUser.uid);

  ref.get().then(doc => {
    if (doc.exists) {
      const data = doc.data();

      // Update UI
      document.getElementById("streak").innerText = data.streak || 0;
      document.getElementById("best").innerText = data.bestStreak || 0;

      // ✅ SAVE LOCALLY (for fast reload)
      localStorage.setItem("streak", data.streak || 0);
      localStorage.setItem("bestStreak", data.bestStreak || 0);
    }
  });
}

function markToday() {
  const ref = db.collection("users").doc(currentUser.uid);

  ref.get().then(doc => {
    let data = doc.data();

    let streak = data.streak || 0;
    let bestStreak = data.bestStreak || 0;
    let lastCheckIn = data.lastCheckIn;
    // Save locally after update
localStorage.setItem("streak", streak);
localStorage.setItem("bestStreak", bestStreak);

    const today = new Date();
    const todayStr = today.toDateString();

    // If no previous check-in
    if (!lastCheckIn) {
      streak = 1;
    } else {
      const lastDate = new Date(lastCheckIn);
      const lastStr = lastDate.toDateString();

      // Difference in days
      const diffTime = today - lastDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (todayStr === lastStr) {
        alert("You already checked in today!");
        return;
      }

      if (diffDays === 1) {
        streak += 1; // continue streak
      } else {
        streak = 1; // reset streak
      }
    }

    // Update best streak
    if (streak > bestStreak) {
      bestStreak = streak;
    }

    // Save to Firebase
    ref.update({
      streak: streak,
      bestStreak: bestStreak,
      lastCheckIn: today
    });

    // Update UI
    document.getElementById("streak").innerText = streak;
    document.getElementById("best").innerText = bestStreak;
  });
}