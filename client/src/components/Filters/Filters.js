import style from './Filters.module.css';
import { filterBySource, filterByTemperaments, removeFilters} from '../../redux/actions';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

const Filters = ()=>{
    const dispatch = useDispatch();  
    const {temperaments } = useSelector((state)=> state)
     //filtramos perros segun temperamento elejido
    function handlerFilterByTemperament(e){      
        dispatch(filterByTemperaments(e.target.value)); 
      }
      // filtramos según origen BDD/API.
     function handlerFilterByCreated(e) {
        dispatch(filterBySource(e.target.value));
     }
        //borramos filtros y que se muestren todos los perros
     function handleClick(){
        document.getElementById('sourceSelector').value='all';
        document.getElementById('tempSelector').value='all';
        dispatch(removeFilters());
    }


    //renderizamos dos selectores y un botón
    return(

        <>
    
                <select className={style.select} id='sourceSelector' onChange={handlerFilterByCreated}>
                <option disabled value='filter'>CREADO/API</option>
                    <option value='all'>Todas Razas</option>  
                    <option value='db'>BDD</option>
                    <option value='api'>API</option>
                </select>
            
                <select  className={style.select}  id='tempSelector'  defaultValue="TEMP" onChange={handlerFilterByTemperament} >
                <option disabled value='TEMP'>Filtrar Temperamento</option>
                    <option value="all">Todo Temperamentos</option>
                    {temperaments.map((temp 
                        ) => (
                        <option key={temp.id} value={temp.name}>{temp.name}</option>
                        )
                    )}
               </select>

               <button className={style.button} onClick={handleClick}>Borrar Filtros</button>      



        </>
    )
}

export default Filters;