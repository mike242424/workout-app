'use client';

import Link from 'next/link';
import { Workout } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDate } from '@/lib/formatDate';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const WorkoutsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
  });

  async function getWorkouts() {
    const response = await axios.get('/api/workouts');
    return response.data;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center mt-12">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-3xl">My Workouts</h1>
        <Link
          className="flex items-center justify-center bg-green-600 hover:bg-opacity-80 w-10 h-10 rounded-full font-bold"
          href="/workouts/add"
        >
          +
        </Link>
      </div>
      <>
        {data?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full p-4 justify-items-center gap-4">
            {data.map((workout: Workout) => (
              <Link
                className="w-full"
                href={`workouts/${workout.id}`}
                key={workout.id}
              >
                <Card className="hover:shadow-xl">
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
        ) : (
          <p className="mt-4">Add a workout</p>
        )}
      </>
    </main>
  );
};

export default WorkoutsPage;
