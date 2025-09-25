import React, { useState } from "react";
import { loginUser } from "../api/api";  

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const data = await loginUser(email, password);
    console.log("Réponse login:", data);
    localStorage.setItem("token", data.token); 
    localStorage.setItem("login", email);  

    if (onLoginSuccess) onLoginSuccess(data.token, data.id);  
  } catch (err) {
    setError(err.message || "Échec de la connexion");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className=" flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Connexion</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-amber-300 text-white p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

export default Login;

