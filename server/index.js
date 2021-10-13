// Framework
import express from "express";
import cors from "cors";
import helmet from "helmet";

// Initialization
const zummy = express();

// Configuration
zummy.use(express.json());
zummy.use(express.urlencoded({extended: false}));
zummy.use(cors());
zummy.use(helmet());

zummy.get("/", (req,res) => 
    res.json({message : "Setup success Yay!!"}) 
);

zummy.listen(3000, () => console.log("Serer is running 🤞😂"));