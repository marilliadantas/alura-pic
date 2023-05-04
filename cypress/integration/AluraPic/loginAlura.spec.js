
describe('Login de usuarios alura pic', () => {

    beforeEach(() => {
      cy.visit('https://alura-fotos.herokuapp.com')

      cy.intercept('POST', 'https://apialurapic.herokuap.com/user/login', {
	    statusCode: 400 
    }).as('stubPost')
})

     it.only('fazer login de usuário válido', () => {
        cy.login(Cypress.env('userName'), Cypress.env('password'))
        cy.wait('@stubPost');
        cy.contains('a', '(Logout)').should('be.visible')
    })

    it('Fazer login de usuário inválido', () => {
        cy.login('jacqueline','1234')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
    })
});
});