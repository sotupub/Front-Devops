import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/router';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Application Admin
        </h1>
        
        <p className="text-gray-600 mb-8">
          Bienvenue dans l'interface d'administration
        </p>

        <div className="space-y-4">
          <button
            onClick={handleAdminClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Connexion Admin
          </button>

          {isAuthenticated && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
              Vous êtes déjà connecté!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}