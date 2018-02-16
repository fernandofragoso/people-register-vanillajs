import PersonService from './personService';
import { setEditMode } from './form';
import { showForm } from '../app';

export function fillPeopleList(people) {
  clearList();
  const ul = document.querySelector('#person-list');
  if (people && people.length > 0) {
    people.forEach(person => {
      let li = `
      <li class="person-item">
        ${person.name} (${person.email})
        <div class="person-item__buttons">
          <button class="item-button edit-button" value="${person.cpf}">Edit</button>
          <button class="item-button remove-button" value="${person.cpf}">X</button>
        </div>
      </li>`
      ul.insertAdjacentHTML('beforeend', li);
    });
    document.querySelector('#empty-message').classList.add('hidden');
  } else {
    document.querySelector('#empty-message').classList.remove('hidden');
  }

  Array.prototype.slice.call(document.getElementsByClassName("remove-button")).forEach(node => {
    node.addEventListener('click', (event) => {
      let cpf = event.currentTarget.getAttribute("value");
      removePerson(cpf);
    }, false);
  });

  Array.prototype.slice.call(document.getElementsByClassName("edit-button")).forEach(node => {
    node.addEventListener('click', (event) => {
      let cpf = event.currentTarget.getAttribute("value");
      editPerson(cpf);
    }, false);
  });
}

function clearList() {
  Array.prototype.slice.call(document.getElementsByClassName("person-item")).forEach(node => {
    node.parentNode.removeChild(node);
  });
}

function removePerson(cpf) {
  if (confirm("Deseja realmente excluir?")) {
    PersonService.removePerson(cpf).then(() => {
      PersonService.getList().then(list => {
        fillPeopleList(list);
      });
    });
  }
}

function editPerson(cpf) {
  showForm();
  setEditMode(cpf);
}

