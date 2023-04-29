import style from './Home.module.css';
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Filters from '../../components/Filters/Filters';
import SearchBar from '../../components/SearchBar/SearchBar';
import React from "react";
import SortSelection from '../../components/SortSelection/SortSelection';



const Home = () => {   

    return(
        <>
        <div className={style.header}>
             <h1 className={style.tittle}> BREEDS SEARCH </h1>
             <div className={style.buttons}>
              <div className={style.search}> 
                 <SearchBar/>
                </div>  
                <div className={style.select} >               
                <Filters/>                    
                 <SortSelection/>
                </div>
                
                
             </div>
             
        </div>
       
        <CardsContainer/>
       

        </>
    )
    

}

export default Home;
