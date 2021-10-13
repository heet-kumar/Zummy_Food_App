import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
    Images: [
        { location: {type: String, required: true}}
    ]
},
{
    timestamps: true
});

const ImageModule = mongoose.model("Images",ImageSchema);

module.exports = ImageModule;