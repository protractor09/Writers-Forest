
const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const app=express();

const port = process.env.PORT || 3000;

const abtpg="hello";

let generatePostHash = 0;
var posts=[];

let comments = {};


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/", (req, res) => {
    const index = parseInt(req.query.index) || 0;   
    const postToShow = posts.length > 0 ? posts[index % posts.length] : null;
    const postComments= postToShow?comments[postToShow.id] || [] : [];
    res.render("index", {
        post: postToShow,
        currentIndex: index,
        hasPosts: posts.length > 0,
        writername: postToShow?postToShow.writer:"",
        comments: postComments
    });
});

app.post("/comments", (req, res) => {
    const { comment, postId, index } = req.body;
    
    // Initialize array for this post's comments if it doesn't exist
    if (!comments[postId]) {
        comments[postId] = [];
    }
    
    // Add the new comment to the array for this post
    comments[postId].push(comment);
    
    // Redirect back to the same post
    res.redirect(`/?index=${index}`);
});

app.get("/", (req, res) => {
    const index = parseInt(req.query.index) || 0;   
    const postToShow = posts.length > 0 ? posts[index % posts.length] : null;
    res.render("index", {
        post: postToShow,
        currentIndex: index,
        hasPosts: posts.length > 0,
        writername: postToShow ? postToShow.writer : "",
        comments: comments
    });
});

app.get("/about",(req,res)=>{
    res.render("about",{abt:abtpg});
})

app.get("/settings",(req,res)=>{
    res.render("settings");
})

app.get("/your-work",(req,res)=>{
    res.render("your-work");
})

app.post("/your-work",(req,res)=>{

    const p={
        id:generatePostHash++,
        post:req.body.ta,
        title:req.body.com,
        writer:req.body.wri
    }

    posts.push(p);

    res.redirect("/");
})

app.listen(port,()=>{
    console.log("port started on 3000");
})