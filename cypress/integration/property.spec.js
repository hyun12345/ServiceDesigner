describe('Elements', function() {
    beforeEach(function(){
        cy.visit('/')
        cy.get('button[name="dev"]').click()
    })

    function createComponent(name) {
        cy.get('div[id="components"]').trigger('mouseover')
        cy.get('span[id="icon-create-file"]>svg').click()
        cy.get('input[id="file-create-input"]').type(name+'{enter}')
        cy.get('.scrollarea-content').eq(0).click()
    }

    function createElement(name) {
        cy.get('div[id="element-title"]').siblings('div').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="element-input"]').type(name+'{enter}')
    }

    it('Create String Property', function(){
        createComponent('new')
        createElement('div')
        cy.get('.scrollarea-content').eq(1).find('div').eq(0).click()
        cy.get('div[id="Property"]').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="property-name-input"]').type('new')
        cy.get('input[id="property-value-input"]').type('value')
        cy.get('button[id="property-submit"]').click()
        cy.get('div[id="property-list"]').find('div').eq(1).should('have.text', 'newstring')
        cy.get('input[id="property-name-input"]').should('have.value', '')
        cy.get('div[id="property-list"]').find('div').eq(1).click()
        cy.get('input[id="property-value-input"]').should('have.value', 'value')
    })

    it('Create Number Property', function(){
        createComponent('new')
        createElement('div')
        cy.get('.scrollarea-content').eq(1).find('div').eq(0).click()
        cy.get('div[id="Property"]').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="property-name-input"]').type('new')
        cy.get('select[id="property-type-select"]').select('number')
        cy.get('input[id="property-value-input"]').type(100)
        cy.get('button[id="property-submit"]').click()
        cy.get('div[id="property-list"]').find('div').eq(1).should('have.text', 'newnumber')
        cy.get('input[id="property-name-input"]').should('have.value', '')
        cy.get('div[id="property-list"]').find('div').eq(1).click()
        cy.get('input[id="property-value-input"]').should('have.value', '0100')
    })

    it('Create Boolean Property', function(){
        createComponent('new')
        createElement('div')
        cy.get('.scrollarea-content').eq(1).find('div').eq(0).click()
        cy.get('div[id="Property"]').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="property-name-input"]').type('new')
        cy.get('select[id="property-type-select"]').select('boolean')
        cy.get('input[id="property-value-input"]').click()
        cy.get('button[id="property-submit"]').click()
        cy.get('div[id="property-list"]').find('div').eq(1).should('have.text', 'newboolean')
        cy.get('input[id="property-name-input"]').should('have.value', '')
        cy.get('div[id="property-list"]').find('div').eq(1).click()
        cy.get('input[id="property-value-input"]').should('be.checked')
    })

    it('Create Object Property', function(){
        createComponent('new')
        createElement('div')
        cy.get('.scrollarea-content').eq(1).find('div').eq(0).click()
        cy.get('div[id="Property"]').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="property-name-input"]').type('style')
        cy.get('select[id="property-type-select"]').select('object')
        cy.get('div[id="property-value-object"]').find('textarea').focus().type('{{}background:white}', {force:true})
        cy.get('button[id="property-submit"]').click()
        cy.get('div[id="property-list"]').find('div').eq(1).should('have.text', 'styleobject')
        cy.get('div[id="property-list"]').find('div').eq(1).click()
        cy.get('div[id="property-value-object"]').find('.ace_scroller').should('have.text', '{background:white};')
    })

    it('Create Function Property', function(){
        createComponent('new')
        createElement('div')
        cy.get('.scrollarea-content').eq(1).find('div').eq(0).click()
        cy.get('div[id="Property"]').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="property-name-input"]').type('new')
        cy.get('select[id="property-type-select"]').select('function')
        cy.get('button[id="property-submit"]').click()
        cy.get('div[id="property-list"]').find('div').eq(1).should('have.text', 'newfunction')
    })

    it('Create Variable Property', function(){
        createComponent('new')
        createElement('div')
        cy.get('.scrollarea-content').eq(1).find('div').eq(0).click()
        cy.get('div[id="Property"]').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="property-name-input"]').type('new')
        cy.get('select[id="property-type-select"]').select('variable')
        cy.get('input[id="property-value-input"]').type('this.state.value')
        cy.get('button[id="property-submit"]').click()
        cy.get('div[id="property-list"]').find('div').eq(1).should('have.text', 'newvariable')
        cy.get('input[id="property-name-input"]').should('have.value', '')
        cy.get('div[id="property-list"]').find('div').eq(1).click()
        cy.get('input[id="property-value-input"]').should('have.value', 'this.state.value')
    })

    it('Delete Property', function(){
        createComponent('new')
        createElement('div')
        cy.get('.scrollarea-content').eq(1).find('div').eq(0).click()
        cy.get('div[id="Property"]').trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(0).click()
        cy.get('input[id="property-name-input"]').type('new')
        cy.get('input[id="property-value-input"]').type('value')
        cy.get('button[id="property-submit"]').click()
        cy.get('div[id="property-list"]').find('div').eq(1).trigger('contextmenu')
        cy.get('div[id="contextMenu"]>div').eq(1).click()
        cy.get('div[id="property-list"]').find('div').should('have.length', 1)
    })
});