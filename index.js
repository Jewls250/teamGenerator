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
    type: "list",
    name: "role",
    message: "What role are you applying for.",
    choices: [
      "Manager",
      "Engineer",
      "Intern"
    ]
  },
];

function teamQuestions (){
  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
    if (answers.role === "Engineer") {
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
    } else if (answers.role === "Manager") {
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
    } else if (answers.role === "Intern") {
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
  // console.log(employeesArray)
  let htmlString = `
    <!doctype html>
<html lang="en">
  <head>
    <title>Team Profile</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body class="text-center">
    <header>
      <h1 class="p-5">
        <u>The A Team</u>
      </h1>
    </header>
      <div class="container p-4">
        
  `; ;
  for(i = 0; i < employeesArray.length; i++){
    if (employeesArray[i].github){
      htmlString += `
      <div class="card" id="card">
        <p>Full Name: ${employeesArray[i].name} </p>
        <p>ID: ${employeesArray[i].id} </p>
        <p>Email: ${employeesArray[i].email} </p>
        <p>Github: ${employeesArray[i].github} </p>
      </div>
      
`;
  }
    else if (employeesArray[i].officeNumber){
       htmlString += `
      <div class="card" id="card">
        <p>Full Name ${employeesArray[i].name} </p>
        <p>ID: ${employeesArray[i].id} </p>
        <p>Email: ${employeesArray[i].email} </p>
        <p>Office Number: ${employeesArray[i].officeNumber} </p>
      </div>
      
`;
    }  else if (employeesArray[i].school){
       htmlString += `
      <div class="card" id="card">
        <p>Full name: ${employeesArray[i].name} </p>
        <p>ID: ${employeesArray[i].id} </p>
        <p>Email: ${employeesArray[i].email} </p>
        <p>University ${employeesArray[i].school} </p>
      </div>

`;
  }
}
htmlString += ` 
</div>
<footer>
  <h3 class="p-4">&copy; Giuliano Serawop | 2021</h3>
</footer>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>
`;
    fs.writeFile("index2.html", htmlString, (err) => {
      if (err) throw err;
      
    console.log("The file has been saved!");
   });
}

teamQuestions();
