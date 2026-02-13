describe('Navigation', () => {
  it('should navigate to the top page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('div').contains('Services')
    cy.get('div').contains('FBC Stackについて')
    cy.get('div').contains('みんなのツール')
    cy.get('div').contains('利用規約')
    cy.get('div').contains('プライバシーポリシー')
  })

  it('should navigate to the fbc stack page', () => {
    cy.visit('http://localhost:3000/terms')
    cy.get('div').contains('利用規約')
  })

  it('should navigate to the fbc stack page', () => {
    cy.visit('http://localhost:3000/privacy')
    cy.get('div').contains('プライバシーポリシー')
  })

  it('should navigate to the fbc stack page', () => {
    cy.visit('http://localhost:3000/posts/fbc_stack')
    cy.get('div').contains('FBC Stack')
  })

  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="about"]').click()
    cy.url().should('include', '/about')
    cy.get('div').contains(
      'FBC Stackは、FBC(Fjord Boot Camp)の卒業生が作成したサービスの技術スタックデータベースです。',
    )
  })

  it('should navigate to the tools page', () => {
    cy.visit('http://localhost:3000/tools')
    cy.contains('みんなのツール')
    cy.get('input').type('acm')
    cy.contains('AWS Certificate Manager')
    cy.contains('Twitter API').should('not.exist')

    cy.get('input').clear()

    cy.get('input').type('twitter')
    cy.contains('Twitter API')
    cy.contains('AWS Certificate Manager').should('not.exist')
  })

  it('should navigate to the fjord choice page from top', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').type('Fjord Choice')
    cy.get('a[href*="posts/fjord_choice"]').click()
  })
})

export {}
