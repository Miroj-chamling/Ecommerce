const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require("../helpers/dbhandler");


exports.home = (req,res) =>{
    const user = User(req.body)
    res.json(user);
}

exports.signup = (req,res) => {
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((error,user)=>{
        if(error){
            return res.status(400).json({
                err:  errorHandler(error)
            })
        }
        else{
            res.json({
                user
            })
        }
    })
};

exports.signin = (req,res) =>{
    const {email, password} = req.body
    User.findOne({email}, (error, user) =>{
        if(error || !user){
            return res.status(400).json({
                err: 'User with that email does not exist. Please sign up'
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json(
                {
                    error: 'Email and password dont match'
                }
            )
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie('t', token, {expire: new Date() + 9999})
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}});
    })
};

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message: " signed out successfully!"});
}