describe('Property, Style 관리', function() {
    
    it('React프로젝트에서 style을 편집 할 수 있다.', function(){
        cy.visit('/')
        cy.get('button[name="react"]').click()
        cy.get('#property').click()
        cy.get(".ace_text-input").type("{leftarrow}{leftarrow}margin:5px;", {force:true})
        cy.get('#design > div > div').should('have.css', 'margin', '5px')    
    })

    it('React프로젝트에서 property를 편집 할 수 있다.', function() {
        cy.visit('/')
        cy.get('button[name="react"]').click()
        cy.get('#element').click()
        cy.get('li').eq(0).click()
        cy.get('li').eq(1).click()
        cy.get('#property').click()
        cy.get('span').eq(1).click()
        cy.get('input').eq(3).type('hello world')
        cy.get('#design > div > div').should('have.text', 'hello world')    
    })
})