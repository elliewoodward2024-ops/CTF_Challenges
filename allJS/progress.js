

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
    updateHomeProgress();
}

function isFlagFound(flagID) {
    flagID = String(flagID);
    return getFoundFlags().includes(flagID);

}

function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    document.querySelectorAll("[data-challenge-id]").forEach(checkbox => {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    });

}

function updateProgress() {
    const foundFlags = getFoundFlags();

    document.querySelectorAll("[data-challenge-id]")

        .forEach(checkbox => {
            const category = checkbox.dataset.category;
            const id = checkbox.dataset.challengeId;
            const flagID = `${category}-${id}`
            checkbox.checked = foundFlags.includes(flagID);
        });
}

function updateHomeProgress() {
    const foundFlags = getFoundFlags();

    let webComp = 0;
    let cryptComp = 0;

    foundFlags.forEach(flagID => {
        if (flagID.startsWith("web_flag-")) {
            webComp++;
        }

        if (flagID.startsWith("crypt_flag-")) {
            cryptComp++;
        }
    });

    const webPer = (webComp / 7) * 100;
    const cryptPer = (cryptComp / 9) * 100;

    const webBar = document.querySelector(".web-progress");
    if (webBar) {
        webBar.style.width = `${webPer}%`;
    }

    const cryptoBar = document.querySelector(".crypto-progress");
    if (cryptoBar) {
        cryptoBar.style.width = `${cryptPer}%`;
    }


    const webText = document.querySelector("#web-progress-text");

    if (webText) {
        webText.textContent = `${webComp} / 7`;
    }


    const cryptoText = document.querySelector("#crypto-progress-text");

    if (cryptoText) {
        cryptoText.textContent = `${cryptComp} / 9`;
    }

}








document.addEventListener("DOMContentLoaded", () => {
    updateProgress();
    updateHomeProgress();

    const resetButton = document.querySelector("#reset-progress");

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset all progress?")) {
                resetProgress();
            }

        });
    }
});
