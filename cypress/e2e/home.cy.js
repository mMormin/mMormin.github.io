describe("Home Page", () => {
  // Nav bar
  const unloggedNavSelector = '[data-cy="unlogged-nav"]';
  const loggedNavSelector = '[data-cy="logged-nav"]';

  const emptyPublicationSelector = '[data-cy="empty-publication"]';
  const newPublicationButtonSelector = '[data-cy="new-publication"]';
  const getStore = () => cy.window().its("app.$store");
});

it("Visits the home page while unlogged", () => {
  cy.visit("/");
  cy.get(loggedNavSelector).should("not.be.visible");
  cy.get(unloggedNavSelector).should("be.visible");
  cy.get(emptyPublicationSelector)
    .contains(newPublicationButtonSelector)
    .should("not.be.visible");
});

it("Visits the home page while logged", () => {
  cy.loginAPI();
  cy.intercept("POST", "http://localhost:3000/api/auth/sign-up", (req) => {
    req.reply({
      statusCode: 201,
    });
  });
  getStore().its("state").should("deep.equal", {
    authenticated: true,
  });
  cy.visit("/");
  cy.get(loggedNavSelector).should("be.visible");
  cy.get(unloggedNavSelector).should("not.be.visible");
  cy.get(emptyPublicationSelector)
    .contains(newPublicationButtonSelector)
    .should("be.visible");
  cy.get(newPublicationButtonSelector).click();
  cy.url().should("include", "/nouvelle-publication");
});
