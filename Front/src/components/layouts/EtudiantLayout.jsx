import { Outlet, Link, useLocation } from 'react-router-dom';
import BaseLayout from './BaseLayout';

const EtudiantLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <BaseLayout>
      <div className="flex">
        {/* Barre latérale */}
        <aside className="w-64 bg-gray-100 min-h-screen p-4">
          <nav className="space-y-2">
            <Link
              to="/etudiant"
              className={`block p-2 rounded ${
                isActive('/etudiant') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              to="/etudiant/stages"
              className={`block p-2 rounded ${
                isActive('/etudiant/stages') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Mes stages
            </Link>
            <Link
              to="/etudiant/candidatures"
              className={`block p-2 rounded ${
                isActive('/etudiant/candidatures') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Mes candidatures
            </Link>
            <Link
              to="/etudiant/profile"
              className={`block p-2 rounded ${
                isActive('/etudiant/profile') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Mon profil
            </Link>
          </nav>
        </aside>

        {/* Contenu principal */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </BaseLayout>
  );
};

export default EtudiantLayout; 