import { Outlet, Link, useLocation } from 'react-router-dom';
import BaseLayout from './BaseLayout';

const DashboardLayout = () => {
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
              to="/dashboard"
              className={`block p-2 rounded ${
                isActive('/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              to="/dashboard/stages"
              className={`block p-2 rounded ${
                isActive('/dashboard/stages') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Mes stages
            </Link>
            <Link
              to="/dashboard/candidatures"
              className={`block p-2 rounded ${
                isActive('/dashboard/candidatures') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Mes candidatures
            </Link>
            <Link
              to="/dashboard/profile"
              className={`block p-2 rounded ${
                isActive('/dashboard/profile') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
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

export default DashboardLayout; 