describe('Home Page', () => {
    it('should load the home page', () => {
      cy.visit('/');
      cy.contains('Welcome to your app');
    });
  });