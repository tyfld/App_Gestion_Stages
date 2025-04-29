export async function getEtudiants() {
    const res = await fetch('http://localhost/App_Gestion_Stages/Back/etudiantModel.php?action=read')
    if (!res.ok) {
      throw new Error('Erreur lors du chargement des étudiants')
    }
    return res.json()
  }
  