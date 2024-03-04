describe("Display and User Flow", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'testOrders.json'
    }).as('getOrders');
    cy.visit('http://localhost:3000');

  });

  it('displays all UI elements correctly on initial load', () => {
    cy.wait('@getOrders');
    cy.get('header h1').contains('Burrito Builder');
    cy.get('input[name="name"]').should('exist');
    cy.get('.ingredient-button').first().contains('beans');
    cy.get('.ingredient-button').last().contains('sour cream');

    cy.get('.order-text').contains('Order: Nothing selected');
    cy.get('button[type="submit"]').contains('Submit Order');

    cy.get('.order').should('have.length', 2)

    cy.get('.order').first().contains('Jamie');
    cy.get('.order').first().contains('pico de gallo');
    cy.get('.order').first().contains('jalapenos');
    cy.get('.order').last().contains('Mr. Francisco');
    cy.get('.order').last().contains('beans');
    cy.get('.order').last().contains('hot sauce');
  });

  it('allows the user to add a new order to the DOM', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      fixture: 'newOrder.json'
    }).as('postOrder');

    cy.get('input[name="name"]').type('Test');
    cy.get('.ingredient-button').contains('beans').click();
    cy.get('.ingredient-button').contains('lettuce').click();
    cy.get('button[type="submit"]').click();

    cy.wait('@postOrder');

    cy.get('.order').should('have.length', 3);
    cy.get('.order').last().contains('Test');
    cy.get('.order').last().contains('beans');
    cy.get('.order').last().contains('lettuce');
  });

  it('does not allow submitting an order without a name and at least one ingredient', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('contain', 'Please enter a name and select at least one ingredient.');

    cy.get('.error-message').should('not.exist');

    cy.get('.ingredient-button').contains('beans').click();
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('contain', 'Please enter a name and select at least one ingredient.');

    cy.get('.error-message').should('not.exist');
  });
});
