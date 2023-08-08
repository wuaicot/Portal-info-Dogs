// se renderiza una tarjeta con la información de una raza de perro

import style from './Card.module.css';
import {Link} from 'react-router-dom';//para poder utilizar la etiqueta "Link" para el enrutamiento
import { deleteDog } from '../../redux/actions';//para poder acivar el borrado del perro
import { useDispatch } from 'react-redux';// para manejar las acciones



     // tomamos los props como argumentos|
const Card = (props) => {
    //se inicializa el "dispatch" para poder utilizar la función "deleteDog" del archivo actions.js de Redux.
    const dispatch = useDispatch();
  
    //al hacer clic en el boton X
    const onClose =()=>{
        window.confirm('¿ Confirmas que quieres borrar este Perro ?') && dispatch(deleteDog(props.id))//disparamos la accion de borrar con la ayuda del dispatch 
    }
      //renderizamos
    return(
        <div className={style.card}>
            <div>
            {isNaN(props.id) && <button onClick={onClose} className={style.buttonX}>X</button> }             
            </div>
            
            <div className={style.p}>
               <Link to={`/dogs/${props.id}`}><p className={style.breedName}> {props.name}</p>
               </Link>  
                 <p>Weight: {props.weight} Kgs.</p>
                {props.temperament &&  <p>Temperament: {props.temperament}</p>}                
            </div>
                
            <p className={style.image}>
                {props.image} 
            </p>
            
        </div>
    )
}

export default Card;