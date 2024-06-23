import Link from 'next/link';
import LogoutButton from './logout-button';
import { getServerSession } from 'next-auth';

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <nav className="bg-sky-500 p-4">
      <div className="flex justify-between items-center">
        <Link className="font-bold text-4xl " href="/">
          Workout App
        </Link>

        {session && (
          <div className="flex justify-center items-center gap-2">
            <Link className="font-bold" href="/workouts">
              Workouts
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
