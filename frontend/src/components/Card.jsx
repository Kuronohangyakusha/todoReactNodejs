 
import React from "react";
import { useTheme } from "../context/themeContext";

export default function Card() {
  const { color } = useTheme();

 
  const bgClass = color === "white" ? "bg-white text-black" : "bg-black text-white";

  return (
    <div className={`${bgClass} w-64 h-32 m-4 flex items-center justify-center border border-gray-300 rounded-lg shadow-md`}>
      Carte en {color}
    </div>
  );
}
