import React, { useEffect, useState } from "react";
import { getHistorique } from "../../api/api"; 

export function HistoriqueModal({ tacheId, token, onClose }) {
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const data = await getHistorique(tacheId, token);
        setHistorique(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer l'historique");
      } finally {
        setLoading(false);
      }
    };

    if (tacheId) fetchHistorique();
  }, [tacheId, token]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Historique de la tâche</h2>
        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && historique.length === 0 && <p>Aucune action enregistrée.</p>}
        <ul>
          {historique.map((h) => (
            <li key={h.id} className="mb-2 border-b pb-2">
              <p>
                <strong>{h.action}</strong> par <em>{h.user.login}</em>
              </p>
              <p className="text-gray-600 text-sm">{new Date(h.date).toLocaleString()}</p>
              <p className="text-gray-700">{h.details}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
