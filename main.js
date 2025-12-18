// Create a local unique user ID if not already created
if (!localStorage.getItem("userId")) {
  localStorage.setItem("userId", crypto.randomUUID());
}

const userId = localStorage.getItem("userId");

document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const creatorId = userId; // <-- now using real unique ID

  const res = await fetch("/.netlify/functions/generateGame", {
    method: "POST",
    body: JSON.stringify({ prompt, creatorId })
  });

  const data = await res.json();
  document.getElementById("result").innerHTML = `
    <p>Game generated!</p>
    <a href="${data.gameUrl}" target="_blank">Play Game</a>
  `;
});
