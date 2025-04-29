import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const BaseLayout = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Gestion de Stages
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="mr-4">Bonjour, {user.prenom} {user.nom}</span>
                <Link to={`/${user.role}/profile`} className="hover:text-blue-200">
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Connexion
                </Link>
                <Link to="/register" className="hover:text-blue-200">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Gestion de Stages. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout; 