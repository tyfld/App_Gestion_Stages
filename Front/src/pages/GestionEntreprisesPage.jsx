import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const GestionEntreprisesPage = () => {
  const { user } = useUser();
  const [entreprises, setEntreprises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const response = await fetch('http://localhost/App_Gestion_Stages/Back/get_all_entreprises.php');
        const data = await response.json();

        if (data.success) {
          setEntreprises(data.entreprises);
        } else {
          setError(data.message || 'Erreur lors du chargement des entreprises');
        }
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des entreprises');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntreprises();
  }, []);

  const handleDelete = async (entrepriseId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost/App_Gestion_Stages/Back/delete_entreprise.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: entrepriseId }),
      });

      const data = await response.json();

      if (data.success) {
        setEntreprises(entreprises.filter(entreprise => entreprise.id !== entrepriseId));
      } else {
        setError(data.message || 'Erreur lors de la suppression de l\'entreprise');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la suppression de l\'entreprise');
    }
  };

  const filteredEntreprises = entreprises.filter(entreprise => {
    const matchesSearch = entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entreprise.ville.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || entreprise.statut === statusFilter;
    return matchesSearch && matchesStatus;
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
        <h1 className="text-2xl font-bold">Gestion des Entreprises</h1>
        <Link
          to="/admin/entreprises/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ajouter une entreprise
        </Link>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Rechercher une entreprise..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="tous">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="archive">Archivé</option>
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
                Ville
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Secteur d'activité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEntreprises.map((entreprise) => (
              <tr key={entreprise.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/entreprises/${entreprise.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {entreprise.nom}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entreprise.ville}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entreprise.secteur_activite}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    entreprise.statut === 'actif' ? 'bg-green-100 text-green-800' :
                    entreprise.statut === 'inactif' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {entreprise.statut.charAt(0).toUpperCase() + entreprise.statut.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/admin/entreprises/edit/${entreprise.id}`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(entreprise.id)}
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

export default GestionEntreprisesPage; 