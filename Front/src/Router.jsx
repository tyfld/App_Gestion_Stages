import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

// Layouts
import DashboardLayout from './components/layouts/DashboardLayout';
import AdminLayout from './components/layouts/AdminLayout';
import EntrepriseLayout from './components/layouts/EntrepriseLayout';
import EtudiantLayout from './components/layouts/EtudiantLayout';
import EnseignantLayout from './components/layouts/EnseignantLayout';

// Pages publiques
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Pages protégées
import OffreStagePage from './pages/OffreStagePage';
import CandidaturePage from './pages/CandidaturePage';
import CreateStagePage from './pages/CreateStagePage';
import ProfilePage from './pages/ProfilePage';
import StageDetailsPage from './pages/StageDetailsPage';
import MesStagesPage from './pages/MesStagesPage';
import GestionStagesPage from './pages/GestionStagesPage';
import GestionEntreprisesPage from './pages/GestionEntreprisesPage';
import GestionUtilisateursPage from './pages/GestionUtilisateursPage';

// Composant de protection des routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function Router() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />

        {/* Routes protégées - Étudiant */}
        <Route
          path="/etudiant"
          element={
            <ProtectedRoute allowedRoles={['etudiant']}>
              <EtudiantLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OffreStagePage />} />
          <Route path="stages" element={<MesStagesPage />} />
          <Route path="candidatures" element={<CandidaturePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Routes protégées - Entreprise */}
        <Route
          path="/entreprise"
          element={
            <ProtectedRoute allowedRoles={['entreprise']}>
              <EntrepriseLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<GestionStagesPage />} />
          <Route path="offres" element={<OffreStagePage />} />
          <Route path="stages" element={<MesStagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Routes protégées - Enseignant */}
        <Route
          path="/enseignant"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <EnseignantLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<GestionStagesPage />} />
          <Route path="stages" element={<MesStagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Routes protégées - Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<GestionUtilisateursPage />} />
          <Route path="utilisateurs" element={<GestionUtilisateursPage />} />
          <Route path="entreprises" element={<GestionEntreprisesPage />} />
          <Route path="stages" element={<GestionStagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Routes communes */}
        <Route path="/stages/:id" element={<StageDetailsPage />} />
        <Route path="/stages/create" element={<CreateStagePage />} />

        {/* Route 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
