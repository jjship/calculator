import { calculate } from './calculate';
test('Should act the same as eval', () => {
  expect(calculate('+', 2, 5)).toBe(7);
});
