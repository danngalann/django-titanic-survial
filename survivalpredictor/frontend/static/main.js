document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", submitForm);
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

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/predict/", true);
  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

  xhr.onload = function () {
    console.log(this.responseText);
  };

  xhr.send(JSON.stringify(data));
}
