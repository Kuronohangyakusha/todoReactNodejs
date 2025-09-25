import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from "./context/themeContext";
import { BrowserRouter } from "react-router-dom"; // ← importer

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter> {/* ← ajouter ici */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
