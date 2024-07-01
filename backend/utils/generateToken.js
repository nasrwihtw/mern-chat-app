import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        httpOnly: true, // to prevent XSS attacks cross-site scripting attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",  // CSRF atttacks cross-site request forgery attacks
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });
};

export default generateTokenAndSetCookie