const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const {v4: uuidv4}= require('uuid');
const app=express();

const port = process.env.PORT || 3000;

const abtpg="";
// This is a simple blogging platform where users can write posts and comment on them.
var posts=[];

let comments = {};

let users = []; // Dummy in-memory user store

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/", (req, res) => {
    try {
        const index = parseInt(req.query.index) || 0;   
        const postToShow = posts.length > 0 ? posts[index % posts.length] : null;
        const postComments = postToShow ? comments[postToShow.id] || [] : [];
        res.render("index", {
            post: postToShow,
            currentIndex: index,
            hasPosts: posts.length > 0,
            writername: postToShow ? postToShow.writer : "",
            comments: postComments
        });
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send("Internal Server Error");
    }
});


// GET landing page (Login/Signup)
app.get("/auth", (req, res) => {
    res.render("auth");
});

// POST: Login
app.post("/login", (req, res) => {
    const { userId, password } = req.body;
    const user = users.find(u => u.userId === userId && u.password === password);

    if (user) {
        // Redirect to homepage or dashboard
        res.redirect(`/?writer=${userId}`);
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// POST: Signup
app.post("/signup", (req, res) => {
    const { userId, email, password } = req.body;

    const userExists = users.find(u => u.userId === userId || u.email === email);
    if (userExists) {
        return res.status(400).send("User already exists");
    }

    const newUser = { userId, email, password };
    users.push(newUser);
    res.redirect(`/auth`);
});

app.post("/comments", (req, res) => {
    try {
        const { comment, postId, index } = req.body;
        if (!comments[postId]) {
            comments[postId] = [];
        }
        comments[postId].push(comment);
        res.redirect(`/?index=${index}`);
    } catch (error) {
        console.error("Error in POST /comments:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/explore", (req, res) => {
    try {
        const featuredPosts = posts.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
        res.render("explore", { posts: featuredPosts });
    } catch (error) {
        console.error("Error in GET /explore:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/library", (req, res) => {
    try {
        res.render("library", { posts: posts });
    } catch (error) {
        console.error("Error in GET /library:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/profile", (req, res) => {
    try {
        res.render("profile", {
            userPosts: posts.filter(post => post.writer === req.query.writer)
        });
    } catch (error) {
        console.error("Error in GET /profile:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/about", (req, res) => {
    try {
        res.render("about", { abt: abtpg });
    } catch (error) {
        console.error("Error in GET /about:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/settings", (req, res) => {
    try {
        res.render("settings");
    } catch (error) {
        console.error("Error in GET /settings:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/your-work", (req, res) => {
    try {
        const penName = req.query.writer || ""; // Default to empty string if no writer is provided
        const userPosts = posts.filter(post => post.writer === penName);
        res.render("your-work", { 
            userPosts: userPosts,
            allPosts: posts // Pass all posts to the view
        });
    } catch (error) {
        console.error("Error in GET /your-work:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/your-work", (req, res) => {
    try {
        const p = {
            id: uuidv4(),
            post: req.body.ta,
            title: req.body.com,
            writer: req.body.wri
        };
        console.log(p);
        posts.push(p);
        res.redirect("/");
    } catch (error) {
        console.error("Error in POST /your-work:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
    console.log("port started on 3000");
});