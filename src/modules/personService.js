import { clearCPF } from './utils';

class PersonService {

  constructor() {
    if(!PersonService.instance){
      PersonService.instance = this;
    }
    return PersonService.instance;
  }

  getList() {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('people')) {
        fetch('https://private-21e8de-rafaellucio.apiary-mock.com/users')
        .then(res => res.json())
        .then(people => {
          this.saveToStorage(people);
          resolve(JSON.parse(localStorage.getItem('people')));
        })
        .catch(err => {
          this.saveToStorage([]);
          resolve(JSON.parse(localStorage.getItem('people')));
        });
      } else {
        resolve(JSON.parse(localStorage.getItem('people')));
      }
    });
  }

  savePerson(person) {
    return new Promise((resolve, reject) => {
      let cpf = clearCPF(person.cpf);
      this.findPerson(cpf).then(personExists => {
        if (!personExists) {
          this.getList().then(people => {
            person.cpf = cpf;
            people.push(person);
            this.saveToStorage(people);
            resolve();
          });
        } else {
          reject(`CPF ${cpf} já cadastrado!`);
        }
      });
    });
  }

  editPerson(person) {
    return new Promise((resolve, reject) => {
      this.getList().then(list => {
        let people = list.map(p => {
          return (p.cpf === person.cpf) ? person : p;
        });
        this.saveToStorage(people);
        resolve();
      });
    });
  }

  removePerson(cpf) {
    return new Promise((resolve, reject) => {
      this.getList().then(list => {
        let people = list.filter(person => {
          return (person.cpf !== cpf);
        });
        this.saveToStorage(people);
        resolve();
      });
    });
  }

  findPerson(cpf) {
    return new Promise((resolve, reject) => {
      this.getList().then(list => {
        let person = list.filter(person => {
          return (person.cpf === cpf);
        });
        resolve(person[0] ? person[0] : null);
      });
    });
  }

  saveToStorage(people) {
    localStorage.setItem('people', JSON.stringify(people));
  }
}

const instance = new PersonService();
Object.freeze(instance);

export default instance;



