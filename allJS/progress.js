

const STORAGE_KEY = "foundFlags";

function getFoundFlags() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );
}

function saveFoundFlags() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(foundFlags)
    );

}

function compleateFlag(flagID) {
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

    document.querySelectorALL("[data-challenge-id]")
        .forEach(checkbox => {
            const id = checkbox.dataset.challengeId;
            checkbox.checked = foundFlags.includes(id);
        });
    document.querySelectorALL("[data-progress]")
        .forEach(counter => {
            const total = Number(counter.dataset.total);
            counter.textContent =
                `${foundFlags.length} / ${total}`;
        });

}

document.addEventListener("DOMContentLoaded", updateProgress);