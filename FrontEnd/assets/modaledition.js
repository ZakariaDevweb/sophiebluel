let modalForm;
let formInputImg;
let inputPhoto;
let inputTitle;
let inputCategory;
let buttonValid;
let buttonReturn;
let preview;
let errorMessage;

function DisplayModalEdit() {

    modalGallery.remove();
    buttonAdd.remove();

    buttonReturn = document.createElement("i");
    buttonReturn.classList.add("button-return", "fa-solid", "fa-arrow-left", "fa-xl");
    modal.appendChild(buttonReturn);
    buttonReturn.addEventListener("click", () => {
        modalContainer.remove();
        DisplayModal();
    });


    modalTitle.innerHTML = "Ajout photo";

  
    modalForm = document.createElement("form");
    modalForm.classList.add("modal-form");
    modalForm.method = "POST";
    modalForm.setAttribute("name", "modalForm");
    modal.appendChild(modalForm);

    
    let formInput = document.createElement("div");
    formInput.classList.add("modal-content", "form__input");
    modalForm.appendChild(formInput);

    formInputImg = document.createElement("div");
    formInputImg.classList.add("form__inputImg");
    formInput.appendChild(formInputImg);

    let logo = document.createElement("i");
    logo.classList.add("fa-sharp", "fa-regular", "fa-image");
    formInputImg.appendChild(logo);

    let labelPhoto = document.createElement("label");
    labelPhoto.setAttribute("for", "photo");
    labelPhoto.innerText = "+ Ajouter photo";
    formInputImg.appendChild(labelPhoto);

    inputPhoto = document.createElement("input");
    inputPhoto.setAttribute("type", "file");
    inputPhoto.setAttribute("id", "photo");
    inputPhoto.setAttribute("name", "photo");
    formInputImg.appendChild(inputPhoto);

    preview = document.createElement("img");
    preview.classList.add("preview");
    preview.setAttribute("src", "");
    formInputImg.appendChild(preview);

    inputPhoto.addEventListener("change", () => {
        PreviewPhoto();
    });

    let limit = document.createElement("p");
    limit.innerText = "jpg, png : 4mo max";
    formInputImg.appendChild(limit);

    
    let labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title");
    labelTitle.innerText = "Titre";
    formInput.appendChild(labelTitle);

    inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("id", "title");
    inputTitle.setAttribute("name", "title");
    formInput.appendChild(inputTitle);

   
    let labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "category");
    labelCategory.innerText = "Catégorie";
    formInput.appendChild(labelCategory);

    inputCategory = document.createElement("select");
    inputCategory.setAttribute("id", "category");
    inputCategory.setAttribute("name", "category");
    formInput.appendChild(inputCategory);

    AssignCategory(inputCategory);

   
    errorMessage = document.createElement("p");
    errorMessage.style.color = "#b30000";
    formInput.appendChild(errorMessage);

   
    buttonValid = document.createElement("input");
    buttonValid.classList.add("button", "button__off");
    buttonValid.setAttribute("type", "submit");
    buttonValid.setAttribute("value", "Valider");
    buttonValid.setAttribute("disabled", "disabled");
    modalForm.appendChild(buttonValid);

    
    modalForm.addEventListener("input", () => {
        VerifyInputs();
    });

    modalForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        AddProject();
    });
}

function AssignCategory(e) {
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const option = document.createElement("option");
        option.setAttribute("value", category.id);
        option.innerText = category.name;
        e.appendChild(option);
    }
}

function PreviewPhoto() {
    const file = inputPhoto.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        preview.src = e.target.result;
        const formElements = formInputImg.querySelectorAll(".form__inputImg > *");

        formElements.forEach((element) => {
            element.style.display = "none";
        });

        preview.style.display = "flex";
    };
}

function VerifyInputs() {
    let erreur;

    if (!inputPhoto.files[0]) {
        erreur = 'Veuillez ajouter une photo';
    }

    if (!inputTitle.value) {
        erreur = 'Veuillez ajouter un titre';
    }

    if (!inputPhoto.files[0] && !inputTitle.value) {
        erreur = 'Veuillez ajouter une photo et un titre';
    }

    if (erreur) {
        errorMessage.innerText = erreur;
        buttonValid.classList.add("button__off");
        buttonValid.setAttribute('disabled', 'disabled');
    } else {
        errorMessage.innerText = '';
        buttonValid.classList.remove("button__off");
        buttonValid.removeAttribute("disabled");
    }
}

async function AddProject() {
    let formData = new FormData();
    formData.append("image", inputPhoto.files[0]);
    formData.append("title", inputTitle.value);
    formData.append("category", inputCategory.value);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        works.push(data);
        return works;
    })
    .then(() => {
        alert('projet ajouté avec succès');
        DisplayWorks(works);
        modalContainer.remove();
        DisplayModal();
    });
}
