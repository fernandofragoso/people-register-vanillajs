import PersonService from './personService';
import { validateCPF, validateEmail, validateName, validatePhone } from './utils';

let editMode = false;

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('person-form').addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm();
  }, false);

  document.querySelectorAll('.input-text').forEach(input => {
    input.addEventListener('keyup', (event) => {
      validateSubmit();
    }, false);

    input.addEventListener('blur', (event) => {
      validateSubmit();
    }, false);
  });

  document.querySelector('#add-button').classList.add('add-button--disabled');
});

function validateSubmit() {
  let name = document.querySelector("#name-input").value;
  let phone = document.querySelector("#phone-input").value;
  let cpf = document.querySelector("#cpf-input").value;
  let email = document.querySelector("#email-input").value;

  validateField("email", email !== "" && !validateEmail(email));
  validateField("name", name !== "" && !validateName(name));
  validateField("cpf", cpf !== "" && !validateCPF(cpf));
  validateField("phone", phone !== "" && !validatePhone(phone));

  let allValid = validateEmail(email) &&
    validateCPF(cpf) &&
    validatePhone(phone) &&
    validateName(name);

  if (allValid) {
    clearValidations();
  }
  setButtonDisabled(!allValid);
}

// function validateFields() {
//   let name = document.querySelector("#name-input").value;
//   let phone = document.querySelector("#phone-input").value;
//   let cpf = document.querySelector("#cpf-input").value;
//   let email = document.querySelector("#email-input").value;


// }

function clearValidations() {
  const fields = ["name", "email", "cpf", "phone"];
  fields.forEach(field => {
    validateField(field, false);
  });
}

function validateField(field, invalid) {
  if (invalid) {
    document.querySelector(`#${field}-input`).classList.add("input-text--invalid");
    document.querySelector(`#${field}-validation`).classList.remove("hidden");
  } else {
    document.querySelector(`#${field}-input`).classList.remove("input-text--invalid");
    document.querySelector(`#${field}-validation`).classList.add("hidden");
  }
}

function setButtonDisabled(value) {
  let button = document.querySelector('#add-button');
  if (value) {
    button.setAttribute('disabled', 'disabled');
  } else {
    button.removeAttribute('disabled');
  }
}

function submitForm() {
  let name = document.querySelector("#name-input").value;
  let phone = document.querySelector("#phone-input").value;
  let cpf = document.querySelector("#cpf-input").value;
  let email = document.querySelector("#email-input").value;
  let person = {
    name: name,
    phone: phone,
    email: email,
    cpf: cpf
  }

  if (editMode) {
    PersonService.editPerson(person);
    cancelEditMode();
  } else {
    try {
      PersonService.savePerson(person);
      clearFields();
    } catch (error) {
      alert(error);
    }
  }
  
}

function clearFields() {
  document.querySelectorAll('.input-text').forEach(input => {
    input.value = "";
  });
  setButtonDisabled(true);
}

export function setEditMode(cpf) {
  let person = PersonService.findPerson(cpf);
  editMode = true;

  //Fill fields
  document.querySelector("#name-input").value = person.name;
  document.querySelector("#phone-input").value = person.phone;
  document.querySelector("#cpf-input").value = person.cpf;
  document.querySelector("#cpf-input").setAttribute('disabled', 'disabled')
  document.querySelector("#email-input").value = person.email;

  //Change buttons
  document.querySelector("#add-button").value = "Editar";
  document.querySelector("#cancel-button").classList.remove("hidden");
  setButtonDisabled(false);
}

export function cancelEditMode() {
  editMode = false;
  document.querySelector("#add-button").value = "Cadastrar";
  document.querySelector("#cancel-button").classList.add("hidden");
  document.querySelector("#cpf-input").removeAttribute("disabled");
  setButtonDisabled(false);
  clearFields();
}
