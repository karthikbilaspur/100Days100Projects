import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ pageNumber, itemsPerPage, totalItems, handlePageChange }) => {
  const pages = Math.ceil(totalItems / itemsPerPage);

  return (
    <BootstrapPagination>
      <BootstrapPagination.First onClick={() => handlePageChange(1)} />
      <BootstrapPagination.Prev onClick={() => handlePageChange(pageNumber - 1)} />
      {Array(pages).fill().map((_, index) => (
        <BootstrapPagination.Item key={index} active={pageNumber === index + 1} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next onClick={() => handlePageChange(pageNumber + 1)} />
      <BootstrapPagination.Last onClick={() => handlePageChange(pages)} />
    </BootstrapPagination>
  );
};

export default Pagination;