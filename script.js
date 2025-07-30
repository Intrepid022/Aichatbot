const API_KEY = "sk-proj-6WI5I-tGZPx_wxoWBFd2E5ZQ_sLUCYaX-OBhuKfnsX3ep5_VC99HJpuwPpVtdkfTKVq9bBXSP3T3BlbkFJRqeLbJ_HoHYHRWeIvxCeCz4VwIZ8RtGAcVP4-wG3lzFDm3_85L9pw4WAE5ELab7d0fpRLXlY0AY"; // ← Replace this with your actual API key

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  appendMessage("Bot", "Thinking...");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, I had trouble responding.";

  removeLastBotMessage(); // remove "Thinking..."
  appendMessage("Bot", reply);
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLastBotMessage() {
  const chatBox = document.getElementById("chat-box");
  const messages = chatBox.querySelectorAll("div");
  if (messages.length > 0) {
    chatBox.removeChild(messages[messages.length - 1]);
  }
}
function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender.toLowerCase() === "you" ? "user" : "bot");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
