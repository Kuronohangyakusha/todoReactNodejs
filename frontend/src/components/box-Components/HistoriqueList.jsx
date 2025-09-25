import React, { useEffect, useState } from "react";
import { getAllHistorique } from "../../api/api";

export function HistoriqueList({ token }) {
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllHistorique = async () => {
      try {
        const data = await getAllHistorique(token);
        setHistorique(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer l'historique");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAllHistorique();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Historique Global</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && historique.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Aucune action enregistrée.</p>
        </div>
      )}

      {!loading && !error && historique.length > 0 && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <ul className="space-y-4">
              {historique.map((h) => (
                <li key={h.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">
                        <strong>{h.action}</strong> sur "{h.tache.nom}"
                      </p>
                      <p className="text-gray-600 text-sm">
                        par <em>{h.user.login}</em>
                      </p>
                      {h.details && (
                        <p className="text-gray-700 mt-1">{h.details}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(h.date).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}