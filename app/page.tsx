import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import LoginUserForm from '@/components/login-user-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const LoginPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/workouts');
  }

  return (
    <main className="flex items-center justify-center mt-20">
      <Card className="w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl mt-4 text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginUserForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          Create an account?
          <Link href="/register">
            <span className="ml-1 font-bold hover:underline">Register</span>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
