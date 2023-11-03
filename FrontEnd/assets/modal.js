const body = document.querySelector("body");
const login = document.getElementById("login");
const banner = document.querySelector(".editionBanner");
const editionButton = document.querySelector(".editionButton");
const filters = document.querySelector(".filters");
let token = localStorage.getItem("token");


if (token) {
    setupLoggedInState();
} else {
    setupLoggedOutState();
}


editionButton.addEventListener("click", DisplayModal);


function setupLoggedInState() {
    login.innerHTML = "logout";
    login.removeAttribute("href");
    login.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    banner.style.display = "flex";
    body.setAttribute("style", "margin-top:100px");
    editionButton.style.display = "flex";
    filters.style.display = "none";
}

function setupLoggedOutState() {

}

function DisplayModal() {
    createModalElements();

    
    DisplayWorksModal();
}

function createModalElements() {
    modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    body.appendChild(modalContainer);

    modalOverlay = document.createElement("div");
    modalOverlay.classList.add("overlay", "modal-trigger");
    modalContainer.appendChild(modalOverlay);

    modal = document.createElement("div");
    modal.classList.add("modal");
    modalContainer.appendChild(modal);

    modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML = "Galerie photo";
    modal.appendChild(modalTitle);

    modalGallery = document.createElement("div");
    modalGallery.classList.add("modal-content", "modal-gallery");
    modal.appendChild(modalGallery);

    buttonAdd = document.createElement("button");
    buttonAdd.innerHTML = "Ajouter une photo";
    buttonAdd.classList.add("button", "button__form");
    modal.appendChild(buttonAdd);

    buttonAdd.addEventListener("click", () => {
        DisplayModalEdit();
    });

    buttonClose = document.createElement("i");
    buttonClose.classList.add("close-modal", "modal-trigger", "fa-solid", "fa-xmark", "fa-xl");
    modal.appendChild(buttonClose);

    const modalTriggers = document.querySelectorAll(".modal-trigger");
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
}

function toggleModal() {
    modalContainer.remove();
}

function DisplayWorksModal() {
    for (let i = 0; i < works.length; i++) {
        const projet = works[i];
        const figure = createProjectFigure(projet);
        modalGallery.appendChild(figure);
    }
}

function createProjectFigure(projet) {
    const figure = document.createElement("figure");
    figure.classList.add("projet");

    const imageProjet = document.createElement("img");
    imageProjet.src = projet.imageUrl;

    const buttonDelete = createDeleteButton(projet, figure);

    figure.appendChild(imageProjet);
    figure.appendChild(buttonDelete);

    return figure;
}

function createDeleteButton(projet, figure) {
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("button-delete");
    buttonDelete.innerHTML = "<i class=\"fa-solid fa-trash-can fa-xs\" style=\"color: #ffffff;\"></i>";
    buttonDelete.addEventListener("click", () => {
        DeleteProject(projet, figure);
    });

    return buttonDelete;
}

function DeleteProject(projet, figure) {
    const idProject = projet.id;
    fetch("http://localhost:5678/api/works/" + idProject, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    figure.remove();
    GetWorks();
}
