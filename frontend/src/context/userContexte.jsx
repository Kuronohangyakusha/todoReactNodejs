import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../api/api";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
         console.log("Users API:", data);
        setUsers(data);
      } catch (err) {
        console.error("Erreur getUsers :", err);
        setError(err.message || "Erreur lors du chargement des utilisateurs");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUsers();
  }, [token]);

  return (
    <UserContext.Provider value={{ users, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUsers() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("Le composant doit être utilisé à l'intérieur du UserProvider");
  return context;
}
