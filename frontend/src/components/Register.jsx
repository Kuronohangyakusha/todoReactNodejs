import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../data/apiData";

export default function Register({ onRegisterSuccess }) {
  const [login, setLogin] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    const tempErrors = {};

    if (login.trim().length < 3) tempErrors.login = "Le login doit contenir au moins 3 caractères.";
    if (nom.trim().length < 2) tempErrors.nom = "Le nom complet est obligatoire.";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password))
      tempErrors.password = "Le mot de passe doit contenir au moins 6 caractères, avec au moins une lettre et un chiffre.";

    if (password !== confirmPassword)
      tempErrors.confirmPassword = "Les mots de passe ne correspondent pas.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateFields()) return;

    setLoading(true);
    try {
      
      const res = await axios.post(`${API_URL}/users`, { login, nom, password, role: "SIMPLE" });
      localStorage.setItem("login", login);

      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      if (err.response?.data?.errors) {
        const zodErrors = {};
        err.response.data.errors.forEach((e) => {
          zodErrors[e.field || "global"] = e.message;
        });
        setErrors(zodErrors);
      } else {
        setErrors({ global: err.response?.data?.message || "Erreur lors de l'inscription" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Inscription</h2>

        {errors.global && <p className="text-red-500 text-sm mb-3">{errors.global}</p>}

        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full border p-2 mb-1 rounded-lg"
        />
        {errors.login && <p className="text-red-500 text-xs mb-2">{errors.login}</p>}

        <input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border p-2 mb-1 rounded-lg"
        />
        {errors.nom && <p className="text-red-500 text-xs mb-2">{errors.nom}</p>}

         
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

        {/* Confirm Password */}
        <div className="relative mb-3">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mb-2">{errors.confirmPassword}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
