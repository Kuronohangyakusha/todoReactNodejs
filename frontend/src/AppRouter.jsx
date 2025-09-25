import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ListeUsers from "./components/box-Components/ListeUsers";
import FormTache from "./components/cardComponet/FormComposant";
import ListeTachesWithSearch from "./components/box-Components/ListeTachesWithSearch";
import { UserProvider } from "./context/userContexte";
import { TacheProvider } from "./context/tacheContext";

export default function AppRouter() {
  const currentUserId = localStorage.getItem("userId");

  return (
    <Router>
      {localStorage.getItem("token") && <Header />} {/* Header affiché seulement si connecté */}

      <Routes>
        <Route path="/" element={<Navigate to="/taches" />} />

        <Route
          path="/taches"
          element={
            <TacheProvider>
              <ListeTachesWithSearch currentUserId={currentUserId} />
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
      </Routes>
    </Router>
  );
}
