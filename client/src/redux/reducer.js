import {SORT_HEIGHT, GET_DOGS, GET_DOG , CLEAN_DOG_DETAILS , CREATE_DOG, GET_DOG_BY_NAME,  GET_TEMPERAMENTS, LOADING, FILTER_BY_SOURCE, FILTER_BY_TEMPERAMENTS, REMOVE_FILTERS, SORT_NAME, SORT_WEIGHT, DELETE_DOG, UPDATE_DOG} from  './actionTypes';

const initialState = {
    dogs: [], //!DOGS WITH FILTERS
    dogs_backup: [], //!ALL DOGS ALWAYS
    dog_details: {},
    temperaments: [],
    loading: false,
}


const reducer = (state=initialState, action) =>{
      let dogsFiltered = [];

    switch(action.type){
       
      case GET_DOGS:
            return{...state, dogs: action.payload, dogs_backup: action.payload, loading:false}
      
      case GET_DOG:
            return{...state, dog_details: action.payload, loading:false}
            
      case GET_TEMPERAMENTS:
            return{...state, temperaments: action.payload}   
        

      case GET_DOG_BY_NAME:
            return{...state, dogs: action.payload}

      case CLEAN_DOG_DETAILS:
            return{...state, dog_details: {}}
        
      case LOADING:
            return{...state, loading:true}
      case CREATE_DOG:
            return{...state, dogs:[...state.dogs, action.payload], dogs_backup: [...state.dogs_backup, action.payload]}

      case UPDATE_DOG:
            let id = action.payload.id;
           
            return{...state, dogs: [...state.dogs.filter(dog=> dog.id !== id), action.payload], dogs: [...state.dogs_backup.filter(dog=> dog.id !== id), action.payload]  }

      case DELETE_DOG:
            return({
                ...state,
                dogs: state.dogs.filter( breed => breed.id !== action.payload),
                dogs_backup: state.dogs_backup.filter( breed => breed.id !== action.payload)
            })

      case FILTER_BY_SOURCE:
           
            if(action.payload === "all"){
                dogsFiltered = state.dogs; 
            } else if(action.payload === "api"){
                dogsFiltered = state.dogs.filter(dog => dog.created === false); 
                
            } else {
                dogsFiltered = state.dogs.filter(dog =>dog.created=== true); 
            }          
            return{...state, dogs: dogsFiltered }
     
      case FILTER_BY_TEMPERAMENTS:
          
            dogsFiltered = action.payload === 'all' ? state.dogs : state.dogs.filter(dog => {
                  if(!dog.temperaments) return undefined;
                  return dog.temperaments.includes(action.payload)
            })
           
            return({...state, dogs: dogsFiltered})


      case REMOVE_FILTERS:
            return{...state, dogs:state.dogs_backup}

      case SORT_NAME:
            const sortedDogsABC = [...state.dogs];
            if(action.payload === 'asc'){
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