// Define submit animation
const tl = gsap.timeline({ defaults: { duration: 1 }, paused: true });
tl.to("#form", { y: "-100vh" })
  .to("#result", { y: "-100vh" }, "=-.5")
  .to("#result-head", { opacity: 1, duration: 0.4 }, "=-1.2")
  .to("#status", { opacity: 1, duration: 1.4, delay: 1 })
  .to("#result button", { opacity: 1, duration: 0.4 }, "=-.4");

document.addEventListener("DOMContentLoaded", () => {
  // Entry animation
  gsap.from(".fade-up", { y: 10, opacity: 0, duration: 0.4, stagger: 0.2 });

  // Form submission
  const form = document.getElementById("form");
  form.addEventListener("submit", submitForm);

  // Reverse animation
  document.getElementById("return-btn").addEventListener("click", () => {
    if (!tl.reversed()) {
      tl.reverse();
    }
  });
});

function submitForm(e) {
  e.preventDefault();

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
    if (this.status == 200) {
      const statusEl = document.getElementById("status");
      statusEl.innerText = this.responseText ? "Alive" : "Dead";
      statusEl.classList.add(
        this.responseText ? "text-success" : "text-danger"
      );
      animateResult();
    }
  };

  xhr.send(JSON.stringify(data));
}

function animateResult() {
  tl.play();
}
