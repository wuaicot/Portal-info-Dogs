// en este archivo manejamos la lógica de ordenamiento de resultados de búsqueda y utilizamos Redux para enviar la información de ordenamiento store.

import React from "react";
import { useDispatch } from "react-redux";
import { sortName, sortWeight , sortHeight} from '../../redux/actions';
import style from './SortSelection.module.css';

//exportamos el componente
export default function SortSelection (){

    const dispatch = useDispatch();
    function handleChange(e){
        // condicionamos para determinar qué opción se seleccionó.
        // si es por ordn alfabético...
        if(e.target.name === 'alphabetical'){
            //|llamamos la acción
            dispatch(sortName(e.target.value));
            // si se ha ordenado por peso, al seleccionar el orden alfabético se resetea el select de peso y se evita que haya dos tipos de ordenamiento seleccionados a la vez.
            document.getElementById('weightSort').value='title';
            
        }
           //si es por peso... 
        if(e.target.name === 'weight'){
            //|llamamos la acción
            dispatch(sortWeight(e.target.value));
            //si se ha ordenado por alfabético, al seleccionar por peso se resetea el select de alfabético
            document.getElementById('alphabeticalSort').value='title';
        }
            //si es por altura no es necesario actualizar otro select
        if(e.target.name === 'height'){
            dispatch(sortHeight(e.target.value));
        }
    }

    return (//definimos la estructura de los   tres selectores en la página|x orden alfab|x peso|por altura|//cuando cambie  el valor "onChange"
        <div >
            
            <select  className={style.select}   id='alphabeticalSort' name='alphabetical' defaultValue='title' onChange={handleChange}>
                <option disabled value='title'>Orden Alfabético</option>

                <option value='asc'>A-Z</option>
                <option value='des'>Z-A</option>
                
            </select>

            <select  className={style.select}  id='weightSort' name='weight' defaultValue='title' onChange={handleChange}>
                <option n 
                disabled value='title'>Ordenar por Peso
                </option>
                <option 
                value='asc'>más ligero
                </option>
                <option 
                value='des'>más pesado
                </option>
            </select>

            <select 
            className={style.select} name='height' defaultValue='title' onChange={handleChange}>
                <option 
                disabled value='title'> Ordenar por Altura
                </option>
                <option 
                value='asc' >más chico
                </option>
                <option value='des'>más grande</option>
                </select>

        </div>
    )
        
    
}
