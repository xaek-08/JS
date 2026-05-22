
import { prisma } from '../../../db/prisma.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function register_user(data) {
    const existing = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (existing){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            hashed_password: hashedPassword
        }
    })
    return { id: user.id, name: user.name, email: user.email };
}

export async function login_user(data){
    const user = await prisma.user.findUnique({
        where: {email: data.email}
    })
    if (!user) throw new Error("Invalid credentials");

    const validPassword = await bcrypt.compare(data.password, user.hashed_password);
    if(!validPassword) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { userId: user.id , role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    return { token, user: { id: user.id, name: user.name, email: user.email } };
}