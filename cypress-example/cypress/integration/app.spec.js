describe('Basic Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('can open a modal and close it', () => {
        cy.getByDataTest('modal')
          .should('not.exist');

        cy.getByDataTest('open-button').click();

        cy.getByDataTest('modal')
          .should('exist');

        cy.getByDataTest('close-button').click();

        cy.getByDataTest('modal')
          .should('not.exist');
    });

    it('can navigate through the tabs', () => {
        cy.getByDataTest('second-page-link')
            .click();

        cy.getByDataTest('second-page')
            .should('exist');

        cy.getByDataTest('third-page-link')
            .click();

        cy.getByDataTest('third-page')
            .should('exist');

        cy.getByDataTest('first-page-link')
          .click();

        cy.getByDataTest('first-page')
          .should('exist');
    });
});
