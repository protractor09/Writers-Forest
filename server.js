
const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const app=express();

const abtpg="hello";

let generatePostHash = 0;
var posts=[];



app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/", (req, res) => {
    const index = parseInt(req.query.index) || 0;
    const postToShow = posts.length > 0 ? posts[index % posts.length] : null;
    res.render("index", {
        post: postToShow,
        currentIndex: index,
        hasPosts: posts.length > 0
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
    }

    posts.push(p);

    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("port started on 3000");
})