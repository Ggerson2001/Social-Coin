import Login from "../../src/Screens/login";
import { BrowserRouter as Router } from "react-router-dom";

describe('Test Login Screen', () => {
  it('checks if login is working', () => {
    
    cy.mount(
      <Router>
        <Login />
      </Router>
    );

    
    cy.get("form").within(() => {
      cy.get('input[name="email"]').type("ad@ad.com");
      cy.get('input[name="password"]').type("Family123!");
      cy.get('button[type="submit"]').click();
    });

    cy.request({
      method: "POST",
      url: "http://127.0.0.1:8000/api/user/login/",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: "ad@ad.com",
        password: "Family123!",
      },
    })
    .then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("access");
      expect(response.body).to.have.property("refresh");
    });
  });

  // it('should display an error message for invalid login credentials', () => {
  //   cy.mount(
  //     <Router>
  //       <Login />
  //     </Router>
  //   );

  //   cy.get('input[name="email"]').type('invalid-email@example.com')
  //   cy.get('input[name="password"]').type('invalid-password')
  //   cy.get('button[type="submit"]').click()

  //   cy.request({
  //     method: "POST",
  //     url: "http://127.0.0.1:8000/api/user/login/",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       email: "invalid-email@example.com",
  //       password: "invalid-password",
  //     },
  //   })
  //   .then((response) => {
  //     expect(response.status).to.equal(401);
  //     expect(response.body).to.have.property("detail");
  //   });


  //   cy.get('.error-message').should('be.visible')
  // });
});


