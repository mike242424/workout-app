import prisma from '@/lib/db';
import { excerciseSchema } from '@/validation/excerciseSchema';
import { paramsExcerciseIdSchema } from '@/validation/paramsExcerciseIdSchema';
import { paramsIdSchema } from '@/validation/paramsIdSchema';
import { paramsWorkoutIdSchema } from '@/validation/paramsWorkoutIdSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  {
    params: { id: workoutId, excerciseId },
  }: { params: { id: string; excerciseId: string } },
) {
  try {
    if (!workoutId) {
      return NextResponse.json(
        { error: 'Invalid request. Id required.' },
        { status: 400 },
      );
    }

    const validateId = paramsIdSchema.safeParse({ workoutId });

    if (!validateId.success) {
      return NextResponse.json(
        { error: validateId.error.errors[0].message },
        { status: 403 },
      );
    }

    if (!excerciseId) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise id required.' },
        { status: 400 },
      );
    }

    const validateExerciseId = paramsExcerciseIdSchema.safeParse({
      excerciseId,
    });

    if (!validateExerciseId.success) {
      return NextResponse.json(
        { error: validateExerciseId.error.errors[0].message },
        { status: 403 },
      );
    }

    const excercise = await prisma.exercise.findUnique({
      where: { id: excerciseId },
    });

    if (!excercise) {
      return NextResponse.json(
        {
          error: 'Exercise not found.',
        },
        { status: 404 },
      );
    }

    if (excercise.workoutId !== workoutId) {
      return NextResponse.json(
        {
          error: 'Exercise does not belong to the specified workout.',
        },
        { status: 404 },
      );
    }

    await prisma.exercise.delete({
      where: { id: excerciseId },
    });

    return NextResponse.json({ message: 'Exercise deleted successfully.' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  {
    params: { id: workoutId, excerciseId },
  }: { params: { id: string; excerciseId: string } },
) {
  try {
    const { title } = await req.json();

    if (!workoutId) {
      return NextResponse.json(
        { error: 'Invalid request. Id required.' },
        { status: 400 },
      );
    }

    const validateWorkoutId = paramsWorkoutIdSchema.safeParse({ workoutId });

    if (!validateWorkoutId.success) {
      return NextResponse.json(
        { error: validateWorkoutId.error.errors[0].message },
        { status: 403 },
      );
    }

    if (!excerciseId) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise id required.' },
        { status: 400 },
      );
    }

    const validateExerciseId = paramsExcerciseIdSchema.safeParse({
      excerciseId,
    });

    if (!validateExerciseId.success) {
      return NextResponse.json(
        { error: validateExerciseId.error.errors[0].message },
        { status: 403 },
      );
    }

    const validateTitle = excerciseSchema.safeParse({ title });

    if (!validateTitle.success) {
      return NextResponse.json(
        { error: validateTitle.error.errors[0].message },
        { status: 403 },
      );
    }

    const excercise = await prisma.exercise.findUnique({
      where: { id: excerciseId },
    });

    if (!excercise) {
      return NextResponse.json(
        {
          error: 'Exercise not found.',
        },
        { status: 404 },
      );
    }

    if (excercise.workoutId !== workoutId) {
      return NextResponse.json(
        {
          error: 'Exercise does not belong to the specified workout.',
        },
        { status: 404 },
      );
    }

    const updatedExcercise = await prisma.exercise.update({
      where: { id: excerciseId, workoutId },
      data: {
        title,
      },
    });

    return NextResponse.json(updatedExcercise);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
