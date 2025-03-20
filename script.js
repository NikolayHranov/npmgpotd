async function getValidRandomProblem(theme) {
    const startDate = new Date("2025-02-22");
    const today = new Date();
    
    function getRandomDate() {
        const randomTime = startDate.getTime() + Math.random() * (today.getTime() - startDate.getTime());
        return new Date(randomTime).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    }

    async function checkFileExists(url) {
        console.log("Trying " + url)
        try {
            let response = await fetch(url, { method: 'HEAD' });
            console.log("PASSED")
            return response.ok;
        } catch (error) {
            console.log("FAILED")
            return false;
        }
    }

    let attempts = 0;
    while (attempts < 1000) { // Avoid infinite loops
        const randomDate = getRandomDate();
        const url = `problems/${theme}/${randomDate}.pdf`;

        if (await checkFileExists(url)) {
            // window.location.href = url;
            // window.open(url, "_self");
            window.open(url, "_blank");
            return;
        }
        attempts++;
    }
    alert("Could not find a valid problem after multiple attempts. Please try again. If you get the same error multiple times, there are probably no problems in this category.");
}

async function getRandomCategoryProblem() {
    const themes = ["physics", "mathematics", "astronomy"];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    await getValidRandomProblem(randomTheme);
}

async function showAvailableProblems() {
    const themes = [
        { id: "physics", label: "Физика" },
        { id: "mathematics", label: "Математика" },
        { id: "astronomy", label: "Астрономия" }
    ];
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const container = document.getElementById("problem-links");
    container.innerHTML = "";

    for (const theme of themes) {
        const url = `problems/${theme.id}/${today}.pdf`;
        if (await checkFileExists(url)) {
            const link = document.createElement("a");
            link.href = url;
            link.innerText = theme.label;
            link.className = "pdf-button";
            link.target = "_blank";
            link.style.display = "block";
            container.appendChild(link);
        }
    }
}