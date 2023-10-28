const gallery = document.querySelector(".gallery");
let works = [];
let categories = [];
function GetWorks() {
    fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            works = data;
            DisplayWorks(works);
            return works
        });
}
GetWorks();
function GetCategories() {
    fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
        .then((data) => {
            categories = data;
            DisplayCategories(categories);
        });
}
GetCategories();
function DisplayWorks(arrayworks) {
    gallery.innerHTML="";
    for (let i=0; i<arrayworks.length; i++){
        const projet = arrayworks[i];
        const figure = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src=projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerHTML=projet.title;
        gallery.appendChild(figure);
        figure.appendChild(imageProjet);
        figure.appendChild(titreProjet);
    }
};
function DisplayCategories(filters){
    const divFilters = document.querySelector(".filters");
    const buttonAll = document.createElement("button");
    buttonAll.innerHTML="Tous";
    buttonAll.classList.add("filters__button","filters__buttonAll")
    divFilters.appendChild(buttonAll);
    buttonAll.addEventListener("click", () =>{
        DisplayWorks(works);
    })
    for (let i=0; i<filters.length; i++){
        const category= filters[i];
        const button = document.createElement("button");
        button.innerHTML=category.name;
        button.classList.add("filters__button")
        divFilters.appendChild(button);
        button.addEventListener("click", () =>{
            buttonAll.classList.remove("filters__buttonAll");
            const worksFilt = works.filter((project)=>project.categoryId === category.id);
            DisplayWorks(worksFilt);
        })

    }
}