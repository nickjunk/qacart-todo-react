/// <reference types="Cypress" />

describe("Filter functionality test cases", () => {
    before("Add todos", () => {
        cy.addDummyToDos();
        cy.visit("/");
    })
    it("Should filter completed todos", () => {
        cy.contains("Complete").click();
        cy.url().should("contain", "/complete");
        cy.get(".todo-checkbox").each($el => {
            cy.wrap($el).should("be.checked");
        })
    })
    it("Should filter active todos", () => {
        cy.contains("Active").click();
        cy.url().should("contain", "/active");
        cy.get(".todo-checkbox").each($el => {
            cy.wrap($el).should("not.be.checked");
        })
    })
    after("Delete Todos", () => {
        cy.contains("All").click();
        cy.get("body").then($el => {
            if($el.find(".delete-item").length>0) {
                cy.get(".delete-item").click({multiple: true});
            }
        })
    })
})