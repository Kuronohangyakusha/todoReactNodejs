import React, { useState, useMemo, useCallback } from "react";
import useTache from "../../context/tacheContext";
import { CardComponent } from "../cardComponet/CardComponent";
import { useSearchParams } from "react-router-dom";
import usePagination from "../usePagination";
import { Pagination } from "../cardComponet/Pagination";

function ListeTachesWithSearch({ currentUserId }) {
  const { taches, loading } = useTache();
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
    goToPage(1); 
  }, [setPerPage, goToPage]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSearchParams({});
  }, [setSearchParams]);
 
  const totalResults = filteredAndSortedTaches.length;
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, totalResults);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Tâches</h1>
              <p className="text-gray-600">Gérez et organisez vos tâches efficacement</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {totalResults} tâche{totalResults !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Barre de recherche améliorée */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Recherche et Filtres</h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Recherche textuelle */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher par nom ou description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  className="border border-gray-200 p-4 rounded-xl w-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={handleSearchSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher
              </button>
            </div>

            {/* Bouton de réinitialisation */}
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Réinitialiser</span>
            </button>
          </div>
  {/* Filtres et tri */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
    {/* Filtre par statut */}
    <div className="flex flex-col">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Statut
      </label>
      <select
        value={filterStatus}
        onChange={handleStatusChange}
        className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
      >
        <option value="all">Tous les statuts</option>
        <option value="false">🔄 En cours</option>
        <option value="true">✅ Terminées</option>
      </select>
    </div>

     

    {/* Ordre de tri */}
    <div className="flex flex-col">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18m0 0l-4 4m4-4l4-4" />
        </svg>
        Ordre
      </label>
      <select
        value={sortOrder}
        onChange={handleSortOrderChange}
        className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
      >
        <option value="desc">⬇️ Décroissant</option>
        <option value="asc">⬆️ Croissant</option>
      </select>
    </div>

    {/* Par page */}
    <div className="flex flex-col">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        Par page
      </label>
      <select
        value={perPage}
        onChange={handlePerPageChange}
        className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
      >
        <option value={3}>3 tâches</option>
        <option value={6}>6 tâches</option>
        <option value={9}>9 tâches</option>
        <option value={12}>12 tâches</option>
        <option value={15}>15 tâches</option>
      </select>
    </div>
  </div>
      </div>

        {/* Informations sur les résultats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-gray-700 font-medium">
                {totalResults > 0 ? (
                  <>Affichage de {startIndex} à {endIndex} sur {totalResults} tâche{totalResults > 1 ? 's' : ''}</>
                ) : (
                  <>Aucune tâche trouvée</>
                )}
              </span>
            </div>
          </div>
          {search && (
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-600">Recherche : <span className="font-semibold text-blue-600">"{search}"</span></span>
            </div>
          )}
        </div>

     
      {loading || totalResults > 0 ? (
        <>
          <CardComponent taches={currentData} currentUserId={currentUserId} token={token} loading={loading} />
          {totalPages > 1 && !loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 ">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune tâche trouvée</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Essayez de modifier vos critères de recherche ou de filtrage, ou créez votre première tâche.
          </p>
          <button
            onClick={() => window.location.href = '/add-tache'}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Créer une tâche
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default ListeTachesWithSearch;