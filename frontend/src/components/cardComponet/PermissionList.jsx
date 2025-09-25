import React from "react";

export function PermissionList({ permissions, onDelete, getDroitColor }) {
  if (permissions.length === 0) {
    return <p className="text-xs text-gray-500 italic">Aucune permission accordée</p>;
  }

  return (
    <div className="space-y-2">
      {permissions.map(permission => (
        <div key={permission.id} className="flex items-center justify-between p-2 bg-white rounded border text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{permission.user?.login || 'Utilisateur inconnu'}</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getDroitColor(permission.droit)}`}>
              {permission.droit}
            </span>
          </div>
          <button
            onClick={() => onDelete(permission.id)}
            className="text-red-500 hover:text-red-700"
            title="Supprimer permission"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}