import prisma from '@/lib/db';
import { exerciseSchema } from '@/validation/exerciseSchema';
import { paramsIdSchema } from '@/validation/paramsIdSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const { title } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid request. Id required.' },
        { status: 400 },
      );
    }

    const validateId = paramsIdSchema.safeParse({ id });

    if (!validateId.success) {
      return NextResponse.json(
        { error: validateId.error.errors[0].message },
        { status: 403 },
      );
    }

    if (!title) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise title required.' },
        { status: 400 },
      );
    }

    const validateTitle = exerciseSchema.safeParse({ title });

    if (!validateTitle.success) {
      return NextResponse.json(
        { error: validateTitle.error.errors[0].message },
        { status: 403 },
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

    const validate = paramsIdSchema.safeParse({ id });

    if (!validate.success) {
      return NextResponse.json(
        { error: validate.error.errors[0].message },
        { status: 403 },
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
