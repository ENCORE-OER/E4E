import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const prevNextItems = 2; // Number of items before and after the current page

  const pagesToShow = Array.from(
    { length: prevNextItems * 2 + 1 },
    (_, index) => currentPage - prevNextItems + index
  ).filter((pageNumber) => pageNumber > 0 && pageNumber <= totalPages);

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className="pagination-item">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {pagesToShow.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`pagination-item ${currentPage === pageNumber ? 'active' : ''}`}
          >
            <button
              className={`pagination-item ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        <li className="pagination-item">
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
