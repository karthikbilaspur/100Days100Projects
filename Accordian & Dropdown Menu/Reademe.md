# 📂 Hybrid Menu (Dropdown + Collapse)

A simple **Hybrid Menu component** built using **HTML, CSS, and JavaScript** that combines **collapsible menu sections** with **dropdown options**.

Users can expand menu sections while also interacting with dropdown actions inside each section.

This project demonstrates **interactive UI components using Vanilla JavaScript**.

---

 📸 Project Preview

![Hybrid Menu Preview](preview.gif)

---

 5️⃣ Tech Stack
![Slide 5](images/slide5.

HTML  
CSS  
JavaScript (Vanilla)

---

 🚀 Features

✔ Expandable menu sections  
✔ Dropdown actions inside menu items  
✔ Clean UI structure  
✔ Interactive behavior using JavaScript  
✔ Lightweight (No frameworks)

---

 🧠 Concepts Practiced

- DOM selection
- Event listeners
- Class toggling
- UI interaction design
- Dropdown menu logic

---

 🛠 Tech Stack

HTML5  
CSS3  
JavaScript (Vanilla)

---

 📂 Project Structure

project-folder

index.html  
style.css  
script.js  
images/  
preview.gif

---

 ⚙️ How It Works

 Collapse Logic

When a menu button is clicked, JavaScript toggles the **show class**.

```javascript
const menuButtons = document.querySelectorAll('.menu-button');

menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.dataset.target);
        target.classList.toggle('show');
    });
});
