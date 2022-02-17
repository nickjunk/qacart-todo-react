/// <reference types="Cypress"/>

describe("Request Command Suite", () => {
    it("Get request", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8000/todos",
            qs: {"id": 1}
        }).then(response => {
            expect(response.status).to.be.eq(200);
            expect(response.duration).to.be.below(20000);
            expect(response.body[0].isComplete).to.be.true;
        });
    })
    it("Post request", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:8000/todos",
            body: {
        "name": "Stupid fucking To Do",
        "isComplete": true
    }
        }).then(response => {
            expect(response.status).to.be.eq(201);
            expect(response.duration).to.be.below(20000);
            expect(response.body.isComplete).to.be.true;
        });
    })
    it("Put request", () => {
        cy.request("PUT", "http://localhost:8000/todos/1", {"name" : "Study Cypress", "id" : 1, "isComplete" : false});
    })
    it.only("Delete request", () => {
        cy.request("DELETE", "http://localhost:8000/todos/4");
    })
    it("Secure request", () => {
        cy.request("POST", "http://localhost:8000/signup", {
            "email": "nicknn@email.com",
            "password": "123456",
            "firstname": "Nick",
            "lastname": "Not Nick",
            "age": 30
        }).then(response => {
            cy.request({
                method: "GET",
                url: "http://localhost:8000/courses",
                auth: {
                    bearer: response.body.accessToken
                }
            })
        });
    })
})