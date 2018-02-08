import {showAlert, showPrint} from './modules/show';
import peopleRepository from './modules/peopleRepository';

let webpack = "Webpack";
let babel = "Babel"
let repo = new peopleRepository();

console.log(`${webpack} and ${babel} test`);

// showAlert("Modules Working!!");
showPrint("Modules FTW!!");
let people = repo.getList();
// debugger;
// let newPerson = {
//   "name": "Fernando",
//   "cpf": "06511626458",
//   "phone": "81988482529",
//   "email": "fernandofragoso@gmail.com"
// };

// repo.savePerson(newPerson);