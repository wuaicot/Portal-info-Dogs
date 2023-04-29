import style from './Card.module.css';
import {Link} from 'react-router-dom';
import { deleteDog } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Card = (props) => {

    const dispatch = useDispatch();
  

    const onClose =()=>{
        window.confirm('Are you sure to delete this breed ?') && dispatch(deleteDog(props.id))
    }

    return(
        <div className={style.card}>
            <div>
            {isNaN(props.id) && <button onClick={onClose} className={style.buttonX}>X</button> }             
            </div>
            <div className={style.p}>
               <Link to={`/dogs/${props.id}`}><p className={style.breedName}> {props.name}</p></Link>  
                 <p>Weight: {props.weight} Kgs.</p>
                {props.temperament &&  <p>Temperament: {props.temperament}</p>}                
            </div>
            
            <p className={style.image}>{props.image}</p>
            
            
        </div>
    )
}

export default Card;