export default class PeopleStorage {

  constructor() {
    this.getList();
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
    let people = this.getList();
    people.push(person);
    this.saveToStorage(people);
  }

  saveToStorage(people) {
    localStorage.setItem('people', JSON.stringify(people));
  }
}



