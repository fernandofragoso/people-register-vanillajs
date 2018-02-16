export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePhone(phone) {
  var re = /[()-\d\s+]{8,}/;
  return re.test(phone);
}

export function validateCPF(cpf) {
  var re = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
  return re.test(cpf);
}

export function validateName(name) {
  var re = /[\S\s]{3,}/;
  return re.test(name);
}

export function clearCPF(cpf) {
  return cpf.replace(/[.-]/g, "");
}