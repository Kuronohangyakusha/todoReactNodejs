import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/themeContext";

export default function Header({ login, onLogout }) {
  const { theme, toggleTheme } = useTheme();

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/taches" className="hover:underline">Tâches</Link>
        <Link to="/add-tache" className="hover:underline">Ajouter</Link>
        <Link to="/users" className="hover:underline">Utilisateurs</Link>
      </div>

      <h1 className="text-lg font-bold">Mon Application</h1>

      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          {theme === "light" ? (
            <MoonIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <SunIcon className="h-6 w-6 text-yellow-300" />
          )}
        </button>

        {login && (
          <>
            <span>Connecté en tant que <strong>{login}</strong></span>
            <button
              onClick={handleLogoutClick}
              className="ml-4 px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </header>
  );
}
