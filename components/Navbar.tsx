import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-sky-500 p-4">
      <div className="flex justify-between items-center">
        <Link className="font-bold text-4xl " href="/">
          Workout App
        </Link>
        <Link className="font-bold" href="/workouts">
          Workouts
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
