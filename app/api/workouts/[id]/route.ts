import prisma from '@/lib/db';
import { paramsIdSchema } from '@/validation/paramsIdSchema';
import { NextRequest, NextResponse } from 'next/server';

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
