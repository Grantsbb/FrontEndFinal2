(function () {
  const ALARM_SRC = "we-wish-you-a-merry-nanomas.mp3";

  const widget = document.getElementById("cooking-timer");
  const minInput = widget.querySelector("#t-min");
  const secInput = widget.querySelector("#t-sec");
  const display = widget.querySelector(".timer-display");
  const statusEl = widget.querySelector(".timer-status");

  const alarm = new Audio(ALARM_SRC);

  let total = parseInt(localStorage.getItem("t_total") || "300");
  let remaining = parseInt(localStorage.getItem("t_remaining") || total);
  let startedAt = parseInt(localStorage.getItem("t_startedAt") || "0");
  let running = false;
  let interval = null;

  if (startedAt && localStorage.getItem("t_running") === "true") {
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    remaining = Math.max(0, remaining - elapsed);
    if (remaining > 0) startTimer();
    else { remaining = 0; statusEl.textContent = "Done!"; display.style.color = "#e74c3c"; }
  }

  function pad(n) { return String(n).padStart(2, "0"); }
  function show(s) { display.textContent = pad(Math.floor(s / 60)) + ":" + pad(s % 60); }
  function saveState() {
    localStorage.setItem("t_total", total);
    localStorage.setItem("t_remaining", remaining);
    localStorage.setItem("t_running", running);
    localStorage.setItem("t_startedAt", running ? Date.now() : "0");
  }

  show(remaining);
  minInput.value = Math.floor(total / 60);
  secInput.value = total % 60;

  minInput.addEventListener("input", () => {
    if (!running) {
      total = (parseInt(minInput.value) || 0) * 60 + (parseInt(secInput.value) || 0);
      remaining = total;
      show(remaining);
      saveState();
    }
  });
  secInput.addEventListener("input", () => {
    if (!running) {
      total = (parseInt(minInput.value) || 0) * 60 + (parseInt(secInput.value) || 0);
      remaining = total;
      show(remaining);
      saveState();
    }
  });

  function startTimer() {
    if (running) return;
    running = true;
    statusEl.textContent = "Running…";
    display.style.color = "";
    saveState();
    interval = setInterval(() => {
      remaining--;
      show(remaining);
      saveState();
      if (remaining <= 0) {
        clearInterval(interval); interval = null; running = false;
        localStorage.setItem("t_running", "false");
        display.style.color = "#e74c3c";
        statusEl.textContent = "Done!";
        alarm.play();
      }
    }, 1000);
  }

  widget.querySelector("#t-start").addEventListener("click", () => { if (remaining <= 0) return; startTimer(); });
  widget.querySelector("#t-pause").addEventListener("click", () => {
    if (!running) return;
    clearInterval(interval); interval = null; running = false;
    statusEl.textContent = "Paused";
    saveState();
  });
  widget.querySelector("#t-reset").addEventListener("click", () => {
    clearInterval(interval); interval = null; running = false;
    total = (parseInt(minInput.value) || 0) * 60 + (parseInt(secInput.value) || 0);
    remaining = total;
    show(remaining);
    display.style.color = "";
    statusEl.textContent = "";
    saveState();
  });
})();
