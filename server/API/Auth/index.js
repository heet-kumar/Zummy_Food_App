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
        const { email, password, fullname, phoneNumber} = req.body.credentials;

        // Checking whether email or phone number exists

        // const checkUserByEmail = await UserModel.findOne({email: email});
        // const checkUserByPhone = await UserModel.findOne({phoneNumber: phoneNumber});

        // if(checkUserByEmail || checkUserByPhone){
        //     return res.json({ error: "User already Exists"});
        // }

        // new method to find email or phonen exists
        // also these findEmailAndPhone() is defined inside User Schema Database as static 
        await UserModel.findEmailAndPhone(email,phoneNumber);

        // hashing with salting
        // const bcryptSalt = await bcrypt.genSalt(8);

        // const hashedPassword = await bcrypt.hash(password, bcryptSalt);
        // above given two lines of code is replaced by pre() defined in User Database

        //DB
        // await UserModel.create({
        //     ...req.body.credentials, 
        //     password: hashedPassword
        // });

        //new DB code because of pre() defined in User Database
        await UserModel.create(req.body.credentials);

        //JWT Auth Token
        const token = jwt.sign({user: {fullname, email}}, "ZummyApp");

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

// Static and methods
// UserModel.ourStatic()
// checkUserByEmail.ourMethods()