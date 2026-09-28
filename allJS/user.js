

document.getElementById("sign-in").addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter a username and password.");
        return;
    }

    try {

        const response = await fetch(
            "https://private-flagsss.ellie-woodward-2024.workers.dev/webchallenge/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "X-Username": username,
                    "X-Password": password,
                    "X-Admin": "false"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log("Worker returned:", data);

        if (data.redirect) {
            console.log("Redirecting to:", data.redirect);
            window.location.href = data.redirect;
        } else {
            alert(data.message || "Login failed.");
        }

    } catch (error) {

        console.error("Login error:", error);

        alert("Something went wrong connecting to the server.");
    }

});