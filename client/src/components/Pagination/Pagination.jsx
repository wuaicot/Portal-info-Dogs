import React, { useEffect } from "react";
import style from './Pagination.module.css'

export default function Pagination({pagination, dogsPerPage, dogsLength, currentPage}){ 

    let pageQnty = Math.ceil(dogsLength / dogsPerPage);  
    const pageNumbers = [];

    for (let i = 1; i <= pageQnty ; i++){ 
        pageNumbers.push(i)
    }
 
    function prevPage(page){ // <
        if(page!==1) pagination(page-1) 
    }

    function nextPage(page){ // > 
        if(page!== pageQnty) pagination(page+1)
    }
    
    
    useEffect(()=> {window.addEventListener("keydown",handleKey); 
    return () => window.removeEventListener("keydown",handleKey)},[pagination]) 

   function handleKey(event){
        if (event.keyCode === 37) prevPage(currentPage); 
        if (event.keyCode === 39) nextPage(currentPage);
    }


    return (
        <nav>
            <div className={style.pagination}>
                <span className={style.page_number}><a onClick={ () => pagination(1)}>{'<<'}</a></span>
                <span className={style.page_number}><a onClick={ () => prevPage(currentPage)}>{'<'}</a></span>
                {pageNumbers &&pageNumbers.map( page =>
                    <span className={page!==currentPage? style.page_number : style.page_number_current} key={page}><a onClick={ () => pagination(page)}>{page}</a></span>
                )}
                <span className={style.page_number}><a onClick={ () => nextPage(currentPage)}>{'>'}</a></span>
                <span className={style.page_number}><a onClick={ () => pagination(pageQnty)}>{'>>'}</a></span>
            </div>  
        </nav>
    )
}