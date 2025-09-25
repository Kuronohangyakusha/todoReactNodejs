import axios from "axios";
import { API_URL } from "../data/apiData";



export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      login: email,  
      password,
    });
    return res.data; 
  } catch (err) {
    throw err.response?.data || err;
  }
};
 
export const getTaches = async (token) => {
  if (!token) throw new Error("Token manquant");

  try {
    const res = await axios.get(`${API_URL}/tache`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;  
  } catch (err) {
    throw err.response?.data || err;
  }
};

 
 export const createTache = async (tacheData, token) => {
  if (!token) throw new Error("Token manquant");

  try {
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // 🚩 obligatoire
      }
    };

    const res = await axios.post(`${API_URL}/tache`, tacheData, config);

    return res.data; // ✅ renvoie la tâche créée (avec image)
  } catch (err) {
    console.error("Erreur API complète :", err.response?.data);
    throw err.response?.data || err;
  }
};


 
export const deleteTache = async (id, token) => {
  if (!token) throw new Error("Token manquant");

  try {
    const res = await axios.delete(`${API_URL}/tache/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; 
  } catch (err) {
    throw err.response?.data || err;
  }
};

 
export const updateTache = async (id, tache, token) => {
  if (!token) throw new Error("Token manquant");

  try {
    const res = await axios.put(`${API_URL}/tache/${id}`, tache, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; 
  } catch (err) {
    throw err.response?.data || err;
  }
};


 
export const getUsers = async (token) => {
  if (!token) throw new Error("Token manquant");

  try {
    const res = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;  
  } catch (err) {
    throw err.response?.data || err;
  }
};



// Ajoutez ces fonctions à votre fichier api.jsx existant

// Récupérer les permissions d'une tâche
export const getPermissions = async (tacheId, token) => {
  if (!token) throw new Error("Token manquant");

  try {
    const res = await axios.get(`${API_URL}/permissions/tache/${tacheId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Récupérer les permissions d'un utilisateur
export const getPermissionsByUser = async (userId, token) => {
  if (!token) throw new Error("Token manquant");

  try {
    const res = await axios.get(`${API_URL}/permissions/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

 
export const addPermission = async (permissionData, token) => {
  if (!token) throw new Error("Token manquant");
  
  try {
    const res = await axios.post(`${API_URL}/permissions`, permissionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

 
export const deletePermission = async (permissionId, token) => {
  if (!token) throw new Error("Token manquant");
  
  try {
    const res = await axios.delete(`${API_URL}/permissions/${permissionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
export const getHistorique = async (tacheId, token) => {
  if (!token) throw new Error("Token manquant");
  try {
    const res = await axios.get(`${API_URL}/tache/${tacheId}/historique`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getAllHistorique = async (token) => {
  if (!token) throw new Error("Token manquant");
  try {
    const res = await axios.get(`${API_URL}/tache/historique/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
