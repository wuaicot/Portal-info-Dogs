import style from './SearchBar.module.css';
import { getDogByName } from '../../redux/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const SearchBar =()=>{
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handlerChange = (e)=>{
        setName(e.target.value)
    }

    const handlerOnClick = () =>{
        dispatch(getDogByName(name));
        setName('');
    }

    return(
        <div>
            
            <input placeholder='Dog breed name...' type='search'className={style.input} value={name} onChange={handlerChange}></input> 
            <button className={style.button} onClick={handlerOnClick}>Look for it !</button>    
        </div>
    )
}

export default SearchBar;