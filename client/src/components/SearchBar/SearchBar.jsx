import style from './SearchBar.module.css';
import { getDogByName } from '../../redux/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

 //definimos el componente
const SearchBar =()=>{
    //establecemos el estado local | se actualiza a medida que se escribe
    const [name, setName] = useState('');
    // llamamos la acción
    const dispatch = useDispatch();
    //cuando el valor del imput cambia|"e" es el evento que acaba de ocurrir
    const handlerChange = (e)=>{
        //actualizamos el valor de la variable name
        setName(e.target.value)
    }

    const handlerOnClick = () =>{
        //despachamos la acción al store
        dispatch(getDogByName(name));
        setName('');
    }

    return(
        <div>

           <div className={style.inputcontainer}>
            
            <input placeholder='Escriba Aqui...' type='search'className={style.input} value={name} onChange={handlerChange}></input> 
            <button className={style.button} onClick={handlerOnClick}>BUSCAR</button>    
          </div>
               
        </div>
       
    )
}

export default SearchBar;
//className={style.inputcontainer}