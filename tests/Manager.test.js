const Manager = require("../lib/Manager");

test("Return office number to equal the tested value", () => {
  const testValue = "officeNumber";
  const employee = new Manager("Dustin", 1, "test@email.com", testValue);
  expect(employee.officeNumber).toBe(testValue);
});

test("Manager should be returned from getRole", () => {
  const testValue = "Manager";
  const employee = new Manager("Dustin", 1, "test@email.com");
  expect(employee.getRole()).toBe(testValue);
});