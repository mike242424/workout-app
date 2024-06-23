import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { registerUserSchema } from '@/validation/registerUserSchema';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    const validateRegisterUserSchema = registerUserSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
    });

    if (!validateRegisterUserSchema.success) {
      return NextResponse.json(
        {
          error: validateRegisterUserSchema.error.errors[0].message,
        },
        { status: 400 },
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already in use.' },
        { status: 409 },
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already in use.' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        // newUser: {
        //   id: newUser.id,
        //   email: newUser.email,
        //   username: newUser.username,
        //   createdAt: newUser.updatedAt,
        //   updatedAt: newUser.updatedAt,
        // },
        message: 'User created successfully',
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
