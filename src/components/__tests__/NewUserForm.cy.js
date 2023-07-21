import newUserForm from "./../Form/newUserForm.vue";

describe("Sign Up Selectors", () => {
  // NavBar
  const unloggedNavSelector = '[data-cy="unlogged-nav"]';
  const loggedNavSelector = '[data-cy="logged-nav"]';
  
  // Form
  const formSelector = '[data-cy="form"]';
  const emailInputSelector = '[data-cy="email"]';
  const emailErrorSelector = '[data-cy="email-error"]';
  const passwordInputSelector = '[data-cy="password"]';
  const passwordErrorSelector = '[data-cy="password-error"]';
  const passwordConfirmInputSelector = '[data-cy="passwordConfirm"]';
  const passwordConfirmErrorSelector = '[data-cy="password-error"]';
  const getStore = () => cy.window().its("app.$store");
});

it("Has validation attr", () => {
  cy.mount(newUserForm);
  cy.get(emailInputSelector).should("have.attr", "data-validation", "required");
  cy.get(passwordInputSelector).should("have.attr", "data-validation", "required");
  cy.get(passwordConfirmInputSelector).should("have.attr", "data-validation", "required");
});

it("Has errors with wrong values on inputs", () => {
  cy.mount(newUserForm);
  cy.get(formSelector).submit();
  cy.get(emailErrorSelector).should("contain", "Adresse email requise");
  cy.get(passwordErrorSelector).should("contain", "Mot de passe requis");
  cy.get(passwordConfirmErrorSelector).should("contain", "Mot de passe requis");
  cy.get(formSelector).clear()
  cy.get(emailInputSelector).type("mm");
  cy.get(formSelector).submit();
  cy.get(emailErrorSelector).should("contain", "Adresse email non valide");
  cy.get(formSelector).clear();
  cy.get(passwordInputSelector).type("a");
  cy.get(formSelector).submit();
  cy.get(passwordErrorSelector).should("contain", "Minimum 8 caractéres");
  cy.get(formSelector).clear();
  cy.get(passwordConfirmInputSelector).type("a");
  cy.get(formSelector).submit();
  cy.get(passwordErrorSelector).should("contain", "Minimum 8 caractéres");
  cy.get(formSelector).clear();
  cy.get(passwordInputSelector).type("a");
  cy.get(passwordConfirmInputSelector).type("b");
  cy.get(formSelector).submit();
  cy.get(passwordErrorSelector).should("contain", "Les mots de passe ne correspondent pas");
  cy.get(passwordConfirmErrorSelector).should("contain", "Les mots de passe ne correspondent pas");
  cy.get(formSelector).clear();
});

it("Can sign up", () => {
  cy.mount(newUserForm);
  cy.get(unloggedNavSelector).should("be.visible");
  cy.get(loggedNavSelector).should("not.be.visible");
  cy.get(emailInputSelector).type("cypress@test.com");
  cy.get(passwordInputSelector).type("azertyui");
  cy.get(passwordConfirmInputSelector).type("azertyui");
  cy.get(formSelector).submit();
    // Check API request
    cy.intercept('POST', 'http://localhost:3000/api/auth/sign-up', (req) => {
      req.reply({
        statusCode: 200,
      })
    })
    // cy.intercept('POST', 'http://localhost:3000/api/auth/sign-up', {
    //   statusCode: 200,
    //   body: {
    //     name: 'Peter Pan',
    //   },
    // })
  cy.url().should("include", "/login");
});