import PersonService from './personService';
import { validateCPF, validateEmail, validateName, validatePhone } from './utils';

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
    button.classList.add('add-button--disabled');
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove('add-button--disabled');
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
  try {
    PersonService.savePerson(person);
    clearFields();
  } catch (error) {
    alert(error);
  }
}

function clearFields() {
  document.querySelectorAll('.input-text').forEach(input => {
    input.value = "";
  });
  setButtonDisabled(true);
}