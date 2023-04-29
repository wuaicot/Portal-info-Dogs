import Card from "../Card/Card";
import style from './CardsContainer.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDogs, getTemperaments } from "../../redux/actions";
import Pagination from '../../components/Pagination/Pagination';
import Loading from "../Loading/Loading";

const CardsContainer = () => {
    const dispatch = useDispatch();
    const {dogs, loading} = useSelector(state => state);
    
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const firstDogIndex_nextPage = currentPage * dogsPerPage;
    const firstDogIndex_currentPage = firstDogIndex_nextPage - dogsPerPage;
    const dogs_currentPage = dogs.slice(firstDogIndex_currentPage, firstDogIndex_nextPage);
  

    const pagination = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => setCurrentPage(1), [dogs]); 

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, []);

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
            { loading ? <Loading/> :
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
             )) : <p style={{color:'black', backgroundColor: 'white', opacity: 0.8, fontWeight: 600}}>No dogs to show, clean filters to continue.</p>}
       
         </div>  
            }
             
        </div>
    );
};

export default CardsContainer;
