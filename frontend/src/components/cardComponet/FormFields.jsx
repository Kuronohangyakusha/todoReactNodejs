import React from "react";

export function FormFields({ nom, setNom, description, setDescription, errors }) {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold">Nom *</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.nom && <p className="text-red-500">{errors.nom}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}
      </div>
    </>
  );
}