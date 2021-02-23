// Connets to HTML
const fs = require("fs");
const InputPrompt = require("inquirer/lib/prompts/input");

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

class Manager extends Employee() {
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

class Engineer extends Employee() {
  //   constructor(name, id, email, officeNumber) {
  //     super(name, id, email);
  //     this.officeNumber = officeNumber;
  //   }
  //   getOfficeNumber() {
  //     return this.officeNumber;
  //   }
  //   getRole() {
  //     return `Manager`;
  //   }
}

class Intern extends Employee() {
  //   constructor(name, id, email, officeNumber) {
  //     super(name, id, email);
  //     this.officeNumber = officeNumber;
  //   }
  //   getOfficeNumber() {
  //     return this.officeNumber;
  //   }
  //   getRole() {
  //     return `Manager`;
  //   }
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

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));
  if (answers.role === "engineer") {
    inquirer.prompt().then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));

      let engineer = new Engineer(answers.name, answers.id, answers.email);
      // need special questions

    });
  } else if (answers.role === "manager") {
    inquirer.prompt().then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));

      let manager = new Manager(answers.name, answers.id, answers.email);
      // need special questions

    });
  } else if (answers.role === "intern") {
    inquirer.prompt().then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));

      let intern = new Intern(answers.name, answers.id, answers.email);
      // need special questions

    });
  }
});

// Generate html file with user input
