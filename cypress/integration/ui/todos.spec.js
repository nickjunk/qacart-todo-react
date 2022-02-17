/// <reference types="Cypress" />

describe("Todo UI Testing", () => {
    beforeEach("Visit Site", () => {
        cy.log("Starting test");
        cy.visit("/");
    })
    it.only("Should add a new todo", () => {
        const text = "Last Todo";
        cy.get("h4").should("have.text", "There are no todos available");
        cy.intercept("POST", "http://localhost:8000/todos").as("postRequest");
        cy.addToDo(text);
        cy.wait("@postRequest").then(xhr => {
            expect(xhr.request.body.name).to.eq(text);
        })
        cy.get("li.todo-item").last().should("contain.text", text);
    })
    it("Should be able to toggle status of Todo", () => {
        const text = "New Todo";
        cy.addToDo(text);
        cy.get("input.todo-checkbox").last().as("newCompleted").check();
        cy.get(".success").should("be.visible");
        cy.get("@newCompleted").should("be.checked");
        cy.get("@newCompleted").uncheck().should("not.be.checked")
    })
    it("Should delete a todo", () => {
        const text = "To Delete Todo";
        cy.addToDo(text);
        cy.get("span.delete-item a").last().click();
    })
    it("Should not add an empty todo", () => {
        const text = "";
        cy.addToDo(text);
        cy.get(".error").should("have.text", "Please supply a todo item!");
    })
    afterEach("Delete Todos", () => {
        cy.get("body").then($el => {
            if($el.find("span.delete-item a").length>0) {
                cy.get("span.delete-item a").click({multiple: true});
            }
        })
    })
})