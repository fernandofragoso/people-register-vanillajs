casper.test.begin('Page loads correclty', 3, function suite(test) {
  
  casper.options.clientScripts.push("node_modules/babel-polyfill/dist/polyfill.js");
  
  casper.on('remote.message', function(message) {
    this.log('console.log: ' + message, 'warning');
  });

  casper.start("http://localhost:8080", function() {
    test.assertTitle("Easynvest", "Title is correct");
    test.assertExists('#form-page', "Form is shown");
    test.assertExists('#list-page.hidden', "List is hidden");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Menu links are working', 4, function suite(test) {
  casper.start("http://localhost:8080", function() {
    this.click("#menu-item-list");
  });

  casper.then(function() {
    test.assertExists('#list-page', "List is shown");
    test.assertExists('#form-page.hidden', "Form is hidden");
  });

  casper.then(function() {
    this.click("#menu-item-form");
  });

  casper.then(function() {
    test.assertExists('#list-page.hidden', "List is hidden");
    test.assertExists('#form-page', "Form is shown");
  });

  casper.run(function() {
      test.done();
  });
});

casper.test.begin('Add a new person', 6, function suite(test) {
  casper.start("http://localhost:8080", function() {
    this.fill('form#person-form', {
      'name': 'CasperJS',
      'cpf': '06006006060',
      'phone': '999998888',
      'email': 'casperjs@casperjs.com'
    }, false);
  });

  casper.evaluate(function() {
    localStorage.setItem('people', JSON.stringify([]));
  }, {});

  casper.then(function() {
    this.click(".add-button");
  });

  casper.then(function() {
    test.assertEquals(this.getFormValues('form#person-form').name, "", "Name was cleared");
    test.assertEquals(this.getFormValues('form#person-form').cpf, "", "Cpf was cleared");
    test.assertEquals(this.getFormValues('form#person-form').phone, "", "Phone was cleared");
    test.assertEquals(this.getFormValues('form#person-form').email, "", "Email was cleared");
  });

  casper.then(function() {
    this.click("#menu-item-list");
  });

  casper.then(function() {
    test.assertElementCount('.person-item', 1, "Person list has 1 item");
    test.assertTextExists('CasperJS', 'CasperJS item found');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Remove person', 2, function suite(test) {
  casper.start("http://localhost:8080", function() {
    this.click("#menu-item-list");
  });

  casper.then(function() {
    this.click(".remove-button");
  });

  casper.then(function() {
    test.assertDoesntExist('.person-item', "List is empty");
    test.assertExists('#empty-message', "Empty message is showing");
  });

  casper.run(function() {
      test.done();
  });
});

casper.test.begin('Edit person', 8, function suite(test) {
  casper.start("http://localhost:8080", function() {
    this.fill('form#person-form', {
      'name': 'CasperJS',
      'cpf': '06006006060',
      'phone': '999998888',
      'email': 'casperjs@casperjs.com'
    }, false);
    this.click(".add-button");
  });

  casper.then(function() {
    this.click("#menu-item-list");
  });

  casper.then(function() {
    this.click(".edit-button");
  });

  casper.then(function() {
    test.assertDoesntExist('#form-page.hidden', "Form page is shown");
    test.assertExists('#list-page.hidden', "List page is hidden");
    test.assertSelectorHasText('#add-button', 'Editar', "Button label is 'Editar'");
    test.assertDoesntExist('#cancel-button.hidden', "Cancel button is shown");
    this.fill('form#person-form', {
      'name': 'CasperJSedited',
      'phone': '111111111',
      'email': 'casperjsedited@casperjs.com'
    }, false);
    this.click(".add-button");
  });

  casper.then(function() {
    test.assertDoesntExist('#list-page.hidden', "List is shown");
    test.assertElementCount('.person-item', 1, "Person list has 1 item");
    test.assertTextExists('CasperJSedited', 'Edited name is correct');
    test.assertTextExists('casperjsedited@casperjs.com', 'Edited email is correct');
  });

  casper.run(function() {
      test.done();
  });
});