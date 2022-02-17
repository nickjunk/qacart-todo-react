/// <reference types="Cypress" />

describe("Filter functionality test cases", () => {
    before("Add todos", () => {
        const matcher = {
            method: "GET",
            url: "http://localhost:8000/todos"
        }
        const handler = {
            fixture: "todos"
        }
        cy.intercept(matcher, handler);
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
})