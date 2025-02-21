const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circlesContainer = document.querySelector(".circles-container");

// Dynamic step count
const stepCount = 5;

// Initialize circles
for (let i = 1; i <= stepCount; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = i;
  if (i === 1) circle.classList.add("active");
  circlesContainer.appendChild(circle);
}

// Update progress bar and circle styles
function updateProgress(currentStep) {
  const progressWidth = ((currentStep - 1) / (stepCount - 1)) * 100;
  progress.style.width = `${progressWidth}%`;

  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle, index) => {
    if (index < currentStep) circle.classList.add("active");
    else circle.classList.remove("active");
  });
}

// Event listeners
next.addEventListener("click", () => {
  const currentStep = parseInt(document.querySelector(".circle.active").textContent);
  if (currentStep < stepCount) {
    updateProgress(currentStep + 1);
    prev.disabled = false;
    if (currentStep + 1 === stepCount) next.disabled = true;
  }
});

prev.addEventListener("click", () => {
  const currentStep = parseInt(document.querySelector(".circle.active").textContent);
  if (currentStep > 1) {
    updateProgress(currentStep - 1);
    next.disabled = false;
    if (currentStep - 1 === 1) prev.disabled = true;
  }
});

// Initialize progress bar and circle styles
updateProgress(1);