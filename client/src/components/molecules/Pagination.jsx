import React from "react";

const Pagination = ({ postsPerPage, totalPost, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(
    "pageNumbers",
    pageNumbers,
    totalPost,
    "postPerPage",
    postsPerPage
  );
  return (
    <nav>
      <ul className="pagination d-flex justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>{" "}
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
