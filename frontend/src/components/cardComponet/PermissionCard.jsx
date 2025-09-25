 

import React, { useState, useEffect } from "react";
import { getPermissions, addPermission, deletePermission, getUsers } from "../../api/api";

export function PermissionCard({ tacheId }) {
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDroit, setSelectedDroit] = useState("");
  
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPermissions();
    fetchUsers();
  }, [tacheId]);

  const fetchPermissions = async () => {
    try {
      const data = await getPermissions(tacheId, token);
      setPermissions(data);
    } catch (err) {
      console.error("Erreur permissions:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      // Exclure l'utilisateur connecté de la liste
      setUsers(data.filter(user => user.id !== parseInt(currentUserId)));
    } catch (err) {
      console.error("Erreur users:", err);
    }
  };

  const handleAddPermission = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newPermission = await addPermission({
        tacheId: tacheId,
        userId: parseInt(selectedUser),
        droit: selectedDroit
      }, token);
      
      setPermissions(prev => [...prev, newPermission]);
      setShowForm(false);
      setSelectedUser("");
      setSelectedDroit("");
    } catch (err) {
      alert(err.message || "Erreur lors de l'ajout de la permission");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePermission = async (permissionId) => {
    if (!confirm("Supprimer cette permission ?")) return;
    
    try {
      await deletePermission(permissionId, token);
      setPermissions(prev => prev.filter(p => p.id !== permissionId));
    } catch (err) {
      alert(err.message || "Erreur lors de la suppression");
    }
  };

  const getDroitColor = (droit) => {
    switch (droit) {
      case 'LIRE': return 'bg-blue-100 text-blue-800';
      case 'MODIFIER': return 'bg-orange-100 text-orange-800';
      case 'CREER': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Permissions</h4>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showForm ? "Annuler" : "Ajouter"}
        </button>
      </div>

       
      {showForm && (
        <form onSubmit={handleAddPermission} className="mb-4 p-3 bg-white rounded border">
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
      )}
 
      <div className="space-y-2">
        {permissions.length === 0 ? (
          <p className="text-xs text-gray-500 italic">Aucune permission accordée</p>
        ) : (
          permissions.map(permission => (
            <div key={permission.id} className="flex items-center justify-between p-2 bg-white rounded border text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{permission.user?.login || 'Utilisateur inconnu'}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDroitColor(permission.droit)}`}>
                  {permission.droit}
                </span>
              </div>
              <button
                onClick={() => handleDeletePermission(permission.id)}
                className="text-red-500 hover:text-red-700"
                title="Supprimer permission"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}