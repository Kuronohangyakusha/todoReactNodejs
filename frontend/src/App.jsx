import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import FormTache from "./components/cardComponet/FormComposant";
import Login from "./components/loginComponent";
import Register from "./components/Register";
import ListeTaches from "./components/box-Components/ListTaches";
import ListeUsers from "./components/box-Components/ListeUsers";
import Header from "./components/Header";

import { TacheProvider } from "./context/tacheContext";
import { UserProvider } from "./context/userContexte";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("userId") || null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = (newToken, userId) => {
    setToken(newToken);
    setCurrentUserId(userId);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userId);
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("login");
  };

  // ---- Login page ----
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {showRegister ? "Créer un compte" : "Connexion"}
              </h1>
              <p className="text-gray-600">
                {showRegister
                  ? "Rejoignez-nous pour gérer vos tâches"
                  : "Connectez-vous pour accéder à vos tâches"}
              </p>
            </div>

            <div className="space-y-4">
              {showRegister ? (
                <Register onRegisterSuccess={() => setShowRegister(false)} />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )}
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 mb-3">
                {showRegister ? "Vous avez déjà un compte ?" : "Vous n'avez pas de compte ?"}
              </p>
              <button
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                onClick={() => setShowRegister(!showRegister)}
              >
                {showRegister ? "Se connecter" : "S'inscrire"}
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">© 2024 Gestionnaire de tâches</p>
          </div>
        </div>
      </div>
    );
  }

  // ---- Main app after login ----
  return (
    <div>
     <Header token={token} login={localStorage.getItem("login")} onLogout={handleLogout} />


      <div className="p-6">
        <Routes>
          <Route
            path="/taches"
            element={
              <TacheProvider>
                <ListeTaches currentUserId={currentUserId} />
              </TacheProvider>
            }
          />
          <Route
            path="/add-tache"
            element={
              <TacheProvider>
                <FormTache />
              </TacheProvider>
            }
          />
          <Route
            path="/users"
            element={
              <UserProvider>
                <ListeUsers />
              </UserProvider>
            }
          />
          <Route path="*" element={<Navigate to="/taches" replace />} />
        </Routes>
      </div>
    </div>
  );
}
