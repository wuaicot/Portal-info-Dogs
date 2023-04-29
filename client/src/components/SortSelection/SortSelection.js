import React from "react";
import { useDispatch } from "react-redux";
import { sortName, sortWeight , sortHeight} from '../../redux/actions';
import style from './SortSelection.module.css';


export default function SortSelection (){

    const dispatch = useDispatch();
    function handleChange(e){
        if(e.target.name === 'alphabetical'){
            dispatch(sortName(e.target.value));
            document.getElementById('weightSort').value='title';
            
        }
            
        if(e.target.name === 'weight'){
            dispatch(sortWeight(e.target.value));
            document.getElementById('alphabeticalSort').value='title';
        }

        if(e.target.name === 'height'){
            dispatch(sortHeight(e.target.value));
        }
    }

    return (
        <div >
            
            <select  className={style.select}   id='alphabeticalSort' name='alphabetical' defaultValue='title' onChange={handleChange}>
                <option disabled value='title'>Orden Alfabetico</option>
                <option value='asc'>A-Z</option>
                <option value='des'>Z-A</option>
            </select>
            <select  className={style.select}  id='weightSort' name='weight' defaultValue='title' onChange={handleChange}>
                <option disabled  value='title'>Ordenar por Peso</option>
                <option value='asc'>mas ligero</option>
                <option value='des'>mas pesado</option>
            </select>
            <select className={style.select} name='height' defaultValue='title' onChange={handleChange}>
                <option disabled value='title'> Ordenar por Altura</option>
                <option value='asc' >mas chico</option>
                <option value='des'>mas grande</option>
                </select>
        </div>
    )
        
    
}
