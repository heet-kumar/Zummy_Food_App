import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Initializing
const Router = express.Router();

//Models
import UserModel from "../../database/user/index";

/*
Route           /signup
Decription      Signup with email and Password
Params          None
Access          Public
Method          POST
*/
Router.post("/signup", async (req,res)=> {
    try{
        //const { email, password, fullname, phoneNumber} = req.body.credentials;

        // Checking whether email or phone number exists

        /*
        // const checkUserByEmail = await UserModel.findOne({email: email});
        // const checkUserByPhone = await UserModel.findOne({phoneNumber: phoneNumber});

        // if(checkUserByEmail || checkUserByPhone){
        //     return res.json({ error: "User already Exists"});
        // }
        */

        // new method to find email or phonenumber exists
        // also these findEmailAndPhone() is defined inside User Schema Database as static 
        await UserModel.findEmailAndPhone(req.body.credentials);

        
        //hashing with salting
        
        /*
        const bcryptSalt = await bcrypt.genSalt(8);

        const hashedPassword = await bcrypt.hash(password, bcryptSalt);
        //above given two lines of code is replaced by pre() defined in User Database

        //DB
        await UserModel.create({
            ...req.body.credentials, 
            password: hashedPassword
        });
        */

        // hashing and salting because of pre() defined in User Database

        //new DB code 
        const newUser = await UserModel.create(req.body.credentials);

        //JWT Auth Token
        // const token = jwt.sign({user: {fullname, email}}, "ZummyApp");
        const token = newUser.generateJwtTokens();

        return res.status(200).json({Token : token});  

    }catch(error){
        return res.status(500).json({Error: error.message});
    }
});

/*
Route           /signin
Decription      Signin with email and Password
Params          None
Access          Public
Method          POST
*/
Router.post("/signin", async (req,res)=> {
    try{

        // new method to find email or password exists
        // also these findEmailAndPassword() is defined inside User Schema Database as static 
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        //JWT Auth Token
        const token = user.generateJwtTokens();

        return res.status(200).json({Token : token, status: "Success"});  

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

// Static and methods
// UserModel.ourStatic()
// checkUserByEmail.ourMethods()