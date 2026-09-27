

const STORAGE_KEY = "foundFlags";

function getFoundFlags() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );
}

function saveFoundFlags(foundFlags) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(foundFlags)
    );

}

function completeFlag(flagID) {
    flagID = String(flagID);
    const foundFlags = getFoundFlags();
    if (!foundFlags.includes(flagID)) {
        foundFlags.push(flagID);
        saveFoundFlags(foundFlags);
    }

    updateProgress();
}

function isFlagFound(flagID) {
    flagID = String(flagID);
    return getFoundFlags().includes(flagID);

}

function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    document.querySelectorAll("[data-challenge-id]")

        .forEach(checkbox => {
            const id = String(checkbox.dataset.challengeId);
            checkbox.checked = foundFlags.includes(id);
        });
    updateProgress();
}

function updateProgress() {
    const foundFlags = getFoundFlags();

    document.querySelectorAll("[data-challenge-id]")

        .forEach(checkbox => {
            const id = String(checkbox.dataset.challengeId);
            checkbox.checked = foundFlags.includes(id);
        });


}

document.addEventListener("DOMContentLoaded", () => {
    updateProgress();

    const resetButton = document.querySelector("#reset-progress");

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset all progress?")) {
                resetProgress();
            }

        });
    }
});
