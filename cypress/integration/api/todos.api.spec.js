/// <reference types="Cypress" />

describe("Test All Todos with API", () => {
    let id;
    it("Adds a todo via API", () => {
        const options = {
            method: "POST",
            url: "http://localhost:8000/todos",
            body: {
                    "name": "First Todo",
                    "isComplete": false
                }
        }
        cy.request(options).then(response => {
            id = response.body.id;
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq("First Todo");
        })
    })
    it("Should get todo with id", () => {
        const options = {
            method: "GET",
            url: "http://localhost:8000/todos/"+id
        }
        cy.request(options).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq("First Todo");
        })
    })
    it("Should update todo", () => {
        const options = {
            method: "PUT",
            url: "http://localhost:8000/todos/"+id,
            body: {
                    "name": "First Todo",
                    "isComplete": true
                }
        }
        cy.request(options).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.isComplete).to.eq(true);
        })
    })
    it("Should delete todo", () => {
        const options = {
            method: "DELETE",
            url: "http://localhost:8000/todos/"+id
        }
        cy.request(options).then(response => {
            expect(response.status).to.eq(200);
        })
    })
})