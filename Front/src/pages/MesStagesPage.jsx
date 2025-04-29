import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const MesStagesPage = () => {
  const { user } = useUser();
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStages = async () => {
      if (!user) return;

      try {
        const response = await fetch(`http://localhost/App_Gestion_Stages/Back/get_user_stages.php?user_id=${user.id}`);
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
  }, [user]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      'en_attente': 'bg-yellow-100 text-yellow-800',
      'accepte': 'bg-green-100 text-green-800',
      'refuse': 'bg-red-100 text-red-800',
    };

    const statusText = {
      'en_attente': 'En attente',
      'accepte': 'Accepté',
      'refuse': 'Refusé',
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Stages</h1>

      {stages.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-600">Vous n'avez pas encore postulé à des stages.</p>
          <Link
            to="/stages"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voir les offres de stage
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {stages.map((stage) => (
            <div key={stage.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      <Link to={`/stages/${stage.id}`} className="hover:text-blue-600">
                        {stage.titre}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mt-1">{stage.entreprise_nom}</p>
                  </div>
                  {getStatusBadge(stage.statut_candidature)}
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Localisation</p>
                    <p className="text-gray-900">{stage.localisation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="text-gray-900">{stage.duree} mois</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rémunération</p>
                    <p className="text-gray-900">{stage.remuneration}€/mois</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date de candidature</p>
                    <p className="text-gray-900">
                      {new Date(stage.date_candidature).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/stages/${stage.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Voir les détails →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MesStagesPage; 