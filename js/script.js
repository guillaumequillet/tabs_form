const header = document.querySelector("header");
const pages = document.querySelectorAll(".page");
const pagesCount = pages.length;
let currentPage = 2;
let pageItems= null;

const previousPage = document.createElement("button");
previousPage.type = "button";
previousPage.appendChild(document.createTextNode("Précédent"));
previousPage.classList.add("previous");

const nextPage = document.createElement("button");
nextPage.type = "button";
nextPage.appendChild(document.createTextNode("Suivant"));
nextPage.classList.add("next");

const submit = document.createElement("button");
submit.appendChild(document.createTextNode("Terminer"));

window.onload = () => {
  // we create the page number items
  createHeader();

  // we select them
  pageItems = header.querySelectorAll("nav ul .page-item");

  // we define the active page as the default one
  setPageActive(currentPage);
  
  // adding buttons previous, next and submit if needed
  pages.forEach((page, index) => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("page-buttons");
    
    if (index > 0) {
      buttonsContainer.appendChild(previousPage.cloneNode(true));
    }

    if (index + 1 < pages.length) {
      buttonsContainer.appendChild(nextPage.cloneNode(true));
    }

    if (index + 1 === pages.length) {
      buttonsContainer.appendChild(submit.cloneNode(true));
    }

    page.appendChild(buttonsContainer);
  });

  // event listeners
  // previous page
  document.querySelectorAll("button.previous").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (currentPage > 1) {
        currentPage -= 1;
        setPageActive(currentPage);
      }
    });
  });

  // next page
  document.querySelectorAll("button.next").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (currentPage < pages.length) {
        currentPage += 1;
        setPageActive(currentPage);
      }
    });
  });

  // click on header page-item
  document.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI" && e.target.classList.contains("page-item")) {
      currentPage = parseInt(e.target.innerText);
      setPageActive(currentPage);
    }
  });
};

function createHeader() {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  ul.classList.add("pages-nav");

  for (let i = 1; i <= pages.length; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");    
    li.innerText = i;
    ul.appendChild(li);
  }
  
  nav.appendChild(ul);
  header.appendChild(nav);
}

function setPageActive(page) {
  if (page <= pagesCount && page > 0) {
    pages.forEach((p) => {
      p.style.display = "none";
    });
    pages[page - 1].style.display = "initial";
    
    pageItems.forEach((page, index) => {
      if (index + 1 === currentPage) {
        page.classList.add("page-active");
      } else {
        page.classList.remove("page-active");
      } 
    });
  } 
}
