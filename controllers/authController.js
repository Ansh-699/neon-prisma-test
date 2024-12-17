const bycrypt = require('bcryptjs');
const { PrismaClient } = require("@prisma/client");


const generateToken = require('../utils/jwt');
const { signUpSchema, signInSchema } = require('../utils/validate');


const prisma = new PrismaClient();

const signup = async (req, res) => {
    const { name, email, password } = req.body;


    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }else{


    try {
        const validatedData = signUpSchema.parse(req.body);
        const hashedPassword = await bycrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
            },
        });
        const token = generateToken(user.id);
        res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.errors });
    }
}
    
}


const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validatedData = signInSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User Doesnt exists" });
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user.id);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.errors });
    }
}

module.exports = { signup, signin };