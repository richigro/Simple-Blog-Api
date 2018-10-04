//import node modules from npm and node_modeules
const express = require("express");
const morgan = require("morgan");

// instance of express
const app = express();

const blogsRoutes = require("./blogsRouter");

// using middleware to log request to server's console, for debugging purposes
app.use(morgan('common'));

//serving static files on from public folder
app.use(express.static('public'));

app.get("/", (req, res) => {
    // console.log(BlogsPosts);
    res.send("Hello World!");
});

// use blogsRoutes import to handle request to blogs enpoint
app.use("/blogs", blogsRoutes);


// =============================================
//setting up app, runServer and closeServer and exporting them
// for testing purposes

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    //one method to return promise instead of callback
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        })
        .on('error', err => {
            reject(err);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
            if(err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}


if (require.main === module) {
    runServer().catch(err => console.error(err));
};

//export functions to be used by our test
module.exports = {app, runServer, closeServer};


app.listen(process.env.PORT || 8080, () => { console.log(`Server listening on port ${process.env.PORT || 8080}`)});


