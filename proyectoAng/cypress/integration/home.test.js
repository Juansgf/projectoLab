describe('Home Page',()=>{
    it('tiene nav bar en español', () =>{
        cy.visit('http://localhost:4200');
        cy.contains("No estás solo")

    })
})