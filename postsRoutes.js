// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();


// const {Post} = require('./models');

// router.get('/', (req, res) => {
//     Post
//       .find()
//       .then(posts => {
//         res.json(posts.map(post => post.serialize()));
//       })
//       .catch(err => {
//         console.error(err);
//         res.status(500).json({ error: 'something went terribly wrong' });
//       });
//   });

// router.get('/posts/:id', jsonParser,  (req, res) => {
//     Post
//       .findById(req.params.id)
//       .then(post => res.json(post.serialize()))
//       .catch(err => {
//         console.error(err);
//         res.status(500).json({ error: 'something went horribly awry' });
//       });
//   });

//   router.post('/posts', jsonParser, (req, res) => {
//     const requiredFields = ['title', 'content', 'author'];
//     for (let i = 0; i < requiredFields.length; i++) {
//       const field = requiredFields[i];
//       if (!(field in req.body)) {
//         const message = `Missing \`${field}\` in request body`;
//         console.error(message);
//         return res.status(400).send(message);
//       }
//     }
//     Post
//     .create({
//       title: req.body.title,
//       content: req.body.content,
//       author: req.body.author
//     })
//     .then(Post => res.status(201).json(Post.serialize()))
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Something went wrong' });
//     });

//     router.put('/posts/:id', jsonParser,  (req, res) => {
//         if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//           res.status(400).json({
//             error: 'Request path id and request body id values must match'
//           });
//         }
      
//         const updated = {};
//         const updateableFields = ['title', 'content', 'author'];
//         updateableFields.forEach(field => {
//           if (field in req.body) {
//             updated[field] = req.body[field];
//           }
//         });
      
//         Post
//           .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
//           .then(updatedPost => res.status(204).end())
//           .catch(err => res.status(500).json({ message: 'Something went wrong' }));
//       });
      
      
//       router.delete('/:id', jsonParser, (req, res) => {
//         Post
//           .findByIdAndRemove(req.params.id)
//           .then(() => {
//             console.log(`Deleted blog post with id \`${req.params.id}\``);
//             res.status(204).end();
//           });
//       });
      
      
//       app.use('*', function (req, res) {
//         res.status(404).json({ message: 'Not Found' });
//       });

// });


// module.exports = router;