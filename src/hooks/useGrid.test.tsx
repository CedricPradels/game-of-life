import useGrid from "./useGrid";

test("Use grid exist and is a function", () => {
  expect(typeof useGrid).toBe("function");
});

test("Return an array", () => {
  expect(Array.isArray(useGrid())).toBe(true);
});
