import authServices from "../services/authServices.js";
import validators from "../utils/validator.js";
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {
    const {firstName, lastName, emailId, password} = req.body;
    try{
        if(!firstName || !lastName || !emailId || !password){
            throw new Error("All fields are required");
        }

        validators.emailValidator(emailId);
        validators.passwordValidator(password);

        const user = await authServices.signup(firstName, lastName, emailId, password);
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie("token", token, {expires: new Date(Date.now() + 7*24*60*60*1000)});
        res.status(201).json({message: "User created successfully", data: user.rows[0]});
    }
    catch(err){
        res.status(400).json({message: "Something went wrong", error: err.message});
    }
}

const login = async (req, res) => {
    try{
        const {emailId, password} = req.body;
        if(!emailId || !password){
            throw new Error("All fields are required");
        }
        validators.emailValidator(emailId);
        const user = await authServices.login(emailId, password);
        const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie("token", token, {expires: new Date(Date.now() + 7*24*60*60*1000)});
        res.status(201).json({message: "Logged in successfully", data: user});

    }
    catch(err){
        res.status(400).json({message: "Something went wrong", error: err.message});
    }
}

export default {signup, login};