// en este archivo creamos el contenedor de estado global de la app
 

import {SORT_HEIGHT, GET_DOGS, GET_DOG , CLEAN_DOG_DETAILS , CREATE_DOG, GET_DOG_BY_NAME,  GET_TEMPERAMENTS, LOADING, FILTER_BY_SOURCE, FILTER_BY_TEMPERAMENTS, REMOVE_FILTERS, SORT_NAME, SORT_WEIGHT, DELETE_DOG, UPDATE_DOG} from  './actionTypes';

 //definimos las propiedades iniciales del estado global
const initialState = {
    dogs: [], //matriz con todos los perros filtrados
    dogs_backup: [], //matriz con todos los perros disponibles
    dog_details: {}, //Un objeto que representa los detalles de un perro.
    temperaments: [],//matriz que contiene los temperamentos de los perros.
    loading: false,//sin cargar
}

      //tomamos el estado actual y una acción y devolvemos el nuevo estado actualizado.
const reducer = (state=initialState, action) =>{
      let dogsFiltered = [];

      //depende de cual esea el caso hacemos los cambios necesarios en el estado
    switch(action.type){
       //todos filtrados
      case GET_DOGS:
            return{...state, dogs: action.payload, dogs_backup: action.payload, loading:false}
       //un perro
      case GET_DOG:
            return{...state, dog_details: action.payload, loading:false}
       //obtenemos una matriz por temperamento
      case GET_TEMPERAMENTS:
            return{...state, temperaments: action.payload}           
      //una matriz de perros por su nombre
      case GET_DOG_BY_NAME:
            return{...state, dogs: action.payload}
      //para borrar los detalles del perro en el estado
      case CLEAN_DOG_DETAILS:
            return{...state, dog_details: {}}
        //para avisar que la app esta cargando
      case LOADING:
            return{...state, loading:true}
         // creamos un nuevo perro y agregamos a matriz de perros filtrados y a la matriz de respaldo.   
      case CREATE_DOG:
            return{...state, dogs:[...state.dogs, action.payload], dogs_backup: [...state.dogs_backup, action.payload]}
            //actualizamos los detalles de un perro por su id
      case UPDATE_DOG:
            let id = action.payload.id;
           //tanto en matriz de perros liltrados como la de respaldo
            return{...state, dogs: [...state.dogs.filter(dog=> dog.id !== id), action.payload], dogs_backup: [...state.dogs_backup.filter(dog=> dog.id !== id), action.payload]}

            
        //eliminamos
      case DELETE_DOG:
            return({
                ...state,
                dogs: state.dogs.filter( breed => breed.id !== action.payload),
                dogs_backup: state.dogs_backup.filter( breed => breed.id !== action.payload)
            })
            
            //en caso de ser de la API o BDD
      case FILTER_BY_SOURCE:
           
            if(action.payload === "all"){
                dogsFiltered = state.dogs; 
            } else if(action.payload === "api"){
                dogsFiltered = state.dogs.filter(dog => dog.created === false); 
              //dejamos entrar  
            } else {
                dogsFiltered = state.dogs.filter(dog =>dog.created=== true); 
            }    
              //devolvemos el estado actualizado      
            return{...state, dogs: dogsFiltered }
            //segun su origen ó temperamento
      case FILTER_BY_TEMPERAMENTS:
          
            dogsFiltered = action.payload === 'all' ? state.dogs : state.dogs.filter(dog => {
                  if(!dog.temperaments) return undefined;
                  return dog.temperaments.includes(action.payload)
            })
           
            return({...state, dogs: dogsFiltered})

            //borramos y restauramos la lista de respaldo
      case REMOVE_FILTERS:
            return{...state, dogs:state.dogs_backup}


            //comenzamos con los ordenamientos

            
      case SORT_NAME:
            const sortedDogsABC = [...state.dogs];
            if(action.payload === 'abc'){
                sortedDogsABC.sort( (a,b) => a.name.localeCompare(b.name))
            }
            else {
                sortedDogsABC.sort( (a,b) => b.name.localeCompare(a.name))
            }
            return({
                ...state,
                dogs: sortedDogsABC
            })
            
       case SORT_WEIGHT:
             const sortedDogsWeight = [...state.dogs];
             sortedDogsWeight.forEach(dog => {
               const weights = dog.weight.split(' - ').map(w => parseInt(w)); 
               dog.avg = weights.reduce((a,b) => a + (isNaN(b) ? a : b), 0) / weights.length; 
             });
             if (action.payload === 'asc') {
               sortedDogsWeight.sort((a,b) => a.avg - b.avg);
             } else {
               sortedDogsWeight.sort((a,b) => b.avg - a.avg);
             }
             return {
               ...state,
               dogs: sortedDogsWeight
             };
                
         case SORT_HEIGHT:
            const sortedHeight = [...state.dogs];
            sortedHeight.forEach(dog=>{
                  const heights = dog.height.split(' - ').map(h=> parseInt(h));

                  dog.avg = heights.reduce((a,b)=> a + (isNaN(b) ? a : b), 0) / heights.length;
            });
            if( action.payload === 'asc'){
                  sortedHeight.sort((a,b)=> a.avg -b.avg);
            } else{
                  sortedHeight.sort((a,b)=> b.avg -a.avg);
            }
            return{
                  ...state,
                  dogs:sortedHeight
            }

      default:
           return {...state}
    }
}
     

export default reducer;