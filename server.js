// import {nanoid} from "nanoid";

const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const app=express();

const abtpg="idk what to write here yet";


// const generatePostHash = () => nanoid(10); // makes hash for every new post


let post;
let title;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    res.render("index",{post_content:post,tit:title});
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

    post=req.body.ta;
    title=req.body.com;

    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("port started on 3000");
})