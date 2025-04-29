import { Link } from "react-router-dom"

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menu latéral */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Gestion Stages</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Accueil</Link>
          <Link to="/etudiants" className="text-gray-700 hover:text-blue-500">Étudiants</Link>
          <Link to="/offres" className="text-gray-700 hover:text-blue-500">Offres de stage</Link>
          <Link to="/entreprises" className="text-gray-700 hover:text-blue-500">Entreprises</Link>
          <Link to="/candidatures" className="text-gray-700 hover:text-blue-500">Candidatures</Link>
          <Link to="/stages" className="text-gray-700 hover:text-blue-500">Stages</Link>
          <Link to="/notifications" className="text-gray-700 hover:text-blue-500">Notifications</Link>
        </nav>
      </aside>

      {/* Contenu de la page */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
