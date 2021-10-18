const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateTeamPage = require('./src/templates')

const inquirer = require("inquirer");
const fs = require("fs");

const team = [];

function startFile() {
    newTeamMember();
}

function newTeamMember() {
    inquirer.prompt([{
        message: "What is your team member's name?",
        name: "name"
    },
    {
        type: "list",
        message: "What is the team member's position?",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "What is the team member's email address?",
        name: "email"
    },
    {
        message: "What is the team member's ID?",
        name: "id"
    }])
    .then(function({name, role, id, email}) {
        let positionSpecifics = "";
        if (role === "Manager") {
            positionSpecifics = "Office phone number";
        } else if (role === "Engineer") {
            positionSpecifics = "GitHub username";
        } else {
            positionSpecifics = "School name";
        }
        inquirer.prompt([{
            message: `Enter team member's ${positionSpecifics}`,
            name: "positionSpecifics"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "additionalMembers"
        }])
        .then(function({positionSpecifics, additionalMembers}) {
            let additionalMember;
            if (role === "Manager") {
                additionalMember = new Manager(name, id, email, positionSpecifics);
            } else if (role === "Engineer") {
                additionalMember = new Engineer(name, id, email, positionSpecifics);
            } else {
                additionalMember = new Intern(name, id, email, positionSpecifics);
            }
            employees.push(additionalMember);
            addHtml(additionalMember)
            .then(function() {
                if (additionalMembers === "yes") {
                    newTeamMember();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}