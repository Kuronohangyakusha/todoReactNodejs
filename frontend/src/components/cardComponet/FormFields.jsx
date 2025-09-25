import React from "react";

export function FormFields({ nom, setNom, description, setDescription, errors, disabled = false }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Nom de la tâche *
        </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Entrez le nom de votre tâche"
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            errors.nom ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        {errors.nom && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.nom}
          </div>
        )}
      </div>

      <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Décrivez les détails de votre tâche..."
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
            errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        {errors.description && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.description}
          </div>
        )}
      </div>
    </div>
  );
}