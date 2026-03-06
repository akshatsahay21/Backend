const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
    const {email,name, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({email});

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists with this email, please login"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        email, password: hash, name
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })  
})

// authRouter.post("/protected", (req, res) => {
//     console.log(require.cookies);
    
//     res.status(200).json({
//         message: "You have accessed the protected route"
//     })
// })

// controller functions for login and logout can be added here
authRouter.post("/login", async (req, res) => {
    const {email, password } = req.body;

    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(404).json({
            message: "User not found with this email, please register"
        })

    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "Login Successful",
        user,
        token
    })
})

module.exports = authRouter;