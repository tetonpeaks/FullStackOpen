const serverUrl = "http://localhost:3001"
const clientUrl = "http://localhost:3000"

const user = {
    username: "testUser",
    name: "Test User",
    pw: "test"
}

const post = [
    {
        title: "Post 1",
        author: "Test User",
        url: "www.Post1.com",
        likes: 0
    },
    {
        title: "Post 2",
        author: "Test User",
        url: "www.Post2.com",
        likes: 0
    },
    {
        title: "Post 3",
        author: "Test User",
        url: "www.Post 3.com",
        likes: 0
    },
]

const Nmax = 3

describe("Blog App", function() {
    beforeEach(function() {
        cy.request("POST", `${serverUrl}/api/testing/reset`)

        cy.request("POST", `${serverUrl}/api/users`, user) // create new user with POST request to /api/users
        cy.visit(`${clientUrl}`)
    })

    // check that the app displays the login for by default
    it("login information displayed by default", function() {
        cy.contains("Login").click()
    })

    describe("Login", function() {

        it("login fields are incorrectly populated + user login in unsuccessful", function() {
            cy.contains("Login").click()
            cy.get(".username").type(user.username)
            cy.get(".password").type(`${user.pw}5`)
            cy.get(".btn-login").click()

            cy.contains("Wrong credentials!")
            cy.get(".msg")
                .should("contain", "Wrong credentials!")
                .and("have.css", "color", "rgb(255, 255, 255)")

            // check that the app does not render the success message
            cy.get("html").should("not.contain", `${user.name} has logged in!`)
        })

        it("login fields are populated + user successfully logs on", function() {
            cy.contains("Login").click() // search for Login button click the Login button to view details

            cy.get(".username").type(user.username).wait(250)
            cy.get(".password").type(user.pw).wait(250)
            cy.get(".btn-login").click().wait(250)

            cy.contains(`${user.name} has logged in!`)
        })
    })

    describe("When logged in...", function() {
        beforeEach(function() {
            cy.login({ username: user.username, pw: user.pw })
        })

        it("ensuring that the user who created the post can delete it", function() {
            cy.contains("New Post").click()
            cy.get(".title-form").type(post[Nmax-1].title)
            cy.get(".author-form").type(post[Nmax-1].author)
            cy.get(".url-form").type(post[Nmax-1].url)
            cy.get(".btn-post").click()
            cy.get(".btn-visible").click()
            cy.get(".btn-rm").click()
            //cy.contains(`${post[Nmax-1].title} has been removed!`)
            cy.contains(`'${post[Nmax-1].title}' by '${post[Nmax-1].author}' has been deleted`)
            cy.get(".msg")
                //.should("contain", `${post[Nmax-1].title} has been removed!`)
                .should("contain", `'${post[Nmax-1].title}' by '${post[Nmax-1].author}' has been deleted`)
                .and("have.css", "color", "rgb(255, 255, 255)")
        })

        it("A list of blogs can be posted, liked, and sorted in descending order", function() {
            cy.contains("New Post").click()
            for (let i = 0; i < Nmax; i++) {
                cy.get(".title-form").type(post[i].title)
                cy.get(".author-form").type(post[i].author)
                cy.get(".url-form").type(post[i].url)
                cy.get(".btn-post").click()

                cy.contains(post[i].title)

                //cy.contains(post[i].title).parent().find(".btn-visible").as("theViewButton").click()
                //cy.contains(`${post[i].title}`).find(".btn-visible").as("theViewButton").click()
                cy.get(".div-Blogs").find(".btn-visible").as("theViewButton").click({ multiple: true })
                    .get(".btn-like").as("theLikeButton")
                    .then(() => {
                        for (let j = 0; j < 2*i; j++) {
                            cy.get("@theLikeButton").click({ multiple: true }).wait(250)
                            cy.get(".likes").should("contain", j+1)
                        }
                    })

                cy.get("@theViewButton").click({ multiple: true })
            }

            // Verification of sorting feature
            for (let i = 0; i < Nmax; i++) {
                //cy.contains(post[i].title).parent().find(".btn-visible").click()
                cy.get(".div-Blogs").find(".btn-visible").click({ multiple: true })
                cy.get(".blogStyle").eq(i).should("contain", post[i].title)
            }
        })
    })
})