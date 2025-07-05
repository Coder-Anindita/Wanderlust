const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");




main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  

  
};
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/",(req,res)=>{
    res.send("HI I AM ROOT PAGE");
});
app.use(express.urlencoded({extended:true}));
// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"MY new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesful testing");
// })
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({})
    res.render("listings/index",{allListings});
    
});
app.use(express.static(path.join(__dirname,"/public")));


app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
})
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);  // ✅ Await here
    res.render("listings/show", { listing });
});
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    newListing.save();
    res.redirect("/listings");

})
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit",{listing});
})
app.put("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})



app.listen(8080,()=>{
    console.log("Listening to port 8080");
});