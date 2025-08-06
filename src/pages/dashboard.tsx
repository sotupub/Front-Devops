import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

export default function Dashboard({ username }: { username: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold">Bienvenue  {username}</h1>
      <form method="post" action="/api/auth/logout">
        <button type="submit" className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
          Se déconnecter
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = nookies.get(context);
  const token = cookies.token;

  if (!token) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKeyChangeMoi') as any;

    if (decoded.role !== 'admin') {
      throw new Error('Non autorisé');
    }

    return { props: { username: decoded.username } };
  } catch {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }
}
