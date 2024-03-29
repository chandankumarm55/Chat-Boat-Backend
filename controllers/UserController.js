const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const emailVerify = await User.findOne({ email });
        if (emailVerify) {
            return res.status(400).json({
                message: "Email already used",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Specify salt rounds (e.g., 10)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(200).json({
            message: "User created successfully",
            success: true,
            user: newUser // Return the newly created user data
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
            });
        }
        const passwordVerify = await bcrypt.compare(password, user.password);
        if (!passwordVerify) {
            return res.status(400).json({
                message: "Incorrect email or password",
            });
        }
        return res.status(200).json({
            message: "Login successful",
            user // Return the user data after successful login
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.GenerateContent = async (req, res) => {
    const genAI = new GoogleGenerativeAI("AIzaSyDQL1HEipgwKsoXv4bDvT6nbmYn070b-sE");
    let conversationHistory = [{
        role: 'system',
        content: "You are a helful Ai"
    }];
    const userMessage = req.body.message;
    conversationHistory.push({
        role: "user",
        content: userMessage
    })
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro"
        })
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const botResponse = await response.text();



        const formattedResponseAnswer = formattedResponse(botResponse);
        conversationHistory.push({
            role: "assistant",
            content: botResponse
        });
        return res.json({
            message: formattedResponseAnswer
        })

        function formattedResponse(response) {
            return response.replace(/\*(.*?)\*/g, '$1');
        }


    } catch (error) {
        return res.status(500).json({
            error: error.message
        })

    }



}