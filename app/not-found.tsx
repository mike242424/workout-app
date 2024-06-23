import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-4 mt-10">
      <h1 className="font-bold text-3xl">Page Not Found</h1>
      <p>
        This page does not exist. Return
        <Link className="font-bold hover:underline ml-1" href="/workouts">
          home?
        </Link>
      </p>
    </main>
  );
};

export default NotFound;
