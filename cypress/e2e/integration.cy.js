describe("Trace Integration Testing", () => {
  it("create page integration using intercept", () => {
    // HTTP INTERCEPTS
    // GET call on Table Page
    cy.intercept("GET", "/food", {
      body: [
        {
          title: "Intercept 1",
          amount: "000",
          category: "Food",
          url: "food",
          id: 111,
        },
        {
          title: "Intercept 2",
          amount: "000",
          category: "Food",
          url: "food",
          id: 222,
        },
      ],
    });
    cy.intercept("GET", "/misc", {
      body: [
        {
          title: "Intercept 1",
          amount: "000",
          url: "misc",
          category: "Miscellaneous",
          id: 111,
        },
        {
          title: "Intercept 2",
          amount: "000",
          url: "misc",
          category: "Miscellaneous",
          id: 222,
        },
      ],
    });
    // POST call on Create Page
    cy.intercept("POST", "/food", {
      body: {
        amount: "8.99",
        category: "Food",
        url: "food",
        title: "Subway",
      },
    }).as("createNewRecord");

    // Table Page
    cy.visit("http://localhost:3000/table");

    cy.get("[data-cy='create-btn']").click();

    // Create Page
    cy.get("[data-cy='title-input']")
      .type("Subway")
      .should("have.value", "Subway");

    cy.get("[data-cy='amount-input']")
      .type("8.99")
      .should("have.value", "8.99");

    cy.get("[data-cy='food-radio-input']").click();

    cy.get("[data-cy='submit-btn']").click();

    // Check is request result correct
    cy.wait("@createNewRecord").then((request) => {
      // console.log(request.request.body);
      expect(request.request.body).to.deep.equal({
        amount: "8.99",
        category: "Food",
        title: "Subway",
        url: "food",
      });
    });

    cy.url().should("include", "/table");
  });

  it("edit page integration using intercept", () => {
    // HTTP INTERCEPTS
    // GET call on Table Page
    cy.intercept("GET", "/food", {
      body: [
        {
          title: "icecream",
          amount: "1000",
          category: "Food",
          url: "food",
          id: 89,
        },
        {
          title: "intercept food 2",
          amount: "9.00",
          category: "Food",
          url: "food",
          id: 8,
        },
      ],
    }).as("foodItems");
    cy.intercept("GET", "/misc", {
      body: [
        {
          title: "Intercept misc 1",
          amount: "10",
          category: "Food",
          url: "food",
          id: 11,
        },
        {
          title: "Intercept misc 2",
          amount: "9.00",
          category: "Food",
          url: "food",
          id: 13,
        },
      ],
    }).as("miscItems");
    // GET call on Edit Page
    cy.intercept("GET", "/food/89", {
      body: {
        title: "icecream",
        amount: "1000",
      },
    });
    // PATCH call on Edit Page
    cy.intercept("PATCH", "/food/89", {
      body: {
        amount: "4.79",
        title: "Haagen Dazs",
      },
    }).as("editRecord");

    // TABLE PAGE
    cy.visit("/table");

    cy.get("table").contains("icecream").click();

    // EDIT PAGE
    cy.get("[data-cy='title-input']")
      .clear()
      .type("Haagen Dazs")
      .should("have.value", "Haagen Dazs");
    cy.get("[data-cy='amount-input']")
      .clear()
      .type("4.79")
      .should("have.value", "4.79");

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
