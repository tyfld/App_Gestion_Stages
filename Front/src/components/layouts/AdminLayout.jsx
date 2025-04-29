import { Outlet, Link, useLocation } from 'react-router-dom';
import BaseLayout from './BaseLayout';

const AdminLayout = () => {
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
              to="/admin"
              className={`block p-2 rounded ${
                isActive('/admin') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              to="/admin/utilisateurs"
              className={`block p-2 rounded ${
                isActive('/admin/utilisateurs') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Gestion des utilisateurs
            </Link>
            <Link
              to="/admin/entreprises"
              className={`block p-2 rounded ${
                isActive('/admin/entreprises') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Gestion des entreprises
            </Link>
            <Link
              to="/admin/stages"
              className={`block p-2 rounded ${
                isActive('/admin/stages') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Gestion des stages
            </Link>
            <Link
              to="/admin/profile"
              className={`block p-2 rounded ${
                isActive('/admin/profile') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
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

export default AdminLayout; 