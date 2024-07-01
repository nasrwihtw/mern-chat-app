import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if(password !== confirmPassword) {  
        return res.status(400).json({error:"Passwords don't match"});
    }
    
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        return res.status(400).json({error:"Please add all fields"});
    }
    if(password.length < 6) {
        return res.status(400).json({error:"Password must be at least 6 characters"});  
    }

    const user= await User.findOne({username});
    if(user) {
        return res.status(400).json({error:"User already exists"});
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder-iran.liara.run/


    const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
        fullName,
    
        username,
        password:hashedPassword,
        gender,
        profilPicture: gender === "male" ? boyProfilePic : girlProfilePic
    });
    
    if(newUser){
      // Generate token
      generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    
    res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        profilPicture: newUser.profilPicture,
    });
  }else{
    res.status(400).json({error:"Invalid user data"});
  }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(400).json({ error: "Internal Server Error"});
  }
};

export const login = async(req, res) => {
 try {
  const { username, password } = req.body;
  const user = await User.findOne({username});
  const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
  if(!user || !isPasswordCorrect) { 
    return res.status(500).json({error:"Invalid usernamne or password"});
  }
  generateTokenAndSetCookie(user._id, res);
    
  res.status(200).json({
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    gender: user.gender,
    profilPicture: user.profilPicture,
  });
  
 } catch (error) {
  console.log("Error in login controller", error.message);
  res.status(500).json({ error: "Internal Server Error"});
 }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0} );
    res.status(200).json({message:"Logout successfully"});
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error"});
  }
};

