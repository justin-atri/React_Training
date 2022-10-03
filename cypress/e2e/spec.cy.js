describe("Trace CRUD Testing", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='begin-trace']").click();
  });

  it.only("create new table item", () => {
    cy.visit("http://localhost:3000/table");
    // figure url to intercept

    cy.get("[data-cy='create-btn']").click();

    cy.get("[data-cy='title-input']")
      .type("Subway")
      .should("have.value", "Subway");

    cy.get("[data-cy='amount-input']")
      .type("8.99")
      .should("have.value", "8.99");

    cy.get("[data-cy='food-radio-input']").click();

    cy.intercept("POST", "/food", {
      body: {
        amount: "8.99",
        category: "food",
        id: 400,
        title: "Subway",
      },
    }).as("createNewRecord");

    cy.get("[data-cy='submit-btn']").click();

    cy.wait("@createNewRecord").then((request) => {
      console.log(request.request.body);

      expect(request.request.body).to.deep.equal({
        amount: "8.99",
        category: "food",
        title: "Subway",
      });
    });

    // Check if new item is added to the table
    cy.get("table").contains("Subway");
  });

  it("edit new table item", () => {
    cy.get("table").contains("Subway").click();

    cy.get("[data-cy='title-input']")
      .clear()
      .type("Italian BMT")
      .should("have.value", "Italian BMT");

    cy.get("[data-cy='amount-input']")
      .clear()
      .type("10.99")
      .should("have.value", "10.99");

    cy.get("[data-cy='update-btn']").click();

    // Check if new item is updated
    cy.get("table").contains("Italian BMT");
  });

  it("delete updated new item", () => {
    cy.get("table").contains("Italian BMT").click();

    cy.get("[data-cy='delete-btn']").click();

    cy.get("table").contains("Italian BMT").should("not.exist");
  });
});
