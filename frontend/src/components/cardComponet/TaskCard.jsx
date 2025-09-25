import React from "react";
import { PermissionCard } from "./PermissionCard";

export function TaskCard({ t, currentUserId, canEdit, canDelete, onEdit, onDelete, onHistory }) {
  return (
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
            onClick={() => onEdit(t)}
            disabled={!canEdit}
            className={`p-2 rounded-lg transition-colors ${
              canEdit
                ? "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            modifier
          </button>
          <button
            onClick={() => onDelete(t.id)}
            disabled={!canDelete}
            className={`p-2 rounded-lg transition-colors ${
              canDelete
                ? "text-gray-400 hover:text-red-500 hover:bg-red-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            delete
          </button>
          <button
            onClick={() => onHistory(t.id)}
            className="w- p-2 rounded-lg text-gray-400 hover:text-purple-500 hover:bg-purple-50 transition-colors"
          >
            Historique
          </button>
        </div>
      </div>

      {t.userId === parseInt(currentUserId) && <PermissionCard tacheId={t.id} />}
    </>
  );
}