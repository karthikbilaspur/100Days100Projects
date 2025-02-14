// Form validation
const form = document.querySelector("form");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='message']");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue === "") {
        alert("Please enter your name");
        return;
    }

    if (emailValue === "") {
        alert("Please enter your email");
        return;
    }

    if (messageValue === "") {
        alert("Please enter a message");
        return;
    }

    // Submit form
    form.submit();
});