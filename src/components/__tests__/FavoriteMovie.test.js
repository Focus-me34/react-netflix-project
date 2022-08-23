const sum = (x, y) => {
  return x + y;
};

test("Test the sum being returned by the sum method", () => {
  expect(sum(2, 3)).toBe(5);
});
