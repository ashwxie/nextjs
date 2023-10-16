import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";

export async function POST(req: Request){
    try{    
        const body = await req.json();
        const { email, password } = body;

        const existingEmail = await db.user.findUnique({
            where: { email: email}
        });
        if(existingEmail){
            return NextResponse.json(
                { user: null, message: "User with this email already exist" },
                { status: 409}
            )
        }

        const hashedPassword = await hash(password, 2); // use bcrypt to hash password for security

        const newUser = await db.user.create({
            data:{
                email,
                password: hashedPassword
            }
        })
        const { password: newPassword, ...rest} = newUser;

        return NextResponse.json({ user: rest, message: "User created successful." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}