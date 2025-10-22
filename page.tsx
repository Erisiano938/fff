
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AcademyManager() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique vers la page d'accueil
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Redirection vers l'accueil...</p>
      </div>
    </div>
  );
}
