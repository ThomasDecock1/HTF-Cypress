// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('calculateAndFillInCure', () => {
    cy.getLocalStorage('cure').then((cure) => {
        cy.log(cure)
        cy.get("#current-reading").invoke("text").then((text) => {
            cy.log(text);
            const currentReading = text;
            const currentReadingSplit = (currentReading).split('');
            const cureSplit = (cure).split('');
            currentReadingSplit.forEach((number, index) => {
                const sum = cureSplit[index] - number
                if (sum <= 0) {
                    for (let x = 0; x < Math.abs(sum); x++) {
                        cy.wait(500)
                        cy.get(`:nth-child(${index + 1}) > .down > .material-symbols-outlined`)
                            .click({ force: true })
                    }
                }
                else {
                    for (let y = 0; y < Math.abs(sum); y++) {
                        cy.wait(500)
                        cy.get(`:nth-child(${index + 1}) > .container-up > .arrow > .material-symbols-outlined`)
                            .click({ force: true })
                    }
                }
            });
        });
    });
});