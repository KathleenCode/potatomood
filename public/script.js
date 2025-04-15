async function getMood() {
    const result = document.getElementById("result");
    result.innerHTML = "Analyzing your mood...";
  
    try {
      const res = await fetch('/api/potato-mood');
      const data = await res.json();
  
      result.innerHTML = `
        <p><strong>Your Advice:</strong> "${data.advice}"</p>
        <p><strong>Your Mood Potato:</strong></p>
        <img src="${data.potato}" alt="potato" />
      `;
    } catch (err) {
      result.innerHTML = "<p>🥔 Potato mood failed. Try again later.</p>";
    }
  }
  