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
                <option disabled value='title'>Order Alphabetically</option>
                <option value='asc'>A-Z</option>
                <option value='des'>Z-A</option>
            </select>
            <select  className={style.select}  id='weightSort' name='weight' defaultValue='title' onChange={handleChange}>
                <option disabled  value='title'>Order By weight</option>
                <option value='asc'>Lightest</option>
                <option value='des'>Haviest</option>
            </select>
            <select className={style.select} name='height' defaultValue='title' onChange={handleChange}>
                <option disabled value='title'> Order by height</option>
                <option value='asc' >Shortest</option>
                <option value='des'>Tallest</option>
                </select>
        </div>
    )
        
    
}
