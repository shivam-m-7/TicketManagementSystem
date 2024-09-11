import prisma from '../../DB/db.config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existUser) {
            res.json({
                sttaus: 400,
                message: 'Email Already taken. Please try agian'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        res.status(201).json({
            user
        })
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: 'User Registarion failed'
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user) {
            return res.json({
                status: 401,
                message: "User not found"
            })
        }

        // compare provided passowrd
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) {
            return res.json({
                status: 401,
                message: "Invalid email or password"
            })
        }

        //generate JWt
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return res.json({
            status: 200,
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            message: 'Login Failed'
        })
    }

}

export default { register, login }