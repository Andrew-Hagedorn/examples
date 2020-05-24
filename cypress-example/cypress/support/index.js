// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************
Cypress.Commands.add('getByDataTest', attr => 
    cy.get(`[data-test='${attr}']`)
);