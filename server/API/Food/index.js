// libraries
import express from "express";
import passport from "passport";

// Database Model
import {FoodModel} from "../../database/allModels";

//Validation
import {ValidateRestaurantId, ValidateCategory} from "../../validation/food";

const Router = express.Router();

/*
Route           /
Description     Get all the foods based on particular restaurant
Access          Public
Parameter       _id
Method          GET
*/
Router.get("/:_id",async (req, res)=>{
    try{
        //validation
        await ValidateRestaurantId(req.params);

        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant: _id});

        return res.status(200).json({foods});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /r
Description     Get all the foods based on particular category
Parameter       category
Access          Public
Method          GET
*/
Router.get("/r/:category", async(req,res)=>{
    try{
        //validation
        await ValidateCategory(req.params);

        const {category} = req.params;
        const foods = await FoodModel.find({
            category: {$regex: category, $options: "i"}
        });

        return res.status(200).json({foods});
    } catch(error){
        return res.status(500).json({error : error.message});
    }
})

export default Router;
