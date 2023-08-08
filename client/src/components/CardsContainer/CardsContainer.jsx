import Card from "../Card/Card";
import style from './CardsContainer.module.css';
// importamos los hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { getDogs, getTemperaments } from "../../redux/actions";
import Pagination from '../../components/Pagination/Pagination';
import Loading from "../Loading/Loading";

const CardsContainer = () => {
    
    const dispatch = useDispatch();//interacyuamos con el store 
    const {dogs, loading} = useSelector(state => state);//obtenemos el estado actual desde la store
    
     //vamos definiendo una paginacion 
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const firstDogIndex_nextPage = currentPage * dogsPerPage;
    const firstDogIndex_currentPage = firstDogIndex_nextPage - dogsPerPage;
    const dogs_currentPage = dogs.slice(firstDogIndex_currentPage, firstDogIndex_nextPage);// obtenmos sólo la parte del array que corresponde a la página actual
  
    // actualizamos el estado de la página actual con el número de página que ha sido seleccionado en el componente magination
    const pagination = (page) => {
        setCurrentPage(page);
    }
      //cada que cambie la lista de perros, la página actual se reiniciará a la primera página.
    useEffect(() => setCurrentPage(1), [dogs]); 

    useEffect(() => {
        // obtenemos lista de perros y la lista de temperamentos de los perros de la API
        dispatch(getDogs());
        dispatch(getTemperaments());
      //  |especificamos dispatch| en la dependencia del efecto para asegurarnos que se ejecute a cada que cambie dispath
    },    [dispatch]);
    

    return(
        <div>
            <div>
                <Pagination
                    pagination={pagination}
                    dogsPerPage={dogsPerPage}
                    dogsLength={dogs.length}
                    currentPage={currentPage}
                />
            </div>
                
              { loading ? <Loading/> ://Si el indicador "loading" es verdadero, se muestra un componente de carga mientras se espera que los datos se carguen
                         
             <div className={style.container}>
             {dogs_currentPage.length ? dogs_currentPage.map((dog) => (
                 <Card
                     key={dog.id}
                     id={dog.id}
                     name={dog.name}
                     height={dog.height}
                     weight={dog.weight}
                     life_span={dog.life_span}
                     image={<img src={dog.image} alt={dog.name} />}
                     temperament={dog.temperaments}
                 />
             )) : <p style={{color:'white', backgroundColor: 'red', opacity: 0.8, fontWeight: 600}}>No se encontro el pero, Limpie Filtro para continuar.</p>}
       
         </div>  
        }
             
        </div>
    );
};

export default CardsContainer;
