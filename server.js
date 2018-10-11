'use strict'
//import node modules from npm and node_modeules
const express = require("express");
const morgan = require("morgan");
// instance of express
const app = express();

//import routes from blogsRouter.js
const blogsRoutes = require("./blogsRouter");
//import routes from postsRoutes.js
const postsRoutes = require("./postsRoutes.js");

// using middleware to log request to server's console, for debugging purposes
app.use(morgan('common'));

//serving static files on from public folder
app.use(express.static('public'));

app.get("/", (req, res) => {
    // console.log(BlogsPosts);
    res.sendFile(__dirname + '/views/index.html');
});

// use blogsRoutes import to handle request to blogs enpoint
app.use("/blogs", blogsRoutes);
// endpoint to post api
app.use("/posts", postsRoutes);


// =============================================
//setting up app, runServer and closeServer and exporting them
// for testing purposes

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

 module.exports = { app, runServer, closeServer };