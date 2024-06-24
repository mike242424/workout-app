'use client';

import { useState } from 'react';
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
import Spinner from '@/components/loading';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const WorkoutsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const { data, isLoading } = useQuery({
    queryKey: ['workouts', currentPage],
    queryFn: () => getWorkouts(currentPage, limit),
  });

  async function getWorkouts(page: number, limit: number) {
    const response = await axios.get('/api/workouts', {
      params: { page, limit },
    });
    return response.data;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="flex flex-col items-center justify-center mt-12">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-3xl">My Workouts</h1>
        <Link
          className="flex items-center justify-center bg-secondary text-white hover:bg-sky-500/80 w-10 h-10 rounded-full font-bold"
          href="/workouts/add"
        >
          +
        </Link>
      </div>
      <>
        {data?.data?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full p-4 justify-items-center gap-4">
            {data.data.map((workout: Workout) => (
              <Link
                className="w-full"
                href={`workouts/${workout.id}`}
                key={workout.id}
              >
                <Card className="hover:shadow-xl">
                  <CardHeader className="flex flex-col gap-3">
                    <CardTitle className="text-2xl">{workout.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <p className="text-lg">
                        <span className="font-bold">Date:</span>{' '}
                        {formatDate(workout.createdAt.toString())}
                      </p>
                      <p className="text-lg">
                        <span className="font-bold">Location:</span>{' '}
                        {workout.location}
                      </p>
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
      {data?.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''
                }
              />
            </PaginationItem>
            {[...Array(data?.totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < data?.totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === data?.totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
};

export default WorkoutsPage;
