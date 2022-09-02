/***************************************************************
  # Author             :  Jefalyn B. Sarino
  # Scenario           :  Navigate to Non-Existing Subreddit
  # Scope              :  
                          -> Load the page
                          -> Check main route 
                          -> Check content display
                          -> Check navigation
                          -> Check content display based on the input
  
  # Last updated by    :   Jefalyn Sarino      
  # Last updated on    :   02 Sept 2022
***************************************************************/

import {ImageQuixPage} from "../../page-objects/imagequix";
const SUBREDDIT = new ImageQuixPage()

describe('Existing Subreddit Test Cases', () => {

    
    beforeEach(() => {
        cy.visit(Cypress.env('url'))
    })
    
    it('Check main route has been loaded', () => {
        cy.getEndpointData('GET','**/r/all/**','data')
        cy.wait('@data').its('response.statusCode').should('equal',200)
    })

    it('Check that content displays', () => {
        cy.getEndpointData('GET','**/r/all/**','data')
        cy.wait('@data').its('response.body.data.dist').should('not.equal',0)
        cy.get('.author').should('exist').each((author) => {
          expect(author.text()).not.to.be.empty
        })
        cy.get('.title').should('exist').each((title) => {
          expect(title.text()).not.to.be.empty
        })
    })
    
    it.only('Check navigation to existing subreddit', () => {
        cy.getEndpointData('GET','**/r/all/**','data')
        cy.wait('@data').then((xhr)=>{
            const subReddit =  xhr.response?.body.data.children[0].data.subreddit
            SUBREDDIT.Navigate(subReddit)           
        })
    })

})