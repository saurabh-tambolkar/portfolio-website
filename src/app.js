//requiring dependencies
const express=require("express");
const app = express();
const path=require("path");
const hbs=require("hbs");
const User=require("../src/models/usermsg")

//requiring modules/files
require("./db/conn")


//creating a port
const port=process.env.PORT || 5000;

//setting path
const staticPath=path.join(__dirname,"../public");
const templatesPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false})); //imp to get data from form...
// app.use(express.json());

// app.use(express.static(staticPath)); //for static files like public/index.js

//setting template engines
app.set("view engine","hbs");
app.set("views",templatesPath);
hbs.registerPartials(partialsPath);




//creating routes/pages/paths
//app.get(path,callback)

app.get("/",(req,res)=>{
    res.render("index");  //while using hbs (render)
    // res.send("hello"); //only for expressjs (send)
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.post("/contact",async(req,res)=>{
    try{
        const userData=new User(req.body);
        await userData.save();
        res.status(201);
        res.render("index");
    }
    catch(err){
        res.status(400);
        res.send(err);
    }
})

app.get("*",(req,res)=>{
    res.send("no page found that you are trying to get .....")
})

app.listen(port,()=>{
    console.log(`Listening to port number: ${port}`);
})