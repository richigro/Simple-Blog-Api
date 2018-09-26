const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create("my little p0ny", "who was my little pony well..", "Jonh M");
BlogPosts.create("Does ****** really exist?", "This debate has gone on, since the dawn of human kind and..", "Schizter Frankz", "12/12/2012");
BlogPosts.create("The Winchester Mansion", "The maker and gusmisth Oliver Winchester", "Annie Merdadmus");

router.get("/", (req, res) => {
    res.json(BlogPosts.get());
});

// ==================================================
router.post('/', jsonParser, (req, res) => {
    // required fiels to create a new blog
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const blog = BlogPosts.create(req.body.name, req.body.content, req.body.title, req.body.date = Date.now());
    res.status(201).json(blog);
  });
  
  // Delete blog by id
  router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted shopping list item \`${req.params.ID}\``);
    res.status(204).end();
  });
  
 // update blog from put request when passing json object
  router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['name', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      const message = (
        `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating shopping list item \`${req.params.id}\``);
    const updatedItem = Recipes.update({
      id: req.params.id,
      name: req.body.name,
      content: req.body.content,
      author: req.body.author
    });
    res.status(204).end();
  })
//===================================================

module.exports = router;