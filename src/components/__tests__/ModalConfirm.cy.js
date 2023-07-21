import ModalConfirm from "./../Global/ModalConfirm.vue";

describe("Modal Selectors", () => {
  const modalSelector = '[data-cy="modal"]';
  const modalBackdropSelector = '[data-cy="modal-backdrop"]';
  const openButtonSelector = '[data-cy="open-modal"]';
  const closeButtonSelector = '[data-cy="close-modal"]';
});

it("Can opens and closes with good styles", () => {
  cy.mount(ModalConfirm);
  cy.get(modalSelector).should("not.be.visible");
  cy.get(modalBackdropSelector).should("not.be.visible");
  cy.get(openButtonSelector).click();
  cy.get(modalSelector).should("be.visible");
  cy.get(modalBackdropSelector).should(
    "have.css",
    "background-color",
    "rgb(0, 0, 0, 0.3)"
  );
  cy.get(closeButtonSelector).click();
  cy.get(modalSelector).should("not.be.visible");
  cy.get(modalBackdropSelector).should("not.be.visible");
});

it("Can closes with the good prop", () => {
  const closeSpy = cy.spy().as("close");
  cy.mount(ModalConfirm, { props: { isActive: closeSpy } });
  cy.get(openButtonSelector).click();
  cy.get(closeButtonSelector).click();
  cy.get("@closeSpy").should("have.been.called");
});

it("Has default and slots values", () => {
  const slots = {
    header: () => "Some default Title",
    body: () => "Some extra text for the Body",
    footer: () => "And the final for the Footer",
  };
  cy.mount(ModalConfirm, { slots });
  cy.get(openButtonSelector).click();
  cy.get("[data-cy='header-slot']")
    .should("not.have.text", "This is the head")
    .and("have.text", "Some default Title");
  cy.get("[data-cy='body-slot']")
    .should("not.have.text", "This is the body")
    .and("have.text", "Some extra text for the Body");
  cy.get("[data-cy='footer-slot']")
    .should("not.have.text", "This is the footer")
    .and("have.text", "And the final for the Footer");
});
