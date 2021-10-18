const Intern = require("../lib/Intern");

test("Return school to equal the tested value", () => {
  const testValue = "school";
  const employee = new Intern("Dustin", 1, "test@email.com", testValue);
  expect(employee.school).toBe(testValue);
});

test("Intern should be returned from getRole", () => {
  const testValue = "Intern";
  const employee = new Intern("Dustin", 1, "test@email.com");
  expect(employee.getRole()).toBe(testValue);
});