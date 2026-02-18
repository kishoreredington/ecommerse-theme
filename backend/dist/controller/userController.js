import { User } from "../config/Database/Schemas/User.js";
import {} from "express";
import { AppDataSource } from "../config/Database/DBconfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    try {
        const { name, email, password } = req.body;
        // 1️⃣ Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        // 2️⃣ Basic email validation (optional but good practice)
        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }
        // 3️⃣ Check if user already exists
        const existingUser = await userRepo.findOne({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email",
            });
        }
        // 4️⃣ Create user (password will be hashed in entity)
        const user = userRepo.create({
            name,
            email,
            password,
        });
        await userRepo.save(user);
        // 5️⃣ Remove password before sending response
        const { password: _, ...userWithoutPassword } = user;
        return res.status(201).json({
            message: "User registered successfully",
            data: userWithoutPassword,
        });
    }
    catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const login = async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    try {
        const { email, password } = req.body;
        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        // 2️⃣ Check if user exists
        const user = await userRepo.findOne({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        // 3️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        // 4️⃣ Generate tokens
        const accessToken = jwt.sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        // 5️⃣ Set refresh token in HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in prod
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // 6️⃣ Send access token to frontend
        return res.status(200).json({
            message: "Login successful",
            accessToken,
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
//# sourceMappingURL=userController.js.map