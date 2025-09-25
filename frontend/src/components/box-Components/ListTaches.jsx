import React, { useState, useMemo, useCallback } from "react";
import useTache from "../../context/tacheContext";
import { CardComponent } from "../cardComponet/CardComponent";
import { useSearchParams } from "react-router-dom";
import usePagination from "../usePagination";
import { Pagination } from "../cardComponet/Pagination";

function ListeTachesWithSearch({ currentUserId }) {
  const { taches } = useTache();
  const token = localStorage.getItem("token");

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  
  const search = searchParams.get("q") || "";
  const filterStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "date";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  // Filtrage et tri optimisés avec useMemo
  const filteredAndSortedTaches = useMemo(() => {
    let filtered = taches.filter((t) => {
      const matchesSearch = t.nom.toLowerCase().includes(search.toLowerCase()) ||
                           (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
      
      const matchesStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "true"
          ? t.status === true
          : t.status === false;
      
      return matchesSearch && matchesStatus;
    });

    // Tri des résultats
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "nom":
          aValue = a.nom.toLowerCase();
          bValue = b.nom.toLowerCase();
          break;
        case "status":
          aValue = a.status ? 1 : 0;
          bValue = b.status ? 1 : 0;
          break;
        case "date":
        default:
          aValue = new Date(a.createdAt || a.dateCreation || 0);
          bValue = new Date(b.createdAt || b.dateCreation || 0);
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [taches, search, filterStatus, sortBy, sortOrder]);

  // Pagination
  const { currentData, currentPage, totalPages, goToPage, perPage, setPerPage } =
    usePagination(filteredAndSortedTaches, 3);

  // Handlers optimisés avec useCallback
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      newParams.set("q", searchTerm.trim());
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  }, [searchTerm, searchParams, setSearchParams]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }, [handleSearchSubmit]);

  const handleStatusChange = useCallback((e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      newParams.set("status", value);
    } else {
      newParams.delete("status");
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleSortChange = useCallback((e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sortBy", value);
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleSortOrderChange = useCallback((e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sortOrder", value);
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handlePerPageChange = useCallback((e) => {
    const value = Number(e.target.value);
    setPerPage(value);
    goToPage(1); // Retourner à la première page
  }, [setPerPage, goToPage]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSearchParams({});
  }, [setSearchParams]);
 
  const totalResults = filteredAndSortedTaches.length;
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, totalResults);

  return (
    <div className="p-6">
      {/* Barre de recherche améliorée */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Recherche textuelle */}
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher par nom ou description..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="border border-gray-300 p-3 rounded-lg w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={handleSearchSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Rechercher
            </button>
          </div>

          {/* Bouton de réinitialisation */}
          <button
            onClick={clearFilters}
            className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Réinitialiser
          </button>
        </div>

        {/* Filtres et tri */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
          
          {/* Filtre par statut */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              value={filterStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
            >
              <option value="all">Tous les statuts</option>
              <option value="false">En cours</option>
              <option value="true">Terminées</option>
            </select>
          </div>

          

         
 
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Par page</label>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[100px]"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </div>

      {/* Informations sur les résultats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-sm text-gray-600">
        <div>
          {totalResults > 0 ? (
            <>Affichage de {startIndex} à {endIndex} sur {totalResults} tâche{totalResults > 1 ? 's' : ''}</>
          ) : (
            <>Aucune tâche trouvée</>
          )}
        </div>
        {search && (
          <div className="mt-2 sm:mt-0">
            Recherche : <span className="font-medium">"{search}"</span>
          </div>
        )}
      </div>

      {/* Résultats */}
      {totalResults > 0 ? (
        <>
          <CardComponent taches={currentData} currentUserId={currentUserId} token={token} />
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              goToPage={goToPage} 
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">Aucune tâche trouvée</div>
          <div className="text-gray-400 text-sm">
            Essayez de modifier vos critères de recherche ou de filtrage
          </div>
        </div>
      )}
    </div>
  );
}

export default ListeTachesWithSearch;