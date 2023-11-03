const gallery = document.querySelector(".gallery");
let works = [];
let categories = [];

function initializeApp() {
    GetWorks();
    GetCategories();
}

function GetWorks() {
    fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            works = data;
            DisplayWorks(works);
        });
}

function GetCategories() {
    fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
        .then((data) => {
            categories = data;
            DisplayCategories(categories);
        });
}

function DisplayWorks(arrayWorks) {
    gallery.innerHTML = "";
    arrayWorks.forEach((projet) => {
        const figure = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerHTML = projet.title;
        gallery.appendChild(figure);
        figure.appendChild(imageProjet);
        figure.appendChild(titreProjet);
    });
}

function DisplayCategories(filters) {
    const divFilters = document.querySelector(".filters");

    const buttonAll = createFilterButton("Tous", true);
    divFilters.appendChild(buttonAll);

    buttonAll.addEventListener("click", () => {
        DisplayWorks(works);
    });

    filters.forEach((category) => {
        const button = createFilterButton(category.name);
        divFilters.appendChild(button);

        button.addEventListener("click", () => {
            buttonAll.classList.remove("filters__buttonAll");
            const worksFilt = works.filter((project) => project.categoryId === category.id);
            DisplayWorks(worksFilt);
        });
    });
}

function createFilterButton(text, isAll = false) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.classList.add("filters__button");

    if (isAll) {
        button.classList.add("filters__buttonAll");
    }

    return button;
}

initializeApp();
