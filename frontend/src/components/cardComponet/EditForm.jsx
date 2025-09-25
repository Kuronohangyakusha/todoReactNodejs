import React from "react";

export function EditForm({ editValues, onChange, onSave, onCancel, errorMessage }) {
  return (
    <div className="space-y-2">
      <input
        name="nom"
        value={editValues.nom}
        onChange={onChange}
        className="border p-1 w-full rounded"
        placeholder="Nom"
      />
      <textarea
        name="description"
        value={editValues.description}
        onChange={onChange}
        className="border p-1 w-full rounded"
        placeholder="Description"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="status"
          checked={editValues.status}
          onChange={onChange}
        />
        
        <span>Status terminée</span>
      </label>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={onSave}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sauvegarder
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Annuler
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}