import { clearCPF } from './utils';

class PersonService {

  constructor() {
    if(!PersonService.instance){
      PersonService.instance = this;
    }
    return PersonService.instance;
  }

  getList() {
    if (!localStorage.getItem('people')) {
      fetch('https://private-21e8de-rafaellucio.apiary-mock.com/users')
      .then(res => res.json())
      .then(people => {
        this.saveToStorage(people);
      })
      .catch(err => {
        console.log('Error fetching');
        this.saveToStorage([]);
      });
    }
    return JSON.parse(localStorage.getItem('people'));
  }

  savePerson(person) {
    let cpf = clearCPF(person.cpf);
    if (!this.findPerson(cpf)) {
      let people = this.getList();
      person.cpf = cpf;
      people.push(person);
      this.saveToStorage(people);
    } else {
      throw `CPF ${person.cpf} já cadastrado!`;
    }
  }

  editPerson(person) {
    let people = this.getList().map(p => {
      return (p.cpf === person.cpf) ? person : p;
    });
    this.saveToStorage(people);
  }

  removePerson(cpf) {
    let people = this.getList().filter(person => {
      return (person.cpf !== cpf);
    });
    this.saveToStorage(people);
  }

  findPerson(cpf) {
    return this.getList().find(person => {
      return (person.cpf === cpf);
    });
  }

  saveToStorage(people) {
    localStorage.setItem('people', JSON.stringify(people));
  }
}

const instance = new PersonService();
Object.freeze(instance);

export default instance;



