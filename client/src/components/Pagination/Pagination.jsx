import React, { useEffect, useCallback } from "react";
import style from "./Pagination.module.css";

export default function Pagination({
  pagination,
  dogsPerPage,
  dogsLength,
  currentPage,
}) {
  let pageQnty = Math.ceil(dogsLength / dogsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= pageQnty; i++) {
    pageNumbers.push(i);
  }

  const prevPage = useCallback(
    (page) => {
      if (page !== 1) pagination(page - 1);
    },
    [pagination]
  );

  const nextPage = useCallback(
    (page) => {
      if (page !== pageQnty) pagination(page + 1);
    },
    [pagination, pageQnty]
  );

  useEffect(() => {
    const handleKey = (event) => {
      if (event.keyCode === 37) prevPage(currentPage);
      if (event.keyCode === 39) nextPage(currentPage);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentPage, nextPage, prevPage]);

  return (
    <nav>
      <div className={style.pagination}>
        <span className={style.page_number}>
          <button onClick={() => pagination(1)}>{"<<"}</button>
        </span>
        <span className={style.page_number}>
          <button onClick={() => prevPage(currentPage)}>{"<"}</button>
        </span>
        {pageNumbers &&
          pageNumbers.map((page) => (
            <span
              className={
                page !== currentPage
                  ? style.page_number
                  : style.page_number_current
              }
              key={page}
            >
              <button onClick={() => pagination(page)}>{page}</button>
            </span>
          ))}
        <span className={style.page_number}>
          <button onClick={() => nextPage(currentPage)}>{">"}</button>
        </span>
        <span className={style.page_number}>
          <button onClick={() => pagination(pageQnty)}>{">>"}</button>
        </span>
      </div>
    </nav>
  );
}