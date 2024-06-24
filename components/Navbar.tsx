import Link from 'next/link';
import LogoutButton from './logout-button';
import { getServerSession } from 'next-auth';

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <nav className="bg-gradient-to-r from-sky-500 to-sky-800 p-4">
      <div className="flex justify-between items-center">
        <Link className="font-bold text-4xl text-white" href="/">
          Lift
        </Link>

        {session && (
          <div className="flex justify-center items-center gap-4">
            <Link className="font-bold text-white" href="/workouts">
              My Workouts
            </Link>
            <Link className="font-bold text-white" href="/search">
              Find Exercises
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
