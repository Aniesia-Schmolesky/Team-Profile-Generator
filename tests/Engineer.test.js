const Engineer = require("../lib/Engineer");

test("Return GitHub username to equal the tested value", () => {
  const testValue = "GitHub username";
  const employee = new Engineer("Dustin", 1, "test@email.com", testValue);
  expect(employee.github).toBe(testValue);
});

test("Engineer should be returned from getRole", () => {
  const testValue = "Engineer";
  const employee = new Engineer("Dustin", 1, "test@email.com");
  expect(employee.getRole()).toBe(testValue);
});