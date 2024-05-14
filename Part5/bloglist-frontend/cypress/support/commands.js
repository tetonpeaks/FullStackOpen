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

const clientUrl = "http://localhost:3000"
const serverUrl = "http://localhost:3001"

Cypress.Commands.add("login", ({ username, pw }) => {
    // .then method accesses the response from the request (a promise)
    cy.request("POST", `${serverUrl}/api/login`, { username: username, pw: pw })
        .then(({ body }) => {
            localStorage.setItem("validUser", JSON.stringify(body))})
    cy.visit(`${clientUrl}`)
    // no different than above in which the login form needs to be populated
})

// notice diffence with JSON.stringify and JSON.parse methods to access or write to client

// The command expects the user to be logged in and the user's details to be saved to localStorage.
Cypress.Commands.add("createPost", ({ title, author, url }) => {
    cy.request({
        url: `${serverUrl}/api/blogs`,
        method: "POST",
        body: { title, author, url },
        headers: { "Authorization": `bearer ${JSON.parse(localStorage.getItem("validUser")).token}` }
    })

    cy.visit(`${clientUrl}`)
})

Cypress.Commands.add("getPost", () => {
    cy.request({
        url: `${serverUrl}/api/blogs`,
        method: "POST",
        headers: { "Authorization": `bearer ${JSON.parse(localStorage.getItem("validUser")).token}` }
    })
})