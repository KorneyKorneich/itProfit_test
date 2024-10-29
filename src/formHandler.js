import Inputmask from "inputmask";

const nameContainer = document.querySelector(".name");
    const nameInput = document.getElementById('username');
    const emailContainer = document.querySelector(".email");
    const emailInput = document.getElementById('email');
    const phoneContainer = document.querySelector(".phone");
    const telInput = document.getElementById('tel');
    const messageContainer = document.querySelector(".message");
    const messageInput = document.getElementById('message');

export const phoneMask = () => {
    const phoneInput = document.getElementById('tel');
    const im = new Inputmask("+375 (99) 999-99-99");
    im.mask(phoneInput);
}

export const validateForm = () => {
    

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const tel = telInput.value.trim();
    const message = messageInput.value.trim();

    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    telInput.classList.remove('error');

    let hasError = false;

    if (!name) {
        if (!document.querySelector(".name-error")) {
            let div = document.createElement('div');
            div.className = "name-error";
            div.innerHTML = "Эти поля должны быть заполнены";
            nameContainer.append(div);
        }
        nameInput.classList.add('error');
        hasError = true;
    }

    if (!email) {
        if (!document.querySelector(".email-error")) {
            let div = document.createElement('div');
            div.className = "email-error";
            div.innerHTML = "Эти поля должны быть заполнены";
            emailContainer.append(div);
        }
        emailInput.classList.add('error');
        hasError = true;
    }

    if (!tel) {
        if (!document.querySelector(".phone-error")) {
            let div = document.createElement('div');
            div.className = "phone-error";
            div.innerHTML = "Эти поля должны быть заполнены";
            phoneContainer.append(div);
        }
        telInput.classList.add('error');
        hasError = true;
    }

    if (!message) {
        if (!document.querySelector(".message-error")) {
            let div = document.createElement('div');
            div.className = "message-error";
            div.innerHTML = "Эти поля должны быть заполнены";
            messageContainer.append(div);
        }
        messageInput.classList.add('error');
        hasError = true;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        emailInput.classList.add('error');
        if (!document.querySelector(".email-error-format")) {
            let div = document.createElement('div');
            div.className = "email-error-format";
            div.innerHTML = "Email заполнен неверно";
            emailContainer.append(div);
        }
        hasError = true;
    }

    if (hasError) {
        return false;
    }

    return true
};

export const addInputListeners = () => {
    const nameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const telInput = document.getElementById('tel');
    const messageInput = document.getElementById('message');

    nameInput.addEventListener('input', () => {
        nameInput.classList.remove('error');
        const nameError = document.querySelector(".name-error");
        if (nameError) {
            nameError.remove();
        }
    });

    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('error');
        const emailError = document.querySelector(".email-error");
        if (emailError) {
            emailError.remove();
        }
    });

    telInput.addEventListener('input', () => {
        telInput.classList.remove('error');
        const phoneError = document.querySelector(".phone-error");
        if (phoneError) {
            phoneError.remove();
        }
    });

    messageInput.addEventListener('input', () => {
        messageInput.classList.remove('error');
        const messageError = document.querySelector(".message-error");
        if (messageError) {
            messageError.remove();
        }
    });
}

export const sendFormData = async (form) => {

    if (!form) {
        console.error(`Form not found`);
        return;
    }
    


    const formData = {
        username: nameInput.value,
        email: emailInput.value,
        phone: telInput.value,
        message: messageInput.value
    }
    console.log(formData) 

    try {
        const response = await fetch('http://localhost:9090/api/registration', {
            method: 'POST',
            body: formData,
        });

        const jsonResponse = await response.json();
        handleResponse(jsonResponse, form);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const handleResponse = (data, form) => {
    console.log(data)
    if (data.status === 'success') {
        alert(data.message); 
        form.reset(); 
    } else if (data.status === 'error') {
        alert(data.message); 
        for (const field in data.fields) {
            const errorMessage = data.fields[field];
            const inputField = document.querySelector(`[name="${field}"]`); 
            const errorContainer = document.querySelector(`.${field}-error`); 

            if (errorContainer) {
                errorContainer.remove();
            }
            
            const div = document.createElement('div');
            div.className = `${field}-error`;
            div.innerHTML = errorMessage;
            inputField.classList.add('error'); 
            inputField.parentElement.appendChild(div); 
        }
    }
};