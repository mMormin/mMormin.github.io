describe("Log In Page", () => {
  // Nav bar
  const unloggedNavSelector = '[data-cy="unlogged-nav"]';
  const loggedNavSelector = '[data-cy="logged-nav"]';

  // Form
  const formSelector = '[data-cy="form"]';
  const emailInputSelector = '[data-cy="email"]';
  const emailErrorSelector = '[data-cy="email-error"]';
  const passwordInputSelector = '[data-cy="password"]';
  const passwordErrorSelector = '[data-cy="password-error"]';
  const forgottenPasswordLinkSelector = '[data-cy="forgotten-password"]';
  const logOutButtonSelector = '[data-cy="log-out"]';
});

it("Has access to the page and displays all the datas", () => {
  cy.visit("/login");
  cy.get(loggedNavSelector).should("not.be.visible");
  cy.get(unloggedNavSelector).should("be.visible");
  cy.get(emailInputSelector).should("not.have.value");
  cy.get(passwordErrorSelector).should("not.have.value");
});

it("Logs in", () => {
  cy.visit("/login");
  cy.get(unloggedNavSelector).should("be.visible");
  cy.get(loggedNavSelector).should("not.be.visible");
  cy.get(emailInputSelector).type("mmboudot@gmail.com");
  cy.get(passwordInputSelector).type("azertyui");
  cy.get(formSelector).submit();

  // Check API request
  cy.intercept("POST", "http://localhost:3000/api/auth/sign-in", (req) => {
    req.reply({
      statusCode: 201,
    });
  });
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
  cy.get(logOutButtonSelector).click();
  cy.get(unloggedNavSelector).should("be.visible");
  cy.get(loggedNavSelector).should("not.be.visible");
});

it("Redirects if logged in", () => {
  cy.loginAPI();
  cy.visit("/login");
  cy.url().should("include", "/");
});
