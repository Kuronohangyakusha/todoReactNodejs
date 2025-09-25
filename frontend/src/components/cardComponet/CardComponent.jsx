import React, { useState, useEffect } from "react";
import useTache from "../../context/tacheContext";
import { HistoriqueModal } from "./HistoriqueModal";
import { TaskCard } from "./TaskCard";
import { EditForm } from "./EditForm";
import { SkeletonCard } from "./SkeletonCard";
import { getPermissionsByUser } from "../../api/api";

export function CardComponent({ taches, currentUserId, token, loading = false }) {
  const { removeTache, updateTache } = useTache();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ nom: "", description: "", status: false });
  const [errorMessage, setErrorMessage] = useState("");
  const [showHistoriqueId, setShowHistoriqueId] = useState(null);  
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const perms = await getPermissionsByUser(currentUserId, token);
        setUserPermissions(perms);
      } catch (err) {
        console.error("Erreur permissions:", err);
      }
    };
    if (currentUserId && token) {
      fetchUserPermissions();
    }
  }, [currentUserId, token]);

  const hasPermission = (tacheId, droits) => {
    return userPermissions.some(p => p.tacheId === tacheId && droits.includes(p.droit));
  };

  const canModify = (task) => {
    return task.userId === parseInt(currentUserId) || hasPermission(task.id, ["MODIFIER"]);
  };

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
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {loading ? (
         
          Array.from({ length: 6 }).map((_, index) => (
            <div key={`skeleton-${index}`} style={{ animationDelay: `${index * 100}ms` }}>
              <SkeletonCard />
            </div>
          ))
        ) : (
          taches.map((t, index) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4">
                {editingId === t.id ? (
                  <EditForm
                    editValues={editValues}
                    onChange={handleChange}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                    errorMessage={errorMessage}
                  />
                ) : (
                  <TaskCard
                    t={t}
                    currentUserId={currentUserId}
                    canEdit={canModify(t)}
                    canDelete={t.userId === parseInt(currentUserId)}
                    onEdit={startEdit}
                    onDelete={removeTache}
                    onHistory={setShowHistoriqueId}
                  />
                )}
              </div>
            </div>
          ))
        )}
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
