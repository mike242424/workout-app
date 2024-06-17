import prisma from '@/lib/db';
import { workoutSchema } from '@/validation/workoutSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

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
