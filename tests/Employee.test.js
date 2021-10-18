const Employee = require("../lib/Employee");

describe("Employee", () => {

    it("An object will be created", () => {
        const employee = new Employee();
        expect(typeof(employee)).toBe("object");
    });

    describe("getName", () => {
        it("Test value should return the name", () => {
            const testValue = "John";
            const employee = new Employee(testValue);
            expect(employee.getName()).toBe(testValue);
        });
    });
        
    describe("getId", () => {
        it("Test value should return the id", () => {
            const testValue = 100;
            const employee = new Employee("Dustin", testValue);
            expect(employee.getId()).toBe(testValue);
        });
    });
        
    describe("getEmail", () => {
        it("Test value should return the email", () => {
            const testValue = "test@email.com";
            const employee = new Employee("Dustin", 1, testValue);
            expect(employee.getEmail()).toBe(testValue);
        });
    });
        
    describe("getRole", () => {
        it("Test value should return the role", () => {
            const testValue = "Employee";
            const employee = new Employee("John", 1, "test@email.com");
            expect(employee.getRole()).toBe(testValue);
        });
    });
    
});