import PersonService from './personService';

export function fillPeopleList(people) {
  clearList();
  const ul = document.querySelector('#person-list');
  if (people && people.length > 0) {
    people.forEach(person => {
      let li = `
      <li class="person-item">
        ${person.name} (${person.email}) <button class="remove-button" value="${person.cpf}">X</button>
      </li>`
      ul.insertAdjacentHTML('beforeend', li);
    });
    document.querySelector('#empty-message').classList.add('hidden');
  } else {
    document.querySelector('#empty-message').classList.remove('hidden');
  }


  document.querySelectorAll('.remove-button').forEach(node => {
    node.addEventListener('click', (event) => {
      let cpf = event.currentTarget.getAttribute("value");
      removePerson(cpf);
    }, false);
  })
}

function clearList() {
  document.querySelectorAll(".person-item").forEach(node => {
    node.parentNode.removeChild(node);
  });
}

function removePerson(cpf) {
  if (confirm("Deseja realmente excluir?")) {
    PersonService.removePerson(cpf);
    fillPeopleList(PersonService.getList());
  }
}

