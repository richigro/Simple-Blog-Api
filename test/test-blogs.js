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
            // expecting 3 blog posts on GET
            expect(res.body.length).to.be.at.least(3);
            res.body.forEach(function(item) {
                expect(item).to.be.a("object");
                expect(item).to.have.all.keys(
                    'id', 'title', 'content', 'author', 'publishDate');
            });
        });
    });


    // testing POST request to enpoint and respose data
    it("Should add a blog on POST", function() {
        const newBlog = { title: 'Proof that the earth is flat', content: 'The earth is flat beacuse it the horizon looks flat', author: 'Tila Tequila', publishDate: '2018'};
        return chai.request(app)
            .post("/blogs")
            .send(newBlog)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('id', 'title', 'content', 'author', 'publishDate');
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(Object.assign(newBlog, {id: res.body.id}));
            });
    });

    // testing PUT request to blogs endpoint
    it("Should update any blog provided the correct fields on PUT", function() {
        const updatedBlog = {
            title: 'How to make a delicious Chimichanga',
            author: 'Jack Black',
            content: 'Well you first start by...'
        };
        return chai.request(app)
            // since not using db, get an existing recipe from server
            .get('/blogs')
            .then(function(res) {
                // get id from the first listed blog on GET
                // add it as property to updatedBlog object
                return chai.request(app)
                .put(`/blogs/${res.body[0].id}`)
                .send(updatedBlog)
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
            const blogId = res.body[0].id;
            return chai.request(app)
                .delete(`/blogs/${blogId}`);
        })
        .then(function(res) {
            expect(res).to.have.status(204);
        });
    });
});