// script.js

const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggle = document.querySelector('.toggle');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    toggle.textContent = document.documentElement.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

function setTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const day = now.getDay();
    const date = now.getDate();
    const month = now.getMonth();

    hourEl.style.transform = `translate(-50%, -100%) rotate(${hours * 30 + minutes * 0.5}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${minutes * 6 + seconds * 0.1}deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${seconds * 6}deg)`;

timeEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
dateEl.textContent = `${days[day]}, ${months[month]} ${date.toString().padStart(2, '0')}`;
}

setInterval(setTime, 1000);
setTime();