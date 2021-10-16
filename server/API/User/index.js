import express from "express";

import { UserModel } from "../../database/allModels";

const Router = express.Router();

/*
Route               /
Description         Get an user data
Access              Public
Parameter           _id
Method              GET         
*/
Router.get("/:_id", async (req,res)=> {
    try{
        const {_id} = req.params;
        const getUser = await UserModel.findById(_id);
        return res.status(200).json({User: getUser});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route               /update
Description         update and user data
Access              Public
Body                userData
Parameter           _userId
Method              PUT         
*/
Router.get("/update/:_userId", async (req,res)=> {
    try{
        const {_userId} = req.params;
        const {userData} = req.body;
        const UpdateUserData = await UserModel.findByIdAndUpdate(
            _userId,
            {
                $set: userData
            },
            {
                new: true
            }
        );
        return res.status(200).json({User: UpdateUserData});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;