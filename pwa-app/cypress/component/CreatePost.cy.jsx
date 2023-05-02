import Form from "../../src/admin/create";
import { BrowserRouter as Router } from "react-router-dom";
import 'cypress-file-upload';

describe("Create component", () => {
  
    it("should successfully create a new post", () => {

        cy.mount(
            <Router>
              <Form />
            </Router>
          );
      // fill out form fields
      cy.get("#title").type("New post");
      cy.get("#place").type("New York");
      cy.get('input[name="reward"]').type("100");
    //   cy.get('input[name="description"]').type("This is a new post");
      cy.get("#slug").type("new-post");
      
      // attach an image file to the form
      cy.fixture("test-image.jpg").then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: "test-image.jpg",
          mimeType: "image/jpeg",
        });
      });
  
      // submit the form
      cy.get("form").submit();
      cy.request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/admin/create/",
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyOTQ1NTEwLCJpYXQiOjE2ODI5NDQ5MTAsImp0aSI6IjQ0MWIyZTc1NmNiMzQ1NDk5NzRjYjkzMjlhYzI2Yzg5IiwidXNlcl9pZCI6MTB9.4b2iy2ogJ9eOPMJhjAnboBcirJrC5arjtsnHgQVp9mU"
        },
        body: {
          title: "New Post",
          place: "New York",
          descriptionL:"This is a new post",
          reward:"100",
          image:"test-image.jpg",

        },
      })
      .then((response) => {
        expect(response.status).to.equal(200);

      });
  
      // assert that the new post was created
       // adjust the URL as needed
    //   cy.get("#new-post").should("exist"); // adjust the selector as needed
    });
  });