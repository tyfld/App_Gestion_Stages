import { useState } from 'react';

function CreateStagePage() {
  const [formData, setFormData] = useState({
    date_debut: '',
    date_fin: '',
    note: '',
    commentaire: '',
    nom_fichier: '',
    type_document: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'nom_fichier') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost/App_Gestion_Stages/Back/stage_create.php', {
        method: 'POST',
        body: dataToSend,
      });

      const result = await response.json();
      if (result.success) {
        alert('Stage créé avec succès !');
        setFormData({
          date_debut: '',
          date_fin: '',
          note: '',
          commentaire: '',
          nom_fichier: '',
          type_document: '',
        });
      } else {
        alert('Erreur : ' + result.message);
      }

    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Créer un stage</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Date début :</label>
          <input type="date" name="date_debut" value={formData.date_debut} onChange={handleChange} className="input" required />
        </div>

        <div>
          <label>Date fin :</label>
          <input type="date" name="date_fin" value={formData.date_fin} onChange={handleChange} className="input" required />
        </div>

        <div>
          <label>Note :</label>
          <input type="number" name="note" value={formData.note} onChange={handleChange} className="input" min="0" max="20" />
        </div>

        <div>
          <label>Commentaire :</label>
          <textarea name="commentaire" value={formData.commentaire} onChange={handleChange} className="input" />
        </div>

        <div>
          <label>Type de document :</label>
          <input type="text" name="type_document" value={formData.type_document} onChange={handleChange} className="input" />
        </div>

        <div>
          <label>Fichier :</label>
          <input type="file" name="nom_fichier" onChange={handleChange} className="input" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default CreateStagePage;
