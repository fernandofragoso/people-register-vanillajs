import { validateCPF, validateEmail, validateName, validatePhone } from './utils';

test('Validate CPF with dots and hypen', () => {
  expect(validateCPF("060.606.060-60")).toBe(true);
  expect(validateCPF("060.606.060--60")).toBe(false);
});

test('Validate CPF with only numbers', () => {
  expect(validateCPF("06060606060")).toBe(true);
  expect(validateCPF("0606060606")).toBe(false);
});

test('Validate Email', () => {
  expect(validateEmail("test@test.com")).toBe(true);
  expect(validateEmail("test@test")).toBe(false);
  expect(validateEmail("test")).toBe(false);
});

test('Validate Name', () => {
  expect(validateName("Fernando Fragoso")).toBe(true);
  expect(validateName("Fernando")).toBe(true);
  expect(validateName("FF")).toBe(false);
});

test('Validate Phone', () => {
  expect(validatePhone("+55 (88) 988998899")).toBe(true);
  expect(validatePhone("+5588988998899")).toBe(true);
  expect(validatePhone("+55 88 989898989")).toBe(true);
  expect(validatePhone("98989")).toBe(false);
  expect(validatePhone("Phone number test")).toBe(false);
});