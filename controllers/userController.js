import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else {
        res.status(401)
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});


const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('Invalid email or password');
    }

});

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('Invalid email or password');
    }
});

const updateUserPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { old_password, password } = req.body;
    if(user && (await user.matchPassword(old_password))){
        user.password = password;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    }else{
        res.status(401)
        throw new Error('Invalid password');
    }
})

export {
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
}