'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const projects = [
  {
    title: "Website KMTI",
    category: "web development",
    imgSrc: "./assets/images/Website KMTI.png",
    alt: "Website KMTI",
    url: "https://ayash13.github.io/kmti/",
    github: "https://github.com/Ayash13/kmti"
  },
  {
    title: "Pokedex",
    category: "web development",
    imgSrc: "./assets/images/pokedex_web.png",
    alt: "Pokedex",
    url: "https://ayash13.github.io/pokedex/",
    github: "https://github.com/Ayash13/pokedex"
  },
  {
    title: "Website MATAF TI",
    category: "web development",
    imgSrc: "./assets/images/website_mataf.png",
    alt: "Website MATAF TI",
    url: "https://ayash13.github.io/Mataf-TI-22.github.io/",
    github: "https://github.com/Ayash13/Mataf-TI-22.github.io"
  },
  {
    title: "Website Sponsor MATAF TI",
    category: "web development",
    imgSrc: "./assets/images/sponsor_mataf.png",
    alt: "Website Sponsor MATAF TI",
    url: "https://ayash13.github.io/MATAF-TI-SPONSOR.github.io/",
    github: "https://github.com/Ayash13/MATAF-TI-SPONSOR.github.io"
  },
  {
    title: "Lompah",
    category: "applications",
    imgSrc: "./assets/images/Lompah.png",
    alt: "Lompah",
    url: "https://github.com/Ayash13/Lompah-App",
    github: "https://github.com/Ayash13/Lompah-App"
  },
  {
    title: "Nandur",
    category: "applications",
    imgSrc: "./assets/images/Nandur.png",
    alt: "Nandur",
    url: "https://github.com/Ayash13/Nandur",
    github: "https://github.com/Ayash13/Nandur"
  },
  {
    title: "Ayflix",
    category: "web development",
    imgSrc: "./assets/images/ayflix.png",
    alt: "Ayflix",
    url: "https://ayash13.github.io/Ayflix/",
    github: "https://github.com/Ayash13/Ayflix"
  },
  {
    title: "A day in my life",
    category: "web development",
    imgSrc: "./assets/images/dayInMyLife.png",
    alt: "A day in my life",
    url: "https://ayash13.github.io/Day-in-my-life/",
    github: "https://github.com/Ayash13/Day-in-my-life"
  },
  {
    title: "Official Web MMFEST 23",
    category: "web development",
    imgSrc: "./assets/images/MMF-23.png",
    alt: "MMFEST 23",
    url: "https://www.mmfest23.com/",
    github: "https://github.com/Ayash13/MMFEST-23"
  },
  {
    title: "Trashify",
    category: "applications",
    imgSrc: "./assets/images/Trashify.png",
    alt: "Trashify",
    url: "https://github.com/Ayash13/Project_Gemastik",
    github: "https://github.com/Ayash13/Project_Gemastik"
  },
  {
    title: "Magang  Alternate Web",
    category: "web development",
    imgSrc: "./assets/images/MSIB.png",
    alt: "MSIB",
    url: "https://ayash13.github.io/Magang-MSIB/",
    github: "https://github.com/Ayash13/Magang-MSIB"
  },
];

const categories = ["All", "Applications", "Web development"];

const filterList = document.querySelector('.filter-list');
categories.forEach((category, index) => {
  const filterItem = document.createElement('li');
  filterItem.classList.add('filter-item');
  filterItem.innerHTML = `<button data-filter-btn${index === 0 ? ' class="active"' : ''}>${category}</button>`;
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
      <a class="open-modal" data-url="${project.url}" data-modal="#myModal${index + 1}" data-category="${project.category}">
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

    if (project.category !== "applications") {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.id = `myModal${index + 1}`;
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="link-container">
            <a class="clickMe" target="_blank" href="${project.url}">Go to the page</a>
            <a class="clickMe" target="_blank" href="${project.github}"><i class="fab fa-github"></i> GitHub</a>
          </div>
          <iframe id="myIframe${index + 1}" src="" frameborder="0"></iframe>
        </div>
      `;
      document.body.appendChild(modal);
    }
  });

  setupModals();
}

function filterProjects(category) {
  if (category === "All") {
    return projects;
  } else {
    return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
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

function setupModals() {
  const modalLinks = document.querySelectorAll('.open-modal');

  modalLinks.forEach(function (link) {
    link.onclick = function (event) {
      event.preventDefault();
      const category = link.getAttribute('data-category');
      if (category === "applications") {
        const githubUrl = link.getAttribute('data-url');
        window.open(githubUrl, '_blank');
      } else {
        const url = link.getAttribute('data-url');
        const modal = document.querySelector(link.getAttribute('data-modal'));
        const iframe = modal.querySelector('iframe');
        iframe.src = url;
        modal.style.display = "block";
      }
    };
  });

  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function (button) {
    button.onclick = function () {
      const modal = button.closest('.modal');
      modal.style.display = "none";
    };
  });

  window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
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
    navigationLinks.forEach((link) => link.classList.remove('active'));
    pages.forEach((page) => page.classList.remove('active'));

    navLink.classList.add('active');
    pages[i].classList.add('active');
    window.scrollTo(0, 0);
  });
});

function showCertificate(img) {
  const modal = document.createElement('div');
  modal.classList.add('certificate-modal');
  modal.style.display = 'flex';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  const certificateImg = document.createElement('img');
  certificateImg.src = img.src;
  certificateImg.style.maxWidth = '90%';
  certificateImg.style.maxHeight = '90%';
  certificateImg.style.border = '5px solid white';

  modal.appendChild(certificateImg);

  document.body.appendChild(modal);

  modal.addEventListener('click', function () {
    document.body.removeChild(modal);
  });
}

window.showCertificate = show