import PersonService from './modules/personService';
import Person from './modules/person';
import './modules/form';

let service = new PersonService();

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#menu-item-form').addEventListener('click', () => {
    showForm();
  }, false);
  document.querySelector('#menu-item-list').addEventListener('click', () => {
    showList();
  }, false);
});

function showList() {
  fillPeopleList(service.getList());
  //Hide form
  document.querySelector('#form-page').classList.add('page--invisible');
  document.querySelector('#list-page').classList.remove('page--invisible');
  //Set form menu inactive
  document.querySelector('#menu-item-form').classList.add('menu-item--inactive');
  document.querySelector('#menu-item-list').classList.remove('menu-item--inactive');
}

function showForm() {
  //Hide list
  document.querySelector('#form-page').classList.remove('page--invisible');
  document.querySelector('#list-page').classList.add('page--invisible');
  //Set list menu inactive
  document.querySelector('#menu-item-form').classList.remove('menu-item--inactive');
  document.querySelector('#menu-item-list').classList.add('menu-item--inactive');
}

function fillPeopleList(people) {
  const ul = document.querySelector('#person-list');
  document.querySelectorAll(".person-item").forEach(node => {
    node.parentNode.removeChild(node);
  });
  people.forEach(person => {
    ul.insertAdjacentHTML('beforebegin', `<li class="person-item">${person.name} (${person.email})</li>`);
  });
}


// let webpack = "Webpack";
// let babel = "Babel"


// console.log(`${webpack} and ${babel} test`);

// showAlert("Modules Working!!");
// showPrint("Modules FTW!!");
// let people = repo.getList();
//fillPeopleList(people);

// debugger;

// render("<h1>Main</h1>", document.querySelector('#main'))

// debugger;
// let newPerson = {
//   "name": "Fernando",
//   "cpf": "06511626458",
//   "phone": "81988482529",
//   "email": "fernandofragoso@gmail.com"
// };

// repo.savePerson(newPerson);
// function render(template, node) {
//   node.innerHTML = template;
// }
