import React, { useState } from "react";
import useTache from "../../context/tacheContext";
import { PermissionCard } from "./PermissionCard";
import { HistoriqueModal } from "./HistoriqueModal";

export function CardComponent({ taches, currentUserId, token }) {
  const { removeTache, updateTache } = useTache();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ nom: "", description: "", status: false });
  const [errorMessage, setErrorMessage] = useState("");
  const [showHistoriqueId, setShowHistoriqueId] = useState(null); // ✅ popup

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditValues({ nom: t.nom, description: t.description, status: t.status });
    setErrorMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveEdit = async () => {
    const result = await updateTache(editingId, editValues);
    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      setErrorMessage("");
      setEditingId(null);
    }
  };

  return (
    <>
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {taches.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              {editingId === t.id ? (
                <div className="space-y-2">
                  <input
                    name="nom"
                    value={editValues.nom}
                    onChange={handleChange}
                    className="border p-1 w-full rounded"
                    placeholder="Nom"
                  />
                  <textarea
                    name="description"
                    value={editValues.description}
                    onChange={handleChange}
                    className="border p-1 w-full rounded"
                    placeholder="Description"
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="status"
                      checked={editValues.status}
                      onChange={handleChange}
                    />
                    <span>Status terminée</span>
                  </label>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                  )}
                </div>
              ) : (
                <>
                  {t.image && (
                    <img
                      src={`http://localhost:3000/uploads/${t.image}`}
                      alt={t.nom}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">{t.nom}</h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        t.status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {t.status ? "✓ Terminée" : "En cours"}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          t.status ? "bg-green-400" : "bg-yellow-400"
                        }`}
                      ></div>
                      <span className="text-xs text-gray-500">{t.status ? "Complétée" : "Active"}</span>
                    </div>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => startEdit(t)}
                        disabled={t.userId !== parseInt(currentUserId)}
                        className={`p-2 rounded-lg transition-colors ${
                          t.userId === parseInt(currentUserId)
                            ? "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        modifier
                      </button>
                      <button
                        onClick={() => removeTache(t.id)}
                        disabled={t.userId !== parseInt(currentUserId)}
                        className={`p-2 rounded-lg transition-colors ${
                          t.userId === parseInt(currentUserId)
                            ? "text-gray-400 hover:text-red-500 hover:bg-red-50"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        delete
                      </button>
                      <button
                        onClick={() => setShowHistoriqueId(t.id)}
                        className="w- p-2 rounded-lg text-gray-400 hover:text-purple-500 hover:bg-purple-50 transition-colors"
                      >
                        Historique
                      </button>
                    </div>
                  </div>

                  {t.userId === parseInt(currentUserId) && <PermissionCard tacheId={t.id} />}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showHistoriqueId && (
        <HistoriqueModal
          tacheId={showHistoriqueId}
          token={token}
          onClose={() => setShowHistoriqueId(null)}
        />
      )}
    </>
  );
}
