describe('E-commerce App - Product View Test', () => {
  it('loads home page and navigates to product detail', () => {
  cy.visit('http://localhost:5173')
  cy.contains('View', { timeout: 10000 }).first().click();
  })
})