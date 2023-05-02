import Home from "../../src/Screens/home";
import { BrowserRouter as Router } from "react-router-dom";


describe('StickyFooter component', () => {
    it('displays the latest job posts', () => {
        cy.mount(
            <Router>
              <Home />
            </Router>
          );
  
          cy.request({
            method: "GET",
            url: "http://127.0.0.1:8000/api/",
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyOTM5MzQxLCJpYXQiOjE2ODI5Mzg3NDEsImp0aSI6ImI1Y2UyNTRkZjcxZjQ0OGI5ZjZiZGRiODJhYTI0OTQ5IiwidXNlcl9pZCI6MTB9.9nV7fT6e33CM4CAXWh6umiEvjEEfwWBMEc6Kj9BOkrM"
            },
        
          })
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            
          
          });
    });
  });