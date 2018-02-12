import PersonService from './personService';

let service = new PersonService();

document.addEventListener('DOMContentLoaded', function() {
  //Add listeners
  document.querySelector('#add-button').addEventListener('click', () => {
    addButtonClick();
  }, false);

  document.querySelectorAll('.input-text').forEach(input => {
    input.addEventListener('keyup', (event) => {
      validateFields();
    }, false);
  });
});

function validateFields() {
  let name = document.querySelector("#name-input").value;
  let phone = document.querySelector("#phone-input").value;
  let cpf = document.querySelector("#cpf-input").value;
  let email = document.querySelector("#email-input").value;
  setButtonDisabled(
    name === "" ||
    phone === "" ||
    cpf === "" ||
    email === ""
  );
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

function addButtonClick() {
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
  service.savePerson(person);
  clearFields();
}

function clearFields() {
  document.querySelectorAll('.input-text').forEach(input => {
    input.value = "";
  });
  setButtonDisabled(true);
}