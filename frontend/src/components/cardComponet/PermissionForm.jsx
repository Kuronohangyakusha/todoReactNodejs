import React from "react";

export function PermissionForm({ showForm, setShowForm, selectedUser, setSelectedUser, selectedDroit, setSelectedDroit, users, onAdd, loading }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd();
  };

  if (!showForm) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 bg-white rounded border">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="text-xs border rounded px-2 py-1"
          required
        >
          <option value="">Choisir utilisateur</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.login}</option>
          ))}
        </select>

        <select
          value={selectedDroit}
          onChange={(e) => setSelectedDroit(e.target.value)}
          className="text-xs border rounded px-2 py-1"
          required
        >
          <option value="">Choisir droit</option>
          <option value="LIRE">Lire</option>
          <option value="MODIFIER">Modifier</option>
          <option value="CREER">Créer</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Ajout..." : "Ajouter permission"}
      </button>
    </form>
  );
}