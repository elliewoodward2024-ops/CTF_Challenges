const requestRequirements = {
    requiredHeader: "X-CTF-Key"
};

async function checkRequest() {
    const response = await fetch(
        "https://private-flagsss.ellie-woodward-2024.workers.dev/webchallenge/headers",
        {
            method: "POST"
        }
    );

    const data = await response.json();

    document.getElementById("response").textContent =
        data.message || data.flag;
}