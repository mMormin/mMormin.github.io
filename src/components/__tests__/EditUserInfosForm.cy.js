import EditUserInfosForm from "./../Form/EditUserInfosForm.vue";

describe("New Publications Selectors", () => {
  // NavBar
  const unloggedNavSelector = '[data-cy="unlogged-nav"]';
  const loggedNavSelector = '[data-cy="logged-nav"]';

  // Form
  const formSelector = '[data-cy="form"]';
  const passwordFormSelector = '[data-cy="password-form"]';
  const emailInputSelector = '[data-cy="email"]';
  const passwordSelector = '[data-cy="password"]';
  const oldPasswordSelector = '[data-cy="old-password"]';
  const newPasswordSelector = '[data-cy="new-password"]';
  const newPasswordConfirmSelector = '[data-cy="new-password-confirm"]';
  const pseudoSelector = '[data-cy="pseudo"]';
  const nameSelector = '[data-cy="name"]';
  const lastNameSelector = '[data-cy="last-name"]';
  const bioSelector = '[data-cy="bio"]';
  const modalPasswordSelector = '[data-cy="modal-password"]';
  const editButtonSelector = '[data-cy="edit"]';
  const editPasswordButtonSelector = '[data-cy="edit-password"]';
  const deleteButtonSelector = '[data-cy="delete"]';
  const saveButtonSelector = '[data-cy="save"]';
  const getStore = () => cy.window().its("app.$store");
});

it("Shows and has default values", () => {
  cy.mount(EditUserInfosForm);
  cy.loginAPI();
  cy.intercept(
    "POST",
    `${Cypress.env("http://localhost:3000/api")}/auth/sign-in`
  ).as("getUserModel");
  cy.wait("@getUserModel");

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
  getStore().its("state").should("deep.equal", {
    authenticated: true,
  });
  cy.get(emailInputSelector).should("not.be.empty");
  cy.get(passwordSelector).should("not.be.empty");
  cy.click(editButtonSelector);
  cy.click(editPasswordButtonSelector);
  cy.get(modalPasswordSelector).should("be.visible");
  cy.get(oldPasswordSelector).should("not.be.empty");
  cy.get(newPasswordSelector).should("be.empty");
  cy.get(newPasswordConfirmSelector).should("be.empty");
});

it("Can recieve and send user profile datas", () => {
  cy.mount(EditUserInfosForm);
  cy.loginAPI();
  cy.click(editButtonSelector);
  cy.get(nameSelector).type("Jean");
  cy.get(lastNameSelector).type("De La Tranche");
  cy.get(bioSelector).type("Voici ma bio hihi");
  cy.get(formSelector).submit();
  cy.intercept("POST", "http://localhost:3000/api/auth/profil/edit", (req) => {
    req.reply({
      statusCode: 201,
    });
  });
  cy.get(nameSelector).should("equal", "Jean");
  cy.get(lastNameSelector).should("equal", "De La Tranche");
  cy.get(bioSelector).should("equal", "Voici ma bio hihi");
});

it("Can recieve and change user password", () => {
  cy.mount(EditUserInfosForm);
  cy.loginAPI();
  cy.click(editButtonSelector);
  cy.click(editPasswordButtonSelector);
  cy.get(nameSelector).type("Jean");
  cy.get(lastNameSelector).type("De La Tranche");
  cy.get(bioSelector).type("Voici ma bio hihi");
  cy.get(formSelector).submit();
  cy.get(modalPasswordSelector).should("be.visible");
  cy.get(oldPasswordSelector).type("azertyold");
  cy.get(newPasswordSelector).type("azertynew");
  cy.get(newPasswordConfirmSelector).type("azertynew");
  cy.get(passwordFormSelector).submit();
  cy.intercept("POST", "http://localhost:3000/api/auth/profil/edit/password", (req) => {
    req.reply({
      statusCode: 200,
    });
  });
});