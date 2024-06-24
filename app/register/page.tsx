import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import RegisterUserForm from './register-user-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const RegisterPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workouts`);
  }

  return (
    <main className="flex items-center justify-center mt-10">
      <Card className="w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl mt-4 text-center">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterUserForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          Already have an account?
          <Link href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/`}>
            <span className="ml-1 font-bold hover:underline text-primary">
              Login
            </span>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default RegisterPage;
