//import node modules from npm and node_modeules
const express = require("express");
const morgan = require("morgan");

// instance of express
const app = express();

const blogsRoutes = require("./blogsRouter");

// using middleware to log request to server's console, for debugging purposes
app.use(morgan('common'));

app.get("/", (req, res) => {
    // console.log(BlogsPosts);
    res.send("Hello World!");
});

app.use("/blogs", blogsRoutes);

app.listen(process.env.PORT || 8080, () => { console.log(`Server listening on port ${process.env.PORT || 8080}`)});

