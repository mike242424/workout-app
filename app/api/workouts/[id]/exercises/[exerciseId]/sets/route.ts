import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { paramsExerciseIdSchema } from '@/validation/paramsExerciseIdSchema';
import { paramsWorkoutIdSchema } from '@/validation/paramsWorkoutIdSchema';
import { setSchema } from '@/validation/setSchema';

export async function POST(
  req: NextRequest,
  {
    params: { id: workoutId, exerciseId },
  }: { params: { id: string; exerciseId: string } },
) {
  try {
    const { reps, weight } = await req.json();

    if (!workoutId) {
      return NextResponse.json(
        { error: 'Invalid request. Workout id required.' },
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

    const validateExerciseId = paramsExerciseIdSchema.safeParse({ exerciseId });

    if (!validateExerciseId.success) {
      return NextResponse.json(
        { error: validateExerciseId.error.errors[0].message },
        { status: 403 },
      );
    }

    if (!reps) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise reps required.' },
        { status: 400 },
      );
    }

    if (!weight) {
      return NextResponse.json(
        { error: 'Invalid request. Exercise weight required.' },
        { status: 400 },
      );
    }

    const validateSet = setSchema.safeParse({ reps, weight });

    if (!validateSet.success) {
      return NextResponse.json(
        { error: validateSet.error.errors[0].message },
        { status: 403 },
      );
    }

    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
    });

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found.' },
        { status: 404 },
      );
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found.' },
        { status: 404 },
      );
    }

    const setCount = await prisma.set.count({
      where: { exerciseId },
    });

    const title = `Set ${setCount + 1}`;

    const newSet = await prisma.set.create({
      data: {
        title,
        reps,
        weight,
        exerciseId,
      },
    });

    return NextResponse.json(newSet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
