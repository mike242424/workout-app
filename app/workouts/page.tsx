'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/formatDate';
import { Workout } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const WorkoutsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
  });

  async function getWorkouts() {
    const response = await axios.get('/api/workouts');
    return response.data;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="font-bold text-3xl mt-4">My Workouts</h1>
      <div className="grid grid-cols-3 w-full p-4 justify-items-center">
        {data?.map((workout: Workout) => (
          <Link
            className="w-full p-4"
            href={`workouts/${workout.id}`}
            key={workout.id}
          >
            <Card>
              <CardHeader>
                <CardTitle>{workout.title}</CardTitle>
                <CardDescription>
                  Date: {formatDate(workout.createdAt.toString())}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default WorkoutsPage;
