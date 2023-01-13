/// <reference types="Cypress" />

// used to create unique ids
const { v4: uuid4 } = require("uuid");

describe("payment", () => {
  it("user can make payments", () => {
    //  login
    cy.visit("localhost:3000");
    //cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/username/i).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByLabelText(/remember/i).check();
    cy.findByRole("button", { name: /sign/i }).click();

    // check account balance
    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]')
      .then(($balance) => (oldBalance = $balance.text()))
      .then((balance) => console.log(balance));

    // click on new button
    cy.findByRole("button", { name: /new/i }).click();

    // search for user
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    // add amount and note and click pay
    const paymentAmount = "5.00";
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    const note = uuid4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    // return to transactions
    cy.findByRole("button", { name: /return to transactions/i }).click();

    // go to personal payments
    cy.findByRole("tab", { name: /mine/i }).click();

    // click on payment
    cy.findByText(note).click({ force: true });

    // verify if payment was made
    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    // verify if payment amount was deducted
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const convertedOldBalance = oldBalance.replace(/$|,/g, "");
      const convertedNewBalance = $balance.text().replace(/$|,/g, "");
    });
  });
});
