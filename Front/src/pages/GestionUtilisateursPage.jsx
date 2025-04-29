import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const GestionUtilisateursPage = () => {
  const { user } = useUser();
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('tous');

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch('http://localhost/App_Gestion_Stages/Back/get_all_utilisateurs.php');
        const data = await response.json();

        if (data.success) {
          setUtilisateurs(data.utilisateurs);
        } else {
          setError(data.message || 'Erreur lors du chargement des utilisateurs');
        }
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des utilisateurs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUtilisateurs();
  }, []);

  const handleDelete = async (utilisateurId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost/App_Gestion_Stages/Back/delete_utilisateur.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: utilisateurId }),
      });

      const data = await response.json();

      if (data.success) {
        setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.id !== utilisateurId));
      } else {
        setError(data.message || 'Erreur lors de la suppression de l\'utilisateur');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la suppression de l\'utilisateur');
    }
  };

  const filteredUtilisateurs = utilisateurs.filter(utilisateur => {
    const matchesSearch = utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         utilisateur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'tous' || utilisateur.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <Link
          to="/admin/utilisateurs/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ajouter un utilisateur
        </Link>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="tous">Tous les rôles</option>
          <option value="admin">Administrateur</option>
          <option value="etudiant">Étudiant</option>
          <option value="entreprise">Entreprise</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUtilisateurs.map((utilisateur) => (
              <tr key={utilisateur.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/utilisateurs/${utilisateur.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {utilisateur.nom}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {utilisateur.prenom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {utilisateur.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    utilisateur.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    utilisateur.role === 'etudiant' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {utilisateur.role.charAt(0).toUpperCase() + utilisateur.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/admin/utilisateurs/edit/${utilisateur.id}`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(utilisateur.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionUtilisateursPage; 