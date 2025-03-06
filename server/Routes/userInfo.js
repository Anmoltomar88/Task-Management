import UserInfo from "../Database/model/userSchema.js";
import bcrypt from "bcrypt";

const SignUp = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
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
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        
        if (!user){ return res.status(404).json({ message: "User not found. Please sign up first." });}
        if (!isCorrectPassword){ return res.status(400).json({ message: "Password is not correct" });}
        
        const {  password: userPassword, ...otherInfo } = user._doc;
        res.status(200).json(otherInfo);
        
    } catch (error) {
        res.status(500).json({ message: "User not found. Please sign up first." });
    } 
}


export { SignIn, SignUp };
