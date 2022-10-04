describe("Trace Integration Testing", () => {
  it("create page integration using intercept", () => {
    cy.visit("http://localhost:3000/table");

    cy.get("[data-cy='create-btn']").click();

    cy.get("[data-cy='title-input']")
      .type("Subway")
      .should("have.value", "Subway");

    cy.get("[data-cy='amount-input']")
      .type("8.99")
      .should("have.value", "8.99");

    cy.get("[data-cy='food-radio-input']").click();

    // Intercept request before submit
    cy.intercept("POST", "/food", {
      body: {
        amount: "8.99",
        category: "Food",
        url: "food",
        title: "Subway",
      },
    }).as("createNewRecord");

    cy.get("[data-cy='submit-btn']").click();

    // Check request result is correct
    cy.wait("@createNewRecord").then((request) => {
      console.log(request.request.body);

      expect(request.request.body).to.deep.equal({
        amount: "8.99",
        category: "Food",
        title: "Subway",
        url: "food",
      });
    });

    cy.url().should("include", "/table");
  });

  it.only("edit page integration using intercept", () => {
    cy.visit("http://localhost:3000/table");

    // Getting DOM detached error. Need to delay Cypress.
    cy.wait(3000);

    cy.get("table").contains("icecream").click();

    cy.get("[data-cy='title-input']")
      .clear()
      .type("Haagen Dazs")
      .should("have.value", "Haagen Dazs");

    cy.get("[data-cy='amount-input']")
      .clear()
      .type("4.79")
      .should("have.value", "4.79");

    cy.intercept("PATCH", "/food/7", {
      body: {
        amount: "4.79",
        title: "Haagen Dazs",
      },
    }).as("editRecord");

    cy.get("[data-cy='update-btn']").click();

    cy.wait("@editRecord").then((request) => {
      console.log(request.request.body);

      expect(request.request.body).to.deep.equal({
        amount: "4.79",
        title: "Haagen Dazs",
      });
    });

    cy.url().should("include", "/table");
  });
});
