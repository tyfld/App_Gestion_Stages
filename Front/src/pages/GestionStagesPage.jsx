import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const GestionStagesPage = () => {
  const { user } = useUser();
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch('http://localhost/App_Gestion_Stages/Back/get_all_stages.php');
        const data = await response.json();

        if (data.success) {
          setStages(data.stages);
        } else {
          setError(data.message || 'Erreur lors du chargement des stages');
        }
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des stages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStages();
  }, []);

  const handleDelete = async (stageId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost/App_Gestion_Stages/Back/delete_stage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: stageId }),
      });

      const data = await response.json();

      if (data.success) {
        setStages(stages.filter(stage => stage.id !== stageId));
      } else {
        setError(data.message || 'Erreur lors de la suppression du stage');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la suppression du stage');
    }
  };

  const filteredStages = stages.filter(stage => {
    const matchesSearch = stage.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stage.entreprise_nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || stage.statut === statusFilter;
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
        <h1 className="text-2xl font-bold">Gestion des Stages</h1>
        <Link
          to="/admin/stages/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Créer un nouveau stage
        </Link>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Rechercher un stage..."
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
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entreprise
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Localisation
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
            {filteredStages.map((stage) => (
              <tr key={stage.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/stages/${stage.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {stage.titre}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stage.entreprise_nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stage.localisation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    stage.statut === 'actif' ? 'bg-green-100 text-green-800' :
                    stage.statut === 'inactif' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {stage.statut.charAt(0).toUpperCase() + stage.statut.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/admin/stages/edit/${stage.id}`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(stage.id)}
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

export default GestionStagesPage; 