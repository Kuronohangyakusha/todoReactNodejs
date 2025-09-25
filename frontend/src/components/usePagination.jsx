import { useState, useMemo } from "react";

export default function usePagination(data = [], defaultPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);

  const totalPages = useMemo(() => Math.ceil(data.length / perPage), [data.length, perPage]);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return data.slice(start, start + perPage);
  }, [data, currentPage, perPage]);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return { currentData, currentPage, totalPages, goToPage, perPage, setPerPage };
}
