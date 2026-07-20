const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {

    const token = jwt.sign(
        {
            id: userId,
            role: role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );

    return token;
}

module.exports = generateToken;