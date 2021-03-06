import { RestaurantModel } from "../../database/restaurant";
import express from "express";
import passport from "passport";

//Validation
import {ValidateRestaurantCity, ValidateRestaurantSearchString} from "../../validation/restaurant";
import {ValidateRestaurantId} from "../../validation/food";

const Router = express.Router();

/*
Route               /
Des                 get all Restaurants details
Params              None
Access              Public
Method              GET
*/
Router.get("/", async(req,res)=>{
    try{
        //validation
        await ValidateRestaurantCity(req.query);

        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.status(200).json({restaurants});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route               /
Des                 get particular Restaurants details based on id
Params              _id
Access              Public
Method              GET
*/
Router.get("/:_id", async(req,res)=> {
    try{
        //validation
        await ValidateRestaurantId(req.params);

        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if(!restaurant){
            return res.status(404).json({error: "Restaurant Not Found"});
        }

        return res.status(200).json({restaurant});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /search
Description     Get Restaurant details search
Params          none
Body            searchString
Access          Public
Method          GET
*/
Router.get("/search", async(req,res)=>{
    try{
        // validation
        await ValidateRestaurantSearchString(req.body);

        const {searchString} = req.body;
        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"},
        });

        return res.status(200).json({restaurants});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;