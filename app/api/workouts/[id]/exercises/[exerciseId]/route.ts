import prisma from '@/lib/db';
import { exerciseSchema } from '@/validation/exerciseSchema';
import { paramsExerciseIdSchema } from '@/validation/paramsExerciseIdSchema';
import { paramsIdSchema } from '@/validation/paramsIdSchema';
import { paramsWorkoutIdSchema } from '@/validation/paramsWorkoutIdSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  {
    params: { id: workoutId, exerciseId },
  }: { params: { id: string; exerciseId: string } },
) {
  try {
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

    if (!exerciseId) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise id required.' },
        { status: 400 },
      );
    }

    const validateExerciseId = paramsExerciseIdSchema.safeParse({
      exerciseId,
    });

    if (!validateExerciseId.success) {
      return NextResponse.json(
        { error: validateExerciseId.error.errors[0].message },
        { status: 403 },
      );
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
      include: { sets: true },
    });

    if (!exercise) {
      return NextResponse.json(
        {
          error: 'Exercise not found.',
        },
        { status: 404 },
      );
    }

    if (exercise.workoutId !== workoutId) {
      return NextResponse.json(
        {
          error: 'Exercise does not belong to the specified workout.',
        },
        { status: 404 },
      );
    }

    await prisma.exercise.delete({
      where: { id: exerciseId },
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
    params: { id: workoutId, exerciseId },
  }: { params: { id: string; exerciseId: string } },
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

    if (!exerciseId) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise id required.' },
        { status: 400 },
      );
    }

    const validateExerciseId = paramsExerciseIdSchema.safeParse({
      exerciseId,
    });

    if (!validateExerciseId.success) {
      return NextResponse.json(
        { error: validateExerciseId.error.errors[0].message },
        { status: 403 },
      );
    }

    const validateTitle = exerciseSchema.safeParse({ title });

    if (!validateTitle.success) {
      return NextResponse.json(
        { error: validateTitle.error.errors[0].message },
        { status: 403 },
      );
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      return NextResponse.json(
        {
          error: 'Exercise not found.',
        },
        { status: 404 },
      );
    }

    if (exercise.workoutId !== workoutId) {
      return NextResponse.json(
        {
          error: 'Exercise does not belong to the specified workout.',
        },
        { status: 404 },
      );
    }

    const updatedExercise = await prisma.exercise.update({
      where: { id: exerciseId, workoutId },
      data: {
        title,
      },
    });

    return NextResponse.json(updatedExercise);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  {
    params: { id: workoutId, exerciseId },
  }: { params: { id: string; exerciseId: string } },
) {
  try {
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

    if (!exerciseId) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise id required.' },
        { status: 400 },
      );
    }

    const validateExerciseId = paramsExerciseIdSchema.safeParse({
      exerciseId,
    });

    if (!validateExerciseId.success) {
      return NextResponse.json(
        { error: validateExerciseId.error.errors[0].message },
        { status: 403 },
      );
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId, workoutId },
    });

    if (!exercise) {
      return NextResponse.json(
        {
          error: 'Exercise not found.',
        },
        { status: 404 },
      );
    }

    if (exercise.workoutId !== workoutId) {
      return NextResponse.json(
        {
          error: 'Exercise does not belong to the specified workout.',
        },
        { status: 404 },
      );
    }

    const updatedExercise = await prisma.exercise.findUnique({
      where: { id: exerciseId, workoutId },
    });

    return NextResponse.json(updatedExercise);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
