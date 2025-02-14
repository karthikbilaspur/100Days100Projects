// project data
const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "project1.jpg"
    },
    {
      id: 2,
      title: "Project 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "project2.jpg"
    },
    {
      id: 3,
      title: "Project 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "project3.jpg"
    },
    {
      id: 4,
      title: "Project 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "project4.jpg"
    },
    {
      id: 5,
      title: "Project 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "project5.jpg"
    },
    {
      id: 6,
      title: "Project 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "project6.jpg"
    }
  ];
  
  // generate project cards dynamically
  const projectGrid = document.querySelector(".project-grid");
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;
    projectGrid.appendChild(projectCard);
  });
  
  // scroll to projects section on button click
  const scrollBtn = document.querySelector(".scroll-btn");
  scrollBtn.addEventListener("click", () => {
    const projectsSection = document.querySelector(".projects");
    projectsSection.scrollIntoView({ behavior: "smooth" });
  });
  
  // add active class to navigation links on click
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((otherLink) => otherLink.classList.remove("active"));
      link.classList.add("active");
    });
  });
  