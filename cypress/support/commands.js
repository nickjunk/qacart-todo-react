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
Cypress.Commands.add("addToDo", text => {
    cy.get("input.todo-input").type(text+"{enter}");
    if(text) {
        cy.get(".success").should("be.visible");
    } else {
        cy.get(".error").should("be.visible");
    }
    
})

Cypress.Commands.add("addDummyToDos", () => {
    const todosData = [
        {
            "name": "First Todo",
            "isComplete": false
        },
        {
            "name": "Second Todo",
            "isComplete": true
        },
        {
            "name": "Third Todo",
            "isComplete": false
        },
        {
            "name": "Fourh Todo",
            "isComplete": true
        },
        {
            "name": "Fifth Todo",
            "isComplete": true
        }
    ].forEach(todoBody => {
        const options = {
            method: "POST",
            url: "http://localhost:8000/todos",
            body: todoBody
        }
        cy.request(options);
    })
})
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
