 import React, { useEffect, useState, useContext } from "react";
import { tacheContext } from "./dataContext";
import { getTaches , createTache } from "../api/api";
import { deleteTache } from "../api/api";
import { updateTache as apiUpdateTache } from "../api/api";
 
export function TacheProvider({ children }) {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const data = await getTaches(token);
         
        setTaches(data);
      } catch (err) {
        console.error("Erreur getTaches :", err);
        if (err.error === "Token invalide") {
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          setError(err.message || "Erreur lors du chargement des tâches");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchTaches();
  }, [token]);

 const addTache = async (tacheData) => {
  if (!token) return;

  try {
    const nouvelleTache = await createTache(tacheData, token);

    
    setTaches((prev) => {
      const existeDeja = prev.some((t) => t.id === nouvelleTache.id);
      if (existeDeja) return prev; 
      return [nouvelleTache,...prev];
    });

    return { success: true, data: nouvelleTache };
  } catch (err) {
    return { 
      success: false, 
      error: err.error || err.message || "Erreur lors de l'ajout de la tâche" 
    };
  }
};




 


const removeTache = async (id) => {
  if (!token) return;

  try {
    await deleteTache(id, token);

 
    setTaches((prev) => prev.filter((t) => t.id !== id));
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);

  
    setTaches((prev) => prev.filter((t) => t.id !== id));
 
    alert("La tâche a été supprimée malgré l'erreur côté serveur");
  }
};



 const updateTache = async (id, updatedFields) => {
  try {
    const updated = await apiUpdateTache(id, updatedFields, token);
    setTaches(prev => prev.map(t => t.id === id ? updated : t));
    return { success: true }; 
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);

    if (err.response && err.response.status === 403) {
      return { success: false, message: "Vous ne pouvez pas modifier une tâche qui ne vous appartient pas." };
    } else {
      return { success: false, message: "Vous ne pouvez pas modifier une tâche qui ne vous appartient pas." };
    }
  }
};


  return (
    <tacheContext.Provider value={{ taches, setTaches, addTache, removeTache, updateTache }}>
      {children}
    </tacheContext.Provider>
  );
}


export default function useTache() {
  const context = useContext(tacheContext);
  if (!context)
    throw new Error("Le composant doit être utilisé à l'intérieur du TacheProvider");
  return context;
}
