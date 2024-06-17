import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { paramsIdSchema } from '@/validation/paramsIdSchema';
import { workoutSchema } from '@/validation/workoutSchema';

export async function DELETE(
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
    });

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found.' },
        { status: 404 },
      );
    }

    await prisma.workout.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: 'Workout deleted successfully.' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const validateId = paramsIdSchema.safeParse({ id });

    if (!validateId.success) {
      return NextResponse.json(
        { error: validateId.error.errors[0].message },
        { status: 403 },
      );
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Invalid request. Title required.' },
        { status: 400 },
      );
    }

    const validateTitle = workoutSchema.safeParse({ title });

    if (!validateTitle.success) {
      return NextResponse.json(
        {
          error: validateTitle.error.errors[0].message,
        },
        { status: 403 },
      );
    }

    const workout = await prisma.workout.findUnique({
      where: {
        id,
      },
    });

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found.' },
        { status: 404 },
      );
    }

    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: { title },
    });

    return NextResponse.json(updatedWorkout);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
