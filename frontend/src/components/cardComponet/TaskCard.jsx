import React from "react";
import { PermissionCard } from "./PermissionCard";

export function TaskCard({ t, currentUserId, canEdit, canDelete, onEdit, onDelete, onHistory }) {
  return (
    <>
      {t.image && (
        <div className="relative mb-2">
          <img
            src={`http://localhost:3000/uploads/${t.image}`}
            alt={t.nom}
            className="w-full h-32 object-cover rounded-xl shadow-md"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {t.audio && (
        <div className="mb-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm font-medium text-purple-700">Enregistrement audio</span>
          </div>
          <audio controls className="w-full">
            <source src={`http://localhost:3000/uploads/${t.audio}`} type="audio/webm" />
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900 leading-tight pr-2">{t.nom}</h3>
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 ${
            t.status
              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
              : "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${t.status ? "bg-green-500" : "bg-yellow-500"}`}></div>
          <span>{t.status ? "Terminée" : "En cours"}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3">{t.description}</p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${t.status ? "bg-green-500" : "bg-yellow-500"} animate-pulse`}></div>
          <span className="text-xs text-gray-500 font-medium">{t.status ? "Complétée" : "Active"}</span>
        </div>

        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(t)}
            disabled={!canEdit}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              canEdit
                ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50 transform hover:scale-110"
                : "text-gray-300 cursor-not-allowed"
            }`}
            title="Modifier"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(t.id)}
            disabled={!canDelete}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              canDelete
                ? "text-red-600 hover:text-red-700 hover:bg-red-50 transform hover:scale-110"
                : "text-gray-300 cursor-not-allowed"
            }`}
            title="Supprimer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={() => onHistory(t.id)}
            className="p-2.5 rounded-xl text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 transform hover:scale-110"
            title="Historique"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {t.userId === parseInt(currentUserId) && <PermissionCard tacheId={t.id} />}
    </>
  );
}