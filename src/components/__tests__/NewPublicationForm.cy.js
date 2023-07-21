import NewPublicationForm from "./../Form/NewPublicationForm.vue";

describe("New Publications Selectors", () => {
  // NavBar
  const unloggedNavSelector = '[data-cy="unlogged-nav"]';
  const loggedNavSelector = '[data-cy="logged-nav"]';

  // Form
  const formSelector = '[data-cy="form"]';
  const titleInputSelector = '[data-cy="title"]';
  const titleErrorSelector = '[data-cy="title-error"]';
  const fileSelector = '[data-cy="file"]';
  const fileErrorSelector = '[data-cy="file-error"]';
  const getStore = () => cy.window().its("app.$store");
});

it("Has validation attr", () => {
  cy.mount(NewPublicationForm);
  cy.get(titleInputSelector).should("have.attr", "data-validation", "required");
  cy.get(fileSelector).should(
    "have.attr",
    "data-validation",
    "required"
  );
});

it("Has errors with wrong values", () => {
  cy.mount(NewPublicationForm);
  cy.get(formSelector).submit();
  cy.get(titleInputSelector).should("contain", "Titre requis");
  cy.get(fileSelector).should("contain", "Image requise");
  cy.get(formSelector).clear();
});

it("Add a new publication", () => {
  cy.mount(NewPublicationForm);
  cy.get(titleInputSelector).type("salut");
  cy.get(fileSelector).type();
  cy.get(formSelector).submit();
  cy.intercept("POST", `${Cypress.env("http://localhost:3000/api")}/auth/sign-in`).as(
    "getUserModel"
  );
  cy.loginAPI();
  cy.wait("@getUserModel");

  // Check API request
  cy.intercept('POST', 'http://localhost:3000/api/auth/sign-in', (req) => {
    req.reply({
      statusCode: 201,
    })
  })
  // cy.intercept('POST', 'http://localhost:3000/api/auth/sign-in', {
  //   statusCode: 201,
  //   body: {
  //     name: 'Peter Pan',
  //   },
  // })

  // Check auth
  cy.url().should("include", "/");
  getStore().its("state").should("deep.equal", {
    authenticated: true,
  });

});