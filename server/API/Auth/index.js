import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

// Initializing
const Router = express.Router();

//Models
import { UserModel } from "../../database/allModels";

/*
Route           /signup
Decription      Signup with email and Password
Params          None
Access          Public
Method          POST
*/
Router.post("/signup", async (req,res)=> {
    try{
        const { email, password, fullname, phoneNumber} = req.body.credentials;

        // Check whether email or phone number exists
        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone){
            return res.json({ error: "User already Exists"});
        }

        // hashing with salt
        const bcryptSalt = await bcrypt.genSalt(8);

        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //DB
        await UserModel.create({...req.body.credentials, hashedPassword});

        //JWT Auth Token
        const token = jwt.sign({user: {fullname, email}}, "ZomatoApp");

        return res.status(200).json({Token : token});

    }catch(error){
        return res.status(500).json({Error: error.message});
    }
});

export default Router;

// hashing means encypting the password
// encrypted - Heet -> $%#789056

// salting means doing encrytion 8 times or 10 times or 16 times, etc
// salting is used for securing password more
// encrypting the encrypted password more times like 8 times, 16 times, etc