import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    address: [ {detail:{type: String}, for:{type: String}} ],
    phoneNumber: [ {type: Number} ]
},
{
    timestamps: true
});

// for creating the jwt tokens
UserSchema.methods.generateJwtTokens = function() {
    return jwt.sign({user: this._id.toString()},"ZummyApp");
    //return jwt.sign({user: {email,fullname}},"ZummyApp");
};

// finding the does the user exist already or not
UserSchema.statics.findEmailAndPhone = async ({email, phoneNumber}) => {
    // check whether the email exists
    const checkUserByEmail = await UserModel.findOne({email: email});

    // check user by the phoneNumber
    const checkUserByPhone = await UserModel.findOne({phoneNumber: phoneNumber});

    if( checkUserByEmail || checkUserByPhone){
        throw new Error("User Already exist");
    }

    return false;
};

// pre() for the hashing and salting
UserSchema.pre("save",function(next){
    const user = this;

    // password is not modified
    if(!user.isModified("password")) return next();

    //generating bcrypt salt
    bcrypt.genSalt(8,(error,salt)=>{
        if(error) return next(error);

        //hashing the password
        bcrypt.hash(user.password, salt, (error,hash) => {
            if(error) return next(error);

            //assigning hashed password
            user.password = hash;
            return next();
        });
    });
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;