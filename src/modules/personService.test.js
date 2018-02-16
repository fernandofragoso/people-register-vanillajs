import PersonService from './personService';

beforeEach(() => {
  return localStorage.clear();
});

const response = [
  {
    "name": "My name 1",
    "cpf": "04080757247",
    "phone": "11987654321",
    "email": "myemail1@test.com.br"
  },
  {
    "name": "My name 2",
    "cpf": "77797584192",
    "phone": "11987654321",
    "email": "myemail2@test.com.br"
  },
  {
    "name": "My name 3",
    "cpf": "45486737688",
    "phone": "11987654321",
    "email": "myemail3@test.com.br"
  }
];

fetch.mockResponse(JSON.stringify(response));

test('Get people list without localStorage', () => {
  return PersonService.getList().then(list => {
    expect(list).toEqual(response);
  });
});

test('Get people list with localStorage', () => {
  let person = {
    name: "test",
    cpf: "12345678901",
    phone: "8188998899",
    email: "test@test.com"
  }
  localStorage.setItem('people', JSON.stringify([person]));

  return PersonService.getList().then(list => {
    expect(list.length).toEqual(1);
  });
});

test('Save person', () => {
  let person = {
    name: "test",
    cpf: "12345678901",
    phone: "8188998899",
    email: "test@test.com"
  }
  let expectedResponse = response;
  expectedResponse.push(person);
  return PersonService.savePerson(person).then(() => {
    PersonService.getList().then(list => {
      expect(list.length).toBe(4);
      expect(list).toEqual(expectedResponse);
    });
  });
});

test('Find Person', () => {
  const cpf = "04080757247";
  return PersonService.findPerson(cpf).then(person => {
    expect(person.name).toEqual("My name 1");
    expect(person.cpf).toEqual("04080757247");
    expect(person.phone).toEqual("11987654321");
    expect(person.email).toEqual("myemail1@test.com.br");
  });
});

test('Find inexistent Person', () => {
  const cpf = "222222222";
  return PersonService.findPerson(cpf).then(person => {
    expect(person).toBeNull();
  });
});

test('Save person with existing cpf', () => {
  let person = {
    name: "test2",
    cpf: "04080757247",
    phone: "8199889988",
    email: "test2@test.com"
  }
  return expect(PersonService.savePerson(person)).rejects.toMatch(`CPF ${person.cpf} já cadastrado!`);
});

test('Edit person', () => {
  let person = {
    name: "test3",
    cpf: "77797584192",
    phone: "8177667766",
    email: "test3@test.com"
  }
  return PersonService.editPerson(person).then(() => {
    return PersonService.findPerson(person.cpf).then(personEdited => {
      expect(personEdited.name).toMatch(person.name);
      expect(personEdited.cpf).toMatch(person.cpf);
      expect(personEdited.phone).toMatch(person.phone);
      expect(personEdited.email).toMatch(person.email);
    });
  });
});

test('Remove person', () => {
  const cpf = "45486737688";
  return PersonService.removePerson(cpf).then(() => {
    PersonService.findPerson(cpf).then(person => {
      expect(person).toBeNull();
    });
    PersonService.getList().then(list => {
      expect(list.length).toBe(2);
    });
  });
});

test('Remove inexistent person', () => {
  const cpf = "111111111";
  return PersonService.removePerson(cpf).then(() => {
    PersonService.findPerson(cpf).then(person => {
      expect(person).toBeNull();
    });
    PersonService.getList().then(list => {
      expect(list.length).toBe(3);
    });
  });
});