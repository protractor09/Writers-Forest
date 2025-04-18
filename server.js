
const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const app=express();

const abtpg="idk what to write here yet";


let generatePostHash = 0;
let posts=[];

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    res.render("index",{posts:posts});
})

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
        title:req.body.com
    }

    posts.push(p);

    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("port started on 3000");
})