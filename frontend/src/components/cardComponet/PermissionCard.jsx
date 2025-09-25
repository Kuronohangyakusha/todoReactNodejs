 

import React, { useState, useEffect } from "react";
import { getPermissions, addPermission, deletePermission, getUsers } from "../../api/api";
import { PermissionForm } from "./PermissionForm";
import { PermissionList } from "./PermissionList";

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

  const handleAddPermission = async () => {
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

       
       <PermissionForm
         showForm={showForm}
         setShowForm={setShowForm}
         selectedUser={selectedUser}
         setSelectedUser={setSelectedUser}
         selectedDroit={selectedDroit}
         setSelectedDroit={setSelectedDroit}
         users={users}
         onAdd={handleAddPermission}
         loading={loading}
       />

       <PermissionList
         permissions={permissions}
         onDelete={handleDeletePermission}
         getDroitColor={getDroitColor}
       />
    </div>
  );
}