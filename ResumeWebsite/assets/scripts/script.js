// Add event listener to nav links
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("header nav a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = link.getAttribute("href");
            const section = document.querySelector(target);
            section.scrollIntoView({ behavior: "smooth" });
        });
    });
});