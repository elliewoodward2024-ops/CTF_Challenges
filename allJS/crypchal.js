const flagChecker = document.querySelector("#flag")
const outputThing = document.querySelector("#msg")
const foundFlags = new Set();

const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const closeBtn2 = document.getElementById('close-btn2');

const _URL = "https://private-flagsss.ellie-woodward-2024.workers.dev/";
const category = "crypt_flag"


menuBtn.addEventListener('click', () => { sidebar.classList.add('active'); });
closeBtn.addEventListener('click', () => { sidebar.classList.remove('active'); });

document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && event.target !== menuBtn) {
        sidebar.classList.remove('active');
    }
}
);

function toggleOn(element, event) {
    event.stopPropagation();
    element.classList.add('active');
}
function toggleOff(element, event) {
    event.stopPropagation();
    const parentContainer = element.closest('.tester');
    if (parentContainer) {
        parentContainer.classList.remove('active');
    }
}

function toggleOn2(element, event) {
    event.stopPropagation();
    element.classList.toggle('active');
}




async function handleInput() {
    const value = flagChecker.value.trim();


    if (!value) {
        outputThing.textContent = "Enter a flag first."
        return;
    }

    console.log("Sending flag:", value);
    console.log("Category:", category);
    console.log("Worker URL:", _URL);


    try {
        const response =
            await fetch(_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    category: category,
                    flag: value,
                })
            });

        console.log("Response:", response.status)
        const result = await response.json();
        console.log("Worker response: ", result);

        if (!result.correct) {
            outputThing.textContent = "No, this is not a flag, good try though."
            return;
        }

        const number = result.number;

        if (isFlagFound(number)) {

            outputThing.textContent =
                `You already found Flag #${number}.`;

            return;
        }

        foundFlags.add(number);
        completeFlag(number);


        if (checkbox) {
            checkbox.checked = true;
        }

        flagChecker.value = "";

        outputThing.textContent = `You found Flag #${number}!`;

        flagChecker.value = "";


    }

    catch (error) {
        console.error("FLAG CHECKER ERROR:", error);

        outputThing.textContent = "Could not connect to the flag checker.";
    }


};

flagChecker.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {

        handleInput();

    }
});


