import PersonService from './modules/personService';
import { fillPeopleList } from './modules/list';
import './modules/form';

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#menu-item-form').addEventListener('click', () => {
    showForm();
  }, false);
  document.querySelector('#menu-item-list').addEventListener('click', () => {
    showList();
  }, false);
});

export function showList() {
  //Hide form
  document.querySelector('#form-page').classList.add('hidden');
  document.querySelector('#list-page').classList.remove('hidden');
  //Set form menu inactive
  document.querySelector('#menu-item-form').classList.add('menu-item--inactive');
  document.querySelector('#menu-item-list').classList.remove('menu-item--inactive');

  PersonService.getList().then(list => {
    fillPeopleList(list);
  });
}

export function showForm() {
  //Hide list
  document.querySelector('#form-page').classList.remove('hidden');
  document.querySelector('#list-page').classList.add('hidden');
  //Set list menu inactive
  document.querySelector('#menu-item-form').classList.remove('menu-item--inactive');
  document.querySelector('#menu-item-list').classList.add('menu-item--inactive');
}


