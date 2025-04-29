import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenue sur la Plateforme de Gestion de Stages
          </h1>
          <p className="text-xl mb-8">
            Simplifiez la gestion des stages pour les étudiants, les entreprises et les enseignants
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Étudiants */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Pour les étudiants</h3>
              <ul className="space-y-2">
                <li>✓ Recherche de stages</li>
                <li>✓ Gestion des candidatures</li>
                <li>✓ Suivi des stages</li>
                <li>✓ Documents administratifs</li>
              </ul>
            </div>

            {/* Entreprises */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Pour les entreprises</h3>
              <ul className="space-y-2">
                <li>✓ Publication d'offres</li>
                <li>✓ Gestion des candidatures</li>
                <li>✓ Suivi des stagiaires</li>
                <li>✓ Évaluation des stages</li>
              </ul>
            </div>

            {/* Enseignants */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Pour les enseignants</h3>
              <ul className="space-y-2">
                <li>✓ Suivi des étudiants</li>
                <li>✓ Validation des stages</li>
                <li>✓ Évaluation des rapports</li>
                <li>✓ Communication avec les entreprises</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Besoin d'aide ?</h2>
          <p className="text-lg mb-8">
            Notre équipe est là pour vous accompagner dans l'utilisation de la plateforme.
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
