import express from "express";

import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/*
Route                   /new
Description             Add new review
Access                  Public
Parameter               None
Body                    Review object
Method                  POST
*/
Router.post("/new", async(req,res)=> {
    try{
        const {reviewData} = req.body;
        await ReviewModel.create(reviewData);

        return res.json({review: "Successfully Created Review"});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route                   /delete
Description             Add new review
Access                  Public
Parameter               _id
Method                  POST
*/
Router.post("/delete/:_id", async(req,res)=> {
    try{
        const {_id} = req.params;
        await ReviewModel.findByIdAndDelete(_id);

        return res.status(200).json({review: "Successfully Deleted Review"});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;