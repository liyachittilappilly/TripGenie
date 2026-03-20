async function sendMessage() {
    let input = document.getElementById("input");
    let chat = document.getElementById("chat");

    let userText = input.value;

    chat.innerHTML += "<p><b>You:</b> " + userText + "</p>";

    let response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
    });

    let data = await response.json();

    chat.innerHTML += "<p><b>Bot:</b> " + data.reply + "</p>";

    input.value = "";
}