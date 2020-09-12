import { calculate } from './calculate';

test('Returns 7 when adding 2 and 5', () => {
  expect(calculate('+', 2, 5)).toBe(7);
});
test('Returns -3 when substracting 5 from 2', () => {
  expect(calculate('-', 2, 5)).toBe(-3);
});
test('Returns 10 when multiplying 2 times 5', () => {
  expect(calculate('*', 2, 5)).toBe(10);
});
test('Returns 0.4 when dividing 2 by 5', () => {
  expect(calculate('/', 2, 5)).toBe(0.4);
});
test('Returns secondNum when the operator is =', () => {
  expect(calculate('=', 2, 5)).toBe(5);
});
