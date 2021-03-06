// Define submit animation
const tl = gsap.timeline({ defaults: { duration: 1 }, paused: true });
tl.to("#form", { y: "-150vh" })
  .to("#result", { y: "-100vh" }, "=-.5")
  .to("#result-head", { opacity: 1, duration: 0.4 }, "=-1.2")
  .to("#status", { opacity: 1, duration: 1.4, delay: 1 })
  .to("#result button", { opacity: 1, duration: 0.4 }, "=-.4")
  .to("#result .info", { opacity: 1, duration: 0.4 }, "=-.2");

document.addEventListener("DOMContentLoaded", () => {
  // Entry animation
  gsap.from(".fade-up", { y: 10, opacity: 0, duration: 0.4, stagger: 0.2 });

  // Form submission
  const form = document.getElementById("form");
  form.addEventListener("submit", submitForm);

  // Reverse animation
  document.getElementById("return-btn").addEventListener("click", () => {
    location.reload();
  });
});

function submitForm(e) {
  e.preventDefault();

  // Spinner
  const spinner = document.getElementById("loading-overlay");

  // Crate data object
  var data = {
    Pclass: document.getElementById("pclass").value,
    Age: document.getElementById("age").value,
    Sex: document.getElementById("sex").value,
    SibSp: document.getElementById("sibsp").value,
    Parch: document.getElementById("parch").value,
  };

  // Clear from
  e.target.reset();

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/predict/", true);
  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

  xhr.onload = function () {
    spinner.style.display = "none";
    if (this.status == 200) {
      const statusEl = document.getElementById("status");
      const isAlive = JSON.parse(this.responseText)["isAlive"];
      statusEl.innerText = isAlive ? "Alive" : "Dead";
      statusEl.classList.add(isAlive ? "text-success" : "text-danger");
      document.getElementById("result").style.display = "inherit";
      document.querySelector("body").style.overflow = "hidden";
      animateResult();
    }
  };

  xhr.send(JSON.stringify(data));
  spinner.style.display = "flex";
}

function animateResult() {
  tl.play().timeScale(1);
}
