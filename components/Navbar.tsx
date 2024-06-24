import Link from 'next/link';
import LogoutButton from './logout-button';
import { getServerSession } from 'next-auth';

const Navbar = async () => {
  const session = await getServerSession();
  console.log(session?.user);

  return (
    <nav className="bg-gradient-to-r from-sky-500 to-sky-800 p-4">
      <div className="flex justify-between items-center">
        <Link className="font-bold text-4xl text-white" href="/">
          Lift
        </Link>

        {session && (
          <div className="flex justify-center items-center gap-2">
            <Link className="font-bold text-white" href="/workouts">
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
