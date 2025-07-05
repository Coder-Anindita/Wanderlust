const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg"
        }
    },
    price: Number,
    location: String,
    country: String
}); 

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;