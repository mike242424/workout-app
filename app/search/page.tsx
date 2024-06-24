'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/loading';

interface Exercise {
  id: string;
  name: string;
  equipment: string;
  gifUrl: string;
  instructions: string[];
}

const targetMuscles = [
  'Abductors',
  'Abs',
  'Adductors',
  'Biceps',
  'Calves',
  'Cardiovascular System',
  'Delts',
  'Forearms',
  'Glutes',
  'Hamstrings',
  'Lats',
  'Levator Scapulae',
  'Pectorals',
  'Quads',
  'Serratus Anterior',
  'Spine',
  'Traps',
  'Triceps',
  'Upper Back',
];

const SearchExercise = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data, isLoading } = useQuery<Exercise[]>({
    queryKey: ['exercises', selectedMuscle],
    queryFn: () =>
      selectedMuscle ? fetchExercises(selectedMuscle) : Promise.resolve([]),
    enabled: !!selectedMuscle,
  });

  async function fetchExercises(muscle: string) {
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/target/${muscle.toLowerCase()}?limit=200`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_EXERCISEDB_API_KEY!,
          'X-RapidAPI-Host': process.env.NEXT_PUBLIC_EXERCISEDB_HOST!,
        },
        cache: 'no-cache',
      },
    );
    setDropdownOpen(false);

    return response.json();
  }

  function handleClick(muscle: string) {
    setSelectedMuscle(muscle);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="flex flex-col items-center mt-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-3xl">Find Exercises</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="m-1 p-3 bg-sky-700 hover:bg-black text-white rounded font-bold">
            Select Target Muscle
          </DropdownMenuTrigger>
          <DropdownMenuContent className="hover:shadow-lg menu z-[1] text-black w-96 grid grid-cols-3 rounded">
            {targetMuscles.map((muscle, index) => (
              <DropdownMenuItem
                className="font-bold p-3 text-left cursor-pointer data-[highlighted]:bg-sky-100"
                key={index}
                onClick={() => handleClick(muscle)}
              >
                {muscle}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <>
          {data?.map((exercise: Exercise) => (
            <Card
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-justify mx-12 my-4 p-4 hover:shadow-lg"
              key={exercise.id}
            >
              <CardContent className="p-6">
                <div>
                  <span className="font-bold">Exercise: </span>
                  {capitalizeFirstLetter(exercise.name)}
                </div>
                <div>
                  <span className="font-bold">Equipment: </span>
                  {capitalizeFirstLetter(exercise.equipment)}
                </div>
                <div>
                  <div>
                    <span className="font-bold">Instructions: </span>
                  </div>
                  {exercise.instructions.map((exercise, index) => (
                    <div key={index}>
                      {index + 1}. {exercise}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center md:justify-end">
                <Image
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  width={200}
                  height={200}
                  style={{ width: 'auto', height: 'auto' }}
                  unoptimized
                />
              </CardFooter>
            </Card>
          ))}
        </>
      </div>
    </main>
  );
};

export default SearchExercise;
