import './main.scss';
import {phoneMask, validateForm, addInputListeners, sendFormData} from "./formHandler"

document.addEventListener('DOMContentLoaded', () => {
    phoneMask();
    addInputListeners();

    const form = document.getElementById("testForm")
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        if (validateForm()) {
            console.log("here")
            sendFormData(form)
        }
    });


    const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');


openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
});


closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
});