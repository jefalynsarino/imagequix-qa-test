
/***************************************************************
  # Author             :  Jefalyn Sarino
  
  # Last updated by    :  Jefalyn Sarino   
  # Last updated on    :  02 Sept 2022
***************************************************************/

export class ImageQuixPage {

    /**Declared elements */
    get subreddittextField(){return cy.get('.subreddit-input')}
    get goButton(){return cy.get('button')}
    get authorList(){return cy.get('.author')}
    get titleList(){return cy.get('.title')}

    
    /*********************************************************************************
    *  MethodName    : Navigate
    *  Description   : method use to navigate to subreddit and verify content
    *  Parameter     : subReddit
    *********************************************************************************/
    Navigate(inputData: any){
        cy.getEndpointData('GET','**/new.json','result')
        this.subreddittextField.should('be.visible').type(inputData)
        this.goButton.contains('Go').should('be.visible').click()
        cy.wait('@result').then((xhr)=>{
            console.log(xhr)
            // Check error message if no result found
            if(xhr.response?.statusCode != 200){
                cy.contains('Could not retrieve results for '+inputData).should('be.visible')
                this.authorList.should('not.exist')
                this.titleList.should('not.exist')
            }else{
                expect(xhr.response?.statusCode).to.equal(200)
                // Check return subreddit match to the input data in the textfield
                const arrays = [xhr.response?.body.data.children]
                arrays.forEach((array, index) => {
                    for(index == 0; index<array.length; index++){
                        expect(array[index].data.subreddit).to.equal(inputData)
                    }
                });
                // Check return subreddit post match to the post in the user interface
                cy.get('.post').then((element) => {
                    const networkPost = xhr.response?.body.data.dist
                    var post = []
                    post.push(element)
                    let UIPost = post[0].length
                    expect(UIPost).to.equal(networkPost)
                })
                //Verify url is based on the subredddit and the author and title display
                cy.url().should('contain',inputData)
                this.authorList.should('exist').each((author) => {
                    expect(author.text()).not.to.be.empty
                })
                this.titleList.should('exist').each((title) => {
                    expect(title.text()).not.to.be.empty
                })
            } 
        })  
    }
}