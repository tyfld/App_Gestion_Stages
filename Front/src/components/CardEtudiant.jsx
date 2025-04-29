function CardEtudiant({ etudiant }) {
  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold">{etudiant.nom} {etudiant.prenom}</h2>
      <p className="text-gray-600">{etudiant.email}</p>
    </div>
  )
}

export default CardEtudiant
