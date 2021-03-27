// Connets to HTML
const fs = require("fs");
const inquirer = require('inquirer')
const employeesArray = []

// Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return `Employee`;
  }
}

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return `Manager`;
  }
}

class Engineer extends Employee {
   constructor(name, id, email, github) {
     super(name, id, email);
     this.github = github;
   }
   getGithub() {
     return this.github;
   }
   getRole() {
     return `Engineer`;
   }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
      super(name, id, email);
      this.school = school;
    }
    getSchool() {
      return this.school;
    }
    getRole() {
      return `Intern`;
    }
}

// Make inquirer application
// Collect user input and process data

let questions = [
  {
    type: "input",
    name: "fullName",
    message: "What is your full name",
  },
  {
    type: "input",
    name: "id",
    message: "What is your user id.",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email",
  },
  {
    type: "input",
    name: "role",
    message: "What role are you applying for.",
  },
];
function teamQuestions (){
  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
    if (answers.role === "engineer") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "gitHub",
            message: "What is your git hub",
          },
          {
            type: "list",
            name: "newPerson",
            message: "Would you like to add another person?",
            choices: ['yes', 'no']
          },
        ])
        .then((response) => {
          console.log(JSON.stringify(answers, null, "  "));

          let engineer = new Engineer(
            answers.fullName,
            answers.id,
            answers.email,
            response.gitHub
          );
          employeesArray.push(engineer)
          // need special questions
          if (response.newPerson === "yes") {
            teamQuestions();
          } else {
            createHtml();
          }
        });
    } else if (answers.role === "manager") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "officeNumber",
            message: "What is your office number",
          },
          {
            type: "list",
            name: "newPerson",
            message: "Would you like to add another person?",
            choices: ['yes', 'no']
          },
        ])
        .then((response) => {
          console.log(JSON.stringify(answers, null, "  "));

          let manager = new Manager(
            answers.fullName,
            answers.id,
            answers.email,
            response.officeNumber
          );
          employeesArray.push(manager);
          // need special questions
          if (response.newPerson === "yes") {
            teamQuestions();
          } else {
            createHtml();
          }
        });
    } else if (answers.role === "intern") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "school",
            message: "What school did you go to?",
          },
          {
            type: "list",
            name: "newPerson",
            message: "Would you like to add another person?",
            choices: ['yes', 'no']
          },
        ])
        .then((response) => {
          console.log(JSON.stringify(answers, null, "  "));

          let intern = new Intern(
            answers.fullName,
            answers.id,
            answers.email,
            response.school
          );
          employeesArray.push(intern);
          // need special questions
          if (response.newPerson === 'yes'){
            teamQuestions()
          } else {
            createHtml()
          }
        });
    }
  });
}

function createHtml(){
  console.log(employeesArray)
}

teamQuestions()
// Generate html file with user input

