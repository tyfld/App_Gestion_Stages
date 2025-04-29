import { useEffect, useState } from "react"
import { getEtudiants } from "../services/EtudiantService"
import CardEtudiant from "../components/CardEtudiant"
import DashboardLayout from "../components/DashboardLayout"

function EtudiantPage() {
  const [etudiants, setEtudiants] = useState([])

  useEffect(() => {
    getEtudiants()
      .then(data => setEtudiants(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Liste des étudiants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {etudiants.map(e => (
          <CardEtudiant key={e.id} etudiant={e} />
        ))}
      </div>
    </DashboardLayout>
  )
}

export default EtudiantPage
