// Framework
import express from "express";

// Initialization
const zummy = express();

// Configuration
zummy.use(express.json());

zummy.get("/", (req,res) => 
    res.json({message : "Setup success Yay!!"}) 
);

zummy.listen(3000, () => console.log("Serer is running 🤞😂"));