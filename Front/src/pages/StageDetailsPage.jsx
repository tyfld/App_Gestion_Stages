import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const StageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [stage, setStage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    const fetchStageDetails = async () => {
      try {
        const response = await fetch(`http://localhost/App_Gestion_Stages/Back/get_stage.php?id=${id}`);
        const data = await response.json();

        if (data.success) {
          setStage(data.stage);
        } else {
          setError(data.message || 'Erreur lors du chargement des détails du stage');
        }
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des détails du stage');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStageDetails();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsApplying(true);
    setError('');

    try {
      const response = await fetch('http://localhost/App_Gestion_Stages/Back/apply_stage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage_id: id,
          user_id: user.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setApplicationSuccess(true);
      } else {
        setError(data.message || 'Erreur lors de la candidature');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la candidature');
    } finally {
      setIsApplying(false);
    }
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

  if (!stage) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Stage non trouvé
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{stage.titre}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Entreprise</h2>
              <p className="text-gray-600">{stage.entreprise_nom}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Localisation</h2>
              <p className="text-gray-600">{stage.localisation}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Durée</h2>
              <p className="text-gray-600">{stage.duree} mois</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Rémunération</h2>
              <p className="text-gray-600">{stage.remuneration}€/mois</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{stage.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Compétences requises</h2>
            <ul className="list-disc list-inside text-gray-600">
              {stage.competences_requises.split(',').map((competence, index) => (
                <li key={index}>{competence.trim()}</li>
              ))}
            </ul>
          </div>

          {applicationSuccess ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Votre candidature a été envoyée avec succès !
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isApplying ? 'Envoi en cours...' : 'Postuler'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StageDetailsPage; 