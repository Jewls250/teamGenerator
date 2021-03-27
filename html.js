function generateEmployee(data) {
  return `
  <div class="card text-left">
  <img class="card-img-top" src="holder.js/100px180/" alt="">
  <div class="card-body">
    <h4 class="card-title">${data.fullName}</h4>
    <h4 class="card-title">${data.role}</h4>
    <p class="card-text">${data.id}</p>
    <p class="card-text">${data.email}</p>
  </div>
</div>
  
  
  ${data.howToUsApplication}
  ${data.contribu}
  ${data.license}
`;
}

module.exports = generateMarkdown;

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