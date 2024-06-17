import prisma from '@/lib/db';
import { workoutSchema } from '@/validation/workoutSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
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

    const newWorkout = await prisma.workout.create({
      data: {
        title,
      },
    });

    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const workouts = await prisma.workout.findMany();

    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}