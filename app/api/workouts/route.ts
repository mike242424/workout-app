import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getToken } from 'next-auth/jwt';
import { workoutSchema } from '@/validation/workoutSchema';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.email) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Invalid request. Title required.' },
        { status: 400 },
      );
    }

    const validate = workoutSchema.safeParse({ title });

    if (!validate.success) {
      return NextResponse.json(
        { error: validate.error.errors[0].message },
        { status: 403 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const newWorkout = await prisma.workout.create({
      data: {
        title,
        userId: user.id,
      },
    });

    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.email) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const workouts = await prisma.workout.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
