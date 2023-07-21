import logInForm from "./../Form/logInForm.vue";

describe("Log In Selectors", () => {
  // NavBar
  const unloggedNavSelector = '[data-cy="unlogged-nav"]';
  const loggedNavSelector = '[data-cy="logged-nav"]';

  // Form
  const formSelector = '[data-cy="form"]';
  const emailInputSelector = '[data-cy="email"]';
  const emailErrorSelector = '[data-cy="email-error"]';
  const passwordInputSelector = '[data-cy="password"]';
  const passwordErrorSelector = '[data-cy="password-error"]';
  const forgottenPasswordLinkSelector = '[data-cy="forgotten-password"]';
  const getStore = () => cy.window().its("app.$store");
});

it("Has validation attr", () => {
  cy.mount(logInForm);
  cy.get(emailInputSelector).should("have.attr", "data-validation", "required");
  cy.get(passwordInputSelector).should(
    "have.attr",
    "data-validation",
    "required"
  );
});

it("Has errors with wrong values", () => {
  cy.mount(logInForm);
  cy.get(formSelector).submit();
  cy.get(emailErrorSelector).should("contain", "Adresse email requise");
  cy.get(passwordErrorSelector).should("contain", "Mot de passe requis");
  cy.get(formSelector).clear();
  cy.get(emailInputSelector).type("mmboudot");
  cy.get(formSelector).submit();
  cy.get(emailErrorSelector).should("contain", "Adresse email non valide");
  cy.get(formSelector).clear();
  cy.get(passwordInputSelector).type("a");
  cy.get(formSelector).submit();
  cy.get(passwordErrorSelector).should("contain", "Minimum 8 caractéres");
  cy.get(formSelector).clear();
});

it("Can log in", () => {
  cy.mount(logInForm);
  cy.get(unloggedNavSelector).should("be.visible");
  cy.get(loggedNavSelector).should("not.be.visible");
  cy.get(emailInputSelector).type("mmboudot@gmail.com");
  cy.get(passwordInputSelector).type("azertyui");
  cy.get(formSelector).submit();

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
  cy.get(unloggedNavSelector).should("not.be.visible");
  cy.get(loggedNavSelector).should("be.visible");
  getStore().its("state").should("deep.equal", {
    authenticated: false,
  });
});

it("Can click on forgotten password link", () => {
  cy.mount(logInForm);
  cy.get(forgottenPasswordLinkSelector).click();
  cy.url().should("include", "/reset-password");
});
