import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  //const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/pos/dashboard');
  } else {
    redirect('/pos/login');
  }
}
