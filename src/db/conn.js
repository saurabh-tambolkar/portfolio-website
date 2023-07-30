const mongoose=require("mongoose");

//creating a database dynamic
mongoose.connect("mongodb://0.0.0.0/dynamicWeb")
.then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(`theres an error ${err}`);
})