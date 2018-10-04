const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Simple Blog', function() {
    //beore testing run the server with promise
    before(function() {
        return runServer();
    });
    // close server after testing
    after(function() {
        return closeServer();
    });


     // testing getting all recipes on get request to endpoint
     it("Should get all blogs on GET", function() {
        return chai.request(app)
        .get("/blogs")
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a("array");
            // expecting 2 recipes 
            expect(res.body.length).to.be.at.least(3);
            res.body.forEach(function(item) {
                expect(item).to.be.a("object");
                expect(item).to.have.all.keys(
                    'id', 'title', 'content', 'author');
            });
        });
    });


    // testing POST request to enpoint and respose data
    it("Should add a blog on POST", function() {
        const newBlog = {title: 'Proof that the earth is flat', content: 'The earth is flat beacuse it the horizon looks flat', author: 'Tila Tequila'};
        return chai.request(app)
            .post("/blogs")
            .send(newBlog)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('id', 'title', 'content', 'author');
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(Object.assign(newBlog, {id: res.body.id}));
            });
    });

    // testing PUT request to recipes endpoint
    it("Should properly update Recipe provided with appropiate fields", function() {
        const updatedRecipe = {
            name: 'Awesome Taco',
            ingredients: ['Run of the mill Taco', 'Awesome Sauce']
        };
        return chai.request(app)
            // since not using db, get an existing recipe from server
            .get('/blogs')
            .then(function(res) {
                // get id from the first listed recipe on GET
                // add it as property to updatedRecipe object
                updatedRecipe.id = res.body[0].id;
                return chai.request(app)
                .put(`/recipes/${updatedRecipe.id}`)
                .send(updatedRecipe)
            })
            .then(function(res) {
                expect(res).to.have.status(204);
                expect(res.body).to.be.a('object');
            });
    });

    // testing endpoint on DELETE
    it("Should delete a recipe provided an id on DELETE", function() {
        return chai.request(app)
        // since not db get id from get response first 
        .get('/blogs')
        .then(function(res) {
            const recipeID = res.body[0].id;
            return chai.request(app)
                .delete(`/blogs/${recipeID}`);
        })
        .then(function(res) {
            expect(res).to.have.status(204);
        });
    });
});