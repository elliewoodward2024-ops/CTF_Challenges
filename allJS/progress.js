

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
    const foundFlags = getFoundFlags();
    if (!foundFlags.includes(flagID)) {
        foundFlags.push(flagID);
        saveFoundFlags(foundFlags);
    }

    updateProgress();
}

function isFlagFound(flagID) {
    return getFoundFlags().includes(flagID);
}

function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    updateProgress();
}

function updateProgress() {
    const foundFlags = getFoundFlags();

    document.querySelectorAll("[data-challenge-id]")
        .forEach(checkbox => {
            const id = checkbox.dataset.challengeId;
            checkbox.checked = foundFlags.includes(id);
        });


}

document.addEventListener("DOMContentLoaded", updateProgress);