const express=require("express");
const path=require("path");
const app=express();

const home="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat";
const abtpg="idk what to write here yet";

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    res.render("index",{homepg:home});
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

app.listen(3000,()=>{
    console.log("port started on 3000");
})