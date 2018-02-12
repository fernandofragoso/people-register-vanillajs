export default class PersonService {

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
    let people = this.getList();
    people.push(person);
    this.saveToStorage(people);
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

  saveToStorage(people) {
    localStorage.setItem('people', JSON.stringify(people));
  }
}



