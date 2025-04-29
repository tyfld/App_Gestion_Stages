import { Outlet, Link, useLocation } from 'react-router-dom';
import BaseLayout from './BaseLayout';

const EntrepriseLayout = () => {
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
              to="/entreprise"
              className={`block p-2 rounded ${
                isActive('/entreprise') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              to="/entreprise/offres"
              className={`block p-2 rounded ${
                isActive('/entreprise/offres') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Gérer les offres
            </Link>
            <Link
              to="/entreprise/stages"
              className={`block p-2 rounded ${
                isActive('/entreprise/stages') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Stages en cours
            </Link>
            <Link
              to="/entreprise/profile"
              className={`block p-2 rounded ${
                isActive('/entreprise/profile') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Profil entreprise
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

export default EntrepriseLayout; 