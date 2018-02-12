import PersonService from './personService';

let service = new PersonService();

export function fillPeopleList(people) {
  const ul = document.querySelector('#person-list');
  document.querySelectorAll(".person-item").forEach(node => {
    node.parentNode.removeChild(node);
  });
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

function removePerson(cpf) {
  if (confirm("Deseja realmente excluir?")) {
    service.removePerson(cpf);
    fillPeopleList();
  }
}

