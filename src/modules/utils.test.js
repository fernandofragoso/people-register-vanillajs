import { validateCPF, validateEmail, validateName, validatePhone, clearCPF } from './utils';

test('Validate CPF with dots and hypen', () => {
  expect(validateCPF("060.606.060-60")).toBeTruthy();
  expect(validateCPF("060.606.060--60")).toBeFalsy();
});

test('Validate CPF with only numbers', () => {
  expect(validateCPF("06060606060")).toBeTruthy();
  expect(validateCPF("0606060606")).toBeFalsy();
});

test('Validate Email', () => {
  expect(validateEmail("test@test.com")).toBeTruthy();
  expect(validateEmail("test@test")).toBeFalsy();
  expect(validateEmail("test")).toBeFalsy();
});

test('Validate Name', () => {
  expect(validateName("Fernando Fragoso")).toBeTruthy();
  expect(validateName("Fernando")).toBeTruthy();
  expect(validateName("FF")).toBeFalsy();
});

test('Validate Phone', () => {
  expect(validatePhone("+55 (88) 988998899")).toBeTruthy();
  expect(validatePhone("+5588988998899")).toBeTruthy();
  expect(validatePhone("+55 88 989898989")).toBeTruthy();
  expect(validatePhone("98989")).toBeFalsy();
  expect(validatePhone("Phone number test")).toBeFalsy();
});

test('Clear CPF', () => {
  expect(clearCPF("000.000.000-00")).toBe("00000000000");
  expect(clearCPF("00000000000")).toBe("00000000000");
  expect(clearCPF("000000000-00")).toBe("00000000000")
});