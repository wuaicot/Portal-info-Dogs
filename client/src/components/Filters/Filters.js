import style from './Filters.module.css';
import { filterBySource, filterByTemperaments, removeFilters} from '../../redux/actions';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

const Filters = ()=>{
    //accedemos al estado
    const dispatch = useDispatch();  
    //realizamos la accion de acceder a los temperamentos
    const { temperaments } = useSelector((state)=> state)
     //controlamos los  eventos que ocurren en el selector de temperamentos.     
    function handlerFilterByTemperament(e){      //se llama a dispatch con la acción, pasando |  lo que se seleccionó como argumento.
        dispatch(filterByTemperaments(e.target.value)); 
      }
      // filtramos según origen BDD/API.
      //controlamos los cambios de eventos que ocurren en el selector origen
     function handlerFilterByCreated(e) {
        //se llama a dispatch con la accion y el argumento 
        dispatch(filterBySource(e.target.value));
     }
        //borramos filtros y que se muestren todos los perros
        //manejamos eventos del boton "borrar filtros"
     function handleClick(){
         //al hacer clic realizamos una manipulacion del DOM establecer los selectores a "all"
        document.getElementById('sourceSelector').value='all';
        // se llama a dispatch con la acción para borrar
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
            
                <select className={style.select} id='tempSelector' defaultValue="TEMP" onChange={handlerFilterByTemperament}>
  <option disabled value='TEMP'>Filtrar Temperamento</option>
  <option value="all">Todo Temperamentos</option>
  {temperaments && temperaments.map((temp) => (
    <option key={temp.id} value={temp.name}>{temp.name}</option>
  ))}
</select>



               <button className={style.button} onClick={handleClick}>Borrar Filtros</button>      



        </>
    )
}

export default Filters;