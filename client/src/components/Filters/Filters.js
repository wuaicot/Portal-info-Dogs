import style from './Filters.module.css';
import { filterBySource, filterByTemperaments, removeFilters} from '../../redux/actions';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

const Filters = ()=>{
    const dispatch = useDispatch();  
    const {temperaments } = useSelector((state)=> state)
   
    function handlerFilterByTemperament(e) {      
        dispatch(filterByTemperaments(e.target.value)); 
      }
      
     function handlerFilterByCreated(e) {
        dispatch(filterBySource(e.target.value));
     }

     function handleClick(){
        document.getElementById('sourceSelector').value='all';
        document.getElementById('tempSelector').value='all';
        dispatch(removeFilters());
    }

    return(
        <>
       
                <select className={style.select} id='sourceSelector' onChange={handlerFilterByCreated}>
                <option disabled value='filter'>Filter by Source</option>
                    <option value='all'>All breeds</option>  
                    <option value='db'>My Dogs</option>
                    <option value='api'>Api Dogs</option>
                </select>

                <select  className={style.select}  id='tempSelector'  defaultValue="TEMP" onChange={handlerFilterByTemperament} >
                <option disabled value='TEMP'>Filter by Temperament</option>
                    <option value="all">All temperaments</option>
                    {temperaments.map((temp 
                        ) => (
                        <option key={temp.id} value={temp.name}>{temp.name}</option>
                        )
                    )}
               </select>
               <button className={style.button} onClick={handleClick}>Clean filters</button>      



        </>
    )
}

export default Filters;
