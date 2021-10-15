//Libraries
import express from "express";
import passport from "passport";

// Menu Model
import {MenuModel, ImageModel} from "../../database/allModels";

const Router = express.Router();

/*
Route               /list
Description         get the list of menu based on id
Access              Public
Parameter           _id
Method              GET
*/
Router.get("/list/:_id", async (req,res)=> {
    try{
        const {_id} = req.params;
        const menu = await MenuModel.findOne(_id);

        return res.status(200).json({menu});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route               /image
Description         get menu image based on id
Access              Public
Parameter           _id
Method              GET
*/
Router.get("/image/:_id", async(req,res) => {
    try{
        const {_id} = req.params;
        const menu = await ImageModel.findOne(_id);

        return res.status(200).json({menu});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;