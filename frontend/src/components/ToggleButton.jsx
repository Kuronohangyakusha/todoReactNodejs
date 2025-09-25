 
import React from "react";
import { useTheme } from "../context/themeContext";

export default function ToggleButton() {
  const { color, setColor } = useTheme();

  return (
    <button
      onClick={() => setColor(color === "white" ? "black" : "white")}
      className="px-4 py-2 m-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
    >
      Changer la couleur
    </button>
  );
}
