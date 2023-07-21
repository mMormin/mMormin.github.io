Cypress.Commands.add(
  "loginAPI",
  (
    email = Cypress.env("mmboudot@gmail.com"),
    password = Cypress.env("azertyui")
  ) => {
    cy.request("POST", `${Cypress.env("http://localhost:3000/api")}/users/login`, {
      email,
      password,
    }).then((response) => {
        window.localStorage.setItem('token', resp.data)
        expect(response.headers).to.have.property('Authorization')
        cy.visit("/");
    });
  }
);