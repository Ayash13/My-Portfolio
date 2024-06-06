'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const projects = [
  {
    title: "Website KMTI",
    category: "web development",
    imgSrc: "./assets/images/Website KMTI.png",
    alt: "Website KMTI",
    url: "https://ayash13.github.io/kmti/",
  },
  {
    title: "Pokedex",
    category: "web development",
    imgSrc: "./assets/images/pokedex_web.png",
    alt: "Pokedex",
    url: "https://ayash13.github.io/pokedex/",
  },
  {
    title: "Website MATAF TI",
    category: "web development",
    imgSrc: "./assets/images/website_mataf.png",
    alt: "Website MATAF TI",
    url: "https://ayash13.github.io/Mataf-TI-22.github.io/",
  },
  {
    title: "Website Sponsor MATAF TI",
    category: "web development",
    imgSrc: "./assets/images/sponsor_mataf.png",
    alt: "Website Sponsor MATAF TI",
    url: "https://ayash13.github.io/MATAF-TI-SPONSOR.github.io/",
  },
  {
    title: "Lompah",
    category: "applications",
    imgSrc: "./assets/images/Lompah.png",
    alt: "Lompah",
    url: "https://ayash13.github.io/Duplicate-GitPage/",
  },
  {
    title: "Nandur",
    category: "applications",
    imgSrc: "./assets/images/Nandur.png",
    alt: "Nandur",
    url: "https://www.youtube.com/embed/WkLT26To_xE",
  },
  {
    title: "Ayflix",
    category: "web development",
    imgSrc: "./assets/images/ayflix.png",
    alt: "Ayflix",
    url: "https://ayash13.github.io/Ayflix/",
  },
  {
    title: "A day in my life",
    category: "web development",
    imgSrc: "./assets/images/dayInMyLife.png",
    alt: "A day in my life",
    url: "https://ayash13.github.io/Day-in-my-life/",
  },
  {
    title: "Official Web MMFEST 23",
    category: "web development",
    imgSrc: "./assets/images/MMF-23.png",
    alt: "MMFEST 23",
    url: "https://www.mmfest23.com/",
  },
];


const categories = ["All", "Applications", "Web development"];

const filterList = document.querySelector('.filter-list');
categories.forEach(category => {
  const filterItem = document.createElement('li');
  filterItem.classList.add('filter-item');
  filterItem.innerHTML = `<button data-filter-btn>${category}</button>`;
  filterList.appendChild(filterItem);
});

const projectList = document.querySelector('.project-list');

function displayProjects(filteredProjects) {
  projectList.innerHTML = '';
  filteredProjects.forEach((project, index) => {
    const projectItem = document.createElement('li');
    projectItem.classList.add('project-item', 'active');
    projectItem.setAttribute('data-filter-item', '');
    projectItem.setAttribute('data-category', project.category);

    projectItem.innerHTML = `
      <a class="open-modal" data-url="${project.url}" data-modal="#myModal${index + 1}">
        <figure style="cursor: pointer" class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.imgSrc}" alt="${project.alt}" loading="lazy" />
        </figure>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
      </a>
    `;

    projectList.appendChild(projectItem);

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = `myModal${index + 1}`;
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <a class="clickMe" target="_blank" href="${project.url}">Go to the page</a>
        <iframe id="myIframe${index + 1}" src="" frameborder="0"></iframe>
      </div>
    `;
    document.body.appendChild(modal);
  });

  setupModals();
}

function filterProjects(category) {
  if (category === 'All') {
    return projects;
  } else {
    return projects.filter(project => project.category === category.toLowerCase());
  }
}

displayProjects(projects);

const filterBtns = document.querySelectorAll('[data-filter-btn]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');
    const selectedCategory = btn.innerText;
    const filteredProjects = filterProjects(selectedCategory);
    displayProjects(filteredProjects);
  });
});

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

function setupModals() {
  const modals = document.querySelectorAll('.modal');
  const modalLinks = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.close');

  modalLinks.forEach(function (link) {
    link.onclick = function (event) {
      event.preventDefault();
      var url = link.getAttribute('data-url');
      var modal = document.querySelector(link.getAttribute('data-modal'));
      var iframe = modal.querySelector('iframe');
      iframe.src = url;
      modal.style.display = "block";
    };
  });

  closeButtons.forEach(function (button) {
    button.onclick = function () {
      var modal = button.closest('.modal');
      modal.style.display = "none";
    };
  });

  window.onclick = function (event) {
    modals.forEach(function (modal) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  };
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((navLink, i) => {
  navLink.addEventListener("click", () => {
    navigationLinks.forEach((link) => link.classList.remove("active"));
    pages.forEach((page) => page.classList.remove("active"));

    navLink.classList.add("active");
    pages[i].classList.add("active");
    window.scrollTo(0, 0);
  });
});
