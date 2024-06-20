import prisma from '@/lib/db';
import { paramsExerciseIdSchema } from '@/validation/paramsExerciseIdSchema';
import { paramsSetIdSchema } from '@/validation/paramsSetIdSchema';
import { paramsWorkoutIdSchema } from '@/validation/paramsWorkoutIdSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  {
    params: { id: workoutId, exerciseId, setId },
  }: { params: { id: string; exerciseId: string; setId: string } },
) {
  try {
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

    if (!workoutId) {
      return NextResponse.json(
        { error: 'Invalid request. Workout id required.' },
        { status: 400 },
      );
    }

    const validateSetId = paramsSetIdSchema.safeParse({ setId });

    if (!validateSetId.success) {
      return NextResponse.json(
        { error: validateSetId.error.errors[0].message },
        { status: 403 },
      );
    }

    const set = await prisma.set.findUnique({
      where: {
        id: setId,
      },
    });

    return NextResponse.json(set)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' });
  }
}
