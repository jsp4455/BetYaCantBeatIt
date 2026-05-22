// Check if user is premium
const isPremium = localStorage.getItem("folly_premium") === "yes";

// Try to load saved progress
if (isPremium) {
    const saved = JSON.parse(localStorage.getItem("folly_save") || "null");

    if (saved) {
        // Inject saved values into global scope BEFORE game.js starts
        window.level = saved.level;
        window.score = saved.score;
        window.snake = saved.snake;
        window.dir = saved.dir;
        window.food = saved.food;
        window.fakeFood = saved.fakeFood;
    }
}

// After game loads, save progress every second
setInterval(() => {
    if (!isPremium) return;

    try {
        const state = {
            level: window.level,
            score: window.score,
            snake: window.snake,
            dir: window.dir,
            food: window.food,
            fakeFood: window.fakeFood
        };

        localStorage.setItem("folly_save", JSON.stringify(state));
    } catch (err) {
        console.log("Save failed:", err);
    }
}, 1000);
