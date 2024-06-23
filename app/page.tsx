import RegisterUserForm from '@/components/register-user-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <main className="flex items-center justify-center mt-20">
      <Card className="w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl mt-4 text-center">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterUserForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default HomePage;
