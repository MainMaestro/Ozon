const animateInput = document.getElementById("animate-input");
const valueInput = document.getElementById("value-input");
const hideInput = document.getElementById("hide-input");
const circleDiv = document.getElementById("circleDiv");
const circleFront = document.querySelector(".progress-ring__circleFront");
const radius = circleFront.r.baseVal.value;

const circumference = radius * 2 * Math.PI;

valueInput.addEventListener("input", () => {
  valueInput.value = valueInput.value.replace(/[^0-9]/g, "");
  valueInput.value = Math.min(Math.max(0, parseInt(valueInput.value)), 100);
});

circleFront.style.strokeDasharray = `${circumference} ${circumference}`;
circleFront.style.strokeDashoffset = circumference;
valueInput.addEventListener("change", () => {
  setProgress(valueInput.value);
});

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circleFront.style.strokeDashoffset = offset;
}
hideInput.addEventListener("change", () => {
  circleDiv.style.display = hideInput.checked ? "none" : "block";
});

animateInput.addEventListener("change", () => {
  if (animateInput.checked) {
    circleFront.style.animation = "spin 2s linear infinite";
  } else {
    circleFront.style.animation = "";
  }
});
