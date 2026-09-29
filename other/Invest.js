const requestRequirements = {
    requiredHeader: "X-CTF-Key"
};

async function checkRequest() {
    const response = await fetch("/webchallenge/headers");
    const data = await response.json();
    document.getElementById("response").textContent =
        data.message || data.flag;
}


document.getElementById("response").textContent = data.message || data.flag;