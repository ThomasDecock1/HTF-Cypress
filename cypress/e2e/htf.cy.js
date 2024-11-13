import { htf } from '../page_objects/htf'

describe('hack the future 2024', () => {
    it('first page', () => {
        cy.visit('https://hackthefuture.bignited.be/', { failOnStatusCode: false })
        cy.get(htf.title).first().contains('Hackathon 2024')
        cy.get(htf.actionButton).click()
        cy.get(htf.infoBox).contains('towards')
        cy.wait(10000)
        cy.get(htf.body).click();
        cy.get(htf.infoBox).should('be.visible')
        cy.get(htf.infoBox).should('contain', 'Before you start your mission we need a few details')
        cy.get(htf.body).click('center');
        cy.get(htf.flickeringText).should('be.visible')
        cy.get(htf.flickeringText).should('contain', 'Please fill in your entity information')
        cy.get(htf.name).type('John Doe')
        cy.get(htf.age).type('25')
        cy.get(htf.species).select('Human')
        cy.get(htf.planet).type('Earth')
        cy.get(htf.flickeringTextExtraInfo).should('be.visible')
        cy.get(htf.body).type('{enter}')
        cy.get(htf.infoBox).should('be.visible')
        cy.get(htf.infoBox).contains('You managed to find the signal')
        cy.get(htf.infoBox).contains('Wait...There\'s someone lying in the distance')
        cy.get(htf.infoBox).contains('What is that yellow paper?')
        cy.get(htf.image).should('be.visible')
        cy.get(htf.body).click(1700, 960)
        cy.get(htf.deadBody).should('be.visible')
        cy.get(htf.body).click()
        cy.get(htf.skipButton).click()
        cy.get(htf.numpad).should('be.visible')
        cy.get(htf.numpad).click()
        cy.wait(1000)
        cy.get(htf.numpadText).should('be.visible')
        cy.getLocalStorage('code').then((code) => {
            console.log(code)
            const digits = code.split('')
            digits.forEach((digit) => {
                cy.get("#" + digit).click()
                if (cy.get(htf.numpadText).should('be.visible') === false) {
                    cy.get(htf.numpad).click()
                }
            })
        })
        cy.get(htf.enterButton).click()
        cy.get(htf.continueLabel).should('contain', 'You wanna go inside? Into the dark...?')
        cy.get(htf.body).type('{uparrow}')
        cy.get(htf.infoBox).should('be.visible')
        cy.get(htf.infoBox).contains('It\'s a woman\'s voice?')
        cy.get(htf.yesButton).click({ force: true })
        cy.get(htf.extraYesButton).should('be.visible').click({ force: true })
        cy.get(htf.nextButton).click({ force: true })
        cy.get(htf.nextButton).click({ force: true })
        cy.get(htf.nextButton).click({ force: true })
        cy.get(htf.asteroid).click()
        cy.get('.scan-button').trigger('mousedown')
        cy.get('#continue').click()
        cy.calculateAndFillInCure()
        cy.get(htf.body).type('{enter}')
        // cy.get(htf.body).type('{enter}')
        // for (let i = 0; i < 21; i++) {
        //     cy.get('app-boss.ng-star-inserted > :nth-child(1)').click({ force: true })
        // }
        // cy.on('window:alert', (element) => {
        //     expect(element).to.be.visible
        //     expect(str).to.equal(`You defeated the boss!`)
        //     cy.wait(10000)
        // })
        function getElementPosition(selector) {
            return cy.get(selector).then($el => {
                const rect = $el[0].getBoundingClientRect();
                return { top: rect.top, left: rect.left };
            });
        }

        function movePlayerToBoss() {
            function checkPosition() {
                cy.get('body').then($body => {
                    const playerPosPromise = getElementPosition('.player');
                    const bossPosPromise = getElementPosition('.boss');

                    return Cypress.Promise.all([playerPosPromise, bossPosPromise]).then(([playerPos, bossPos]) => {
                        if ($body.find('.ng-star-inserted').length > 0) {
                            // Move player out of the way
                            cy.get('body').type('{leftarrow}');
                        } else {
                            // Move player to match boss position
                            if (playerPos.left < bossPos.left) {
                                cy.get('body').type('{rightarrow}');
                            } else if (playerPos.left > bossPos.left) {
                                cy.get('body').type('{leftarrow}');
                            }
                        }
                    });
                }).then(() => {
                    cy.wait(100).then(checkPosition); // Adjust the wait time as needed
                });
            }

            checkPosition();
        }

        // Start the player movement loop
        movePlayerToBoss();
    })
})