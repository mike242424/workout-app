import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise title required.' },
        { status: 400 },
      );
    }

    const workout = await prisma.workout.findUnique({
      where: { id },
    });

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found.' },
        { status: 404 },
      );
    }

    const newExercise = await prisma.exercise.create({
      data: {
        title,
        workoutId: id,
      },
    });

    return NextResponse.json(newExercise, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    if (!id) {
      return NextResponse.json(
        { error: 'Invalid request. Id required.' },
        { status: 400 },
      );
    }

    const workout = await prisma.workout.findUnique({
      where: { id },
      include: { exercises: true },
    });

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found.' },
        { status: 404 },
      );
    }

    return NextResponse.json(workout);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
