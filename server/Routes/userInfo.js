import UserInfo from "../Database/model/userSchema.js";
import CryptoJS from "crypto-js";

const SignUp = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = CryptoJS.SHA256(password).toString();
        const newUser = new UserInfo({
            email: email,
            username: username, 
            password: hashedPassword 
        });
        await newUser.save();
        res.status(200).json({ user: newUser });    
    } catch (error) {
        res.status(400).json({ message: "user already exist" });
    }
}
// 
const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserInfo.findOne({ email: email });
        const hashedPassword = CryptoJS.SHA256(req.body.password).toString();
        
        if (!user){ return res.status(404).json({ message: "User not found. Please sign up first." });}
        if (hashedPassword !== user.password){ return res.status(400).json({ message: "Password is not correct" });}
        
        const {  password: userPassword, ...otherInfo } = user._doc;
        res.status(200).json(otherInfo);
        
    } catch (error) {
        res.status(500).json({ message: "User not found. Please sign up first." });
    } 
}


export { SignIn, SignUp };
