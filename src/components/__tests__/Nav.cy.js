import Nav from "./../Global/Nav.vue";

describe("Nav Bar Selectors", () => {
  const navSelector = '[data-cy="nav"]';
  const getStore = () => cy.window().its("app.$store");
  // Unlogged
  const unloggedNavSelector = '[data-cy="unlogged-nav"]';
  const signUpSelector = '[data-cy="sign-up"]';
  const signInSelector = '[data-cy="sign-in"]';
  // Logged
  const loggedNavSelector = '[data-cy="logged-nav"]';
  const addPublicationLinkSelector = '[data-cy="add-publication"]';
  const profilPublicationsLinkSelector = '[data-cy="profil-publications"]';
  const profilLinkSelector = '[data-cy="profil"]';
  const logOutButtonSelector = '[data-cy="log-out"]';
});

it("Has validation attr when not logged in", () => {
  cy.mount(Nav);
  cy.get(signUpSelector).should("have.attr", "href", '/signup');
  cy.get(signInSelector).should("have.attr", "href", '/login');
});

it("Shows the good data when not logged in and clicks on all the links", () => {
  cy.mount(Nav);
  cy.get(navSelector).should("be.visible");
  cy.get(unloggedNavSelector).should("be.visible");
  cy.get(loggedNavSelector).should("not.be.visible");
  cy.get(signUpSelector).click();
  cy.url().should("include", "/signup");
  cy.get(signInSelector).click();
  cy.url().should("include", "/login");
});

it("Has validation attr when logged in", () => {
  cy.mount(Nav);
  cy.loginAPI();
  cy.get(addPublicationLinkSelector).should("have.attr", "href", '/nouvelle-publication');
  cy.get(profilPublicationsLinkSelector).should("have.attr", "href", '/profil-publications');
  cy.get(profilLinkSelector).should("have.attr", "href", '/profil');
  cy.get(logOutButtonSelector).should("have.attr", "href", '/');
});

it("Changes the display when logged in", () => {
  cy.mount(Nav);
  cy.get(navSelector).should("be.visible");
  cy.loginAPI();
  // Cypress.Commands.add("login", (user) => {
  //   cy.session(
  //     user,
  //     () => {
  //       cy.visit("/login");
  //       cy.get(emailInputSelector).type(user.email);
  //       cy.get(passwordInputSelector).type(user.password);
  //       cy.get(formSelector).submit();
  //       cy.get(loggedNavSelector).contains(user.email);
  //     },
  //     {
  //       validate: () => {
  //         getStore().its("state").should("deep.equal", {
  //           authenticated: true,
  //         });
  //         // ou getStore().its('state.authenticated').should('equal', true)
  //       },
  //     }
  //   );
  // });
  // cy.login({ email: "mmboudot@gmail.com", password: "azertyui" });
  cy.get(loggedNavSelector).should("be.visible");
  cy.get(unloggedNavSelector).should("not.be.visible");
  cy.get(logOutButtonSelector).click();
  cy.get(loggedNavSelector).should("not.be.visible");
  cy.get(unloggedNavSelector).should("be.visible");
});

it("Clicks on all the links when logged in", () => {
  cy.mount(Nav);
  cy.loginAPI();

  // Check API request
  cy.intercept("POST", "http://localhost:3000/api/auth/sign-in", (req) => {
    req.reply({
      statusCode: 201,
    });
  });

  cy.get(addPublicationLinkSelector).click();
  cy.url().should("include", "/nouvelle-publication");
  cy.get(profilPublicationsLinkSelector).click();
  cy.url().should("include", "/profil-publications");
  cy.get(profilLinkSelector).click();
  cy.url().should("include", "/profil");
  cy.get(logOutButtonSelector).click();
  cy.url().should("include", "/");
});
