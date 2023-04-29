import { useDispatch, useSelector } from "react-redux";
import { getDog, cleanDogDetails } from "../../redux/actions";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from './Detail.module.css';
import Loading from "../../components/Loading/Loading";

const Detail = () => {

    const dispatch = useDispatch();
    const {dog_details, loading} = useSelector(state=>state);
    const {id} = useParams();


    useEffect(()=>{
        dispatch(getDog(id));
        return dispatch(cleanDogDetails())
    },[id])

 console.log(dog_details);
    return(
        <div>
        <h1 className={style.h1}> Exploring Breed </h1>
       { loading ? <Loading/> :
         <div className={style.card}>
         <Link to='/home'><button className={style.button}> Go back </button></Link>
         <p className={style.breedName}>{dog_details.name}</p>
              <img  className={style.image} src= {dog_details.image} alt={dog_details.name}></img>
              <div className={style.p}>
                 <p>Id: {dog_details.id}</p>             
                 <p>Height: {dog_details.height} cm.</p>
                 <p>Weight: {dog_details.weight}kgs. </p>
                 <p>Life Span: {dog_details.life_span}</p>
                 <p>Temperaments: {dog_details.temperaments}</p>
              </div>
              
         </div>
       }
              
        </div>
    )
}

export default Detail;