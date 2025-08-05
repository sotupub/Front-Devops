import { GetServerSideProps } from 'next';
import nookies from 'nookies';

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 500, margin: 'auto', paddingTop: 100 }}>
      <h1>Bienvenue Admin</h1>
      <form method="POST" action="/api/auth/logout">
        <button type="submit">Déconnexion</button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};
