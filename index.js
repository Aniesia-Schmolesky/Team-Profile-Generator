const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateTeamPage = require('./src/templates')

const inquirer = require("inquirer");
const fs = require("fs");

const team = [];

function startFile() {
    beginHtml();
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
            team.push(additionalMember);
            addToHtml(additionalMember)
            .then(function() {
                if (additionalMembers === "yes") {
                    newTeamMember();
                } else {
                    completeHtml();
                }
            });
            
        });
    });
}

function beginHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>My Team</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">My Team</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("begin");
}

function addToHtml(teamMember) {
    return new Promise(function(resolve, reject) {
        const name = teamMember.getName();
        const role = teamMember.getRole();
        const id = teamMember.getId();
        const email = teamMember.getEmail();
        let data = "";
        if (role === "Manager") {
            const officePhone = teamMember.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Engineer") {
            const gitHub = teamMember.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const school = teamMember.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("team member added");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });  
}

function completeHtml() {
    const html = ` </div>
    </div>
    
    </body>
    </html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

startFile();