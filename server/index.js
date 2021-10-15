// ENV variable
require("dotenv").config();

// Framework
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config";

//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";

//Database connection
import ConnectDB from "./database/connection";

// Initialization
const zummy = express();

// Configuration application middlewears
zummy.use(express.json());
zummy.use(express.urlencoded({extended: false}));
zummy.use(cors());
zummy.use(helmet());
zummy.use(passport.initialize());  // with google OAuth
zummy.use(passport.session());     // with google OAuth

// passport configuration
googleAuthConfig(passport);

// For application routes
// localhost:3001/auth/signup
zummy.use("/auth", Auth);
zummy.use("/restaurant", Restaurant);
zummy.use("/food", Food);
zummy.use("/menu", Menu);

zummy.get("/", (req,res) => 
    res.json({message : "Setup success Yay!!"}) 
);

zummy.listen(3001, () => 
    ConnectDB()
    .then(() => console.log("Serer is running 🤞😂"))
    .catch(() => console.log("MongoDB connection failed 😭😭"))
);