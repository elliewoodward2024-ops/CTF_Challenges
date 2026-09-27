const flagChecker = document.querySelector("#flag")
const outputThing = document.querySelector("#msg")
const foundFlags = new Set();


const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');


const _URL = "https://private-flagsss.ellie-woodward-2024.workers.dev/";
const category = "web_flag"


menuBtn.addEventListener('click', () => { sidebar.classList.add('active'); });
closeBtn.addEventListener('click', () => { sidebar.classList.remove('active'); });

document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && event.target !== menuBtn) {
        sidebar.classList.remove('active');
    }
}
);



function toggleOn(element) {
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
                    category: "web_flag",
                    flag: value,
                })
            });

        console.log("Response:", response.status)
        const result = await response.json();

        console.log("Worker response:", result);
        console.log("Result number:", result.number);
        console.log("Result number type:", typeof result.number);

        if (!result.correct) {
            outputThing.textContent = "No, this is not a flag, good try though."
            return;
        }

        const number = result.number;
        const flagID = result.flagId;

        if (isFlagFound(flagID)) {

            outputThing.textContent =
                `You already found Flag #${number}.`;

            return;
        }

        completeFlag(flagID);

        outputThing.textContent =
            `You found Flag #${number}!`;

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






document.cookie = "6gzSdYcO18dknH834YRgjQlVa8m1WRlf7Y0zp09teGqD84d6nAHe4MhKGjA9zxBiVXNmXhrC6cI2oEoz0V5Ic6H7EUAcEhuywuEHFRUIZcrRlgrmJovaxuNJQ93R0PPIQmfX1ng9ygAs8lZQ0n8Ww2BCIraOBNtWc2WEYV6Jxvtu8tu3Ciu3sTWnVHnIx1ZQCp5WfUJY0seQze5ORhlOjlkyGg15KCKeG17FU6zUetzjWTrwUAcC6UihMlwS8Jry4JG7K8fTuNyqMKcPsi6SDkJEn57cbFCcN4qnD1lywyWHEd7SoAgixkP9od3ENyAMJLh3U9CXFNb63IySKC3BHxUuQxHLupGHesisK5mVKcvfHkcDJ4V5RZEYZL4ICaXk7OhiiXJGR6w6ctf{h3_h3_c00k!3_m0^st3r}clgmMcEQnXRBbwM68ObCcabswuBv8pT874WkcGFqGMSQDKkSFVTU6jd6YOP4SZnDQEKNkpXQJWqI8qWHhVdcjcBcNBTcI2eE;";