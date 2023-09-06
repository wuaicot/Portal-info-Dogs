import axios from 'axios';

import { SORT_HEIGHT,GET_TEMPERAMENTS, GET_DOG, GET_DOGS, GET_DOG_BY_NAME, FILTER_BY_SOURCE, FILTER_BY_TEMPERAMENTS, SORT_NAME, SORT_WEIGHT, REMOVE_FILTERS, CLEAN_DOG_DETAILS, LOADING, CREATE_DOG, UPDATE_DOG } from './actionTypes';


const SERVER_URL = 'http://localhost:3001';

export const getDogs = () => {
    return async function(dispatch){
        //llamamos funcion y desencadenamos la acción de carga        
        try{
            dispatch(({type:LOADING})); 
         //llamamos a la API para pedirle info        
        const apiData = await axios.get(`${SERVER_URL}/dogs`);
        //obtenemos la lista de perros 
        const dogs = apiData.data;
         //despachamos asia el store
        dispatch({type:GET_DOGS, payload: dogs})
        }catch (error) {
             alert(error.message);
          }
    }
}

export const getDog = (id) => {
    return async function(dispatch){
        try{
            dispatch({type:LOADING});
        const apiData = await axios.get(`${SERVER_URL}/dogs/${id}`)
        const dog = apiData.data;
        dispatch({type:GET_DOG, payload:dog})
        }catch (error) { 
            alert(error.message)
    }
 }
}


export const getDogByName =(name) =>{
    return async function (dispatch){
        try{
            const dog = (await axios.get(`${SERVER_URL}/dogs?name=${name}`)).data;
            dispatch({type: GET_DOG_BY_NAME, payload:dog})
        }catch (error) { 
            alert(error.message)
      }
    }
}

export const getTemperaments = ()=>{
    return async function (dispatch){
       try{
        const temp = (await axios.get(`${SERVER_URL}/temperaments`)).data
        dispatch({type: GET_TEMPERAMENTS, payload: temp})   
       } catch (error) { 
        alert(error.message)
    }
  }
}

export const cleanDogDetails = ()=>{
    return({type:CLEAN_DOG_DETAILS})
}
export const setLoading = ()=>{
    return({type:LOADING})
}
export const createDog = (form)=>{
    return async function(dispatch){
        try{
            const create = (await axios.post(`${SERVER_URL}/dogs`, form)).data
             dispatch({type: CREATE_DOG, payload: create})
           }catch (error) { 
                alert(error.message)
            }
    }
}

export function deleteDog(id) {
    return async function(dispatch){
        try{
            await axios.delete(`${SERVER_URL}/dogs/${id}`)
            return (
                dispatch({
                        type: "DELETE_DOG",
                        payload: id  
                })
            )       
        }
        catch (e){
            console.log(e.message);
        }
    }
}

export const updateDog=(id)=>{
    return async function(dispatch){
        try{
            const update = (await axios.put(`${SERVER_URL}/dogs/${id}`))
           dispatch({type:UPDATE_DOG, payload:update})
        }catch (e){
            console.log(e.message);
        }
    }
}

//FILTER
export const filterBySource= (payload)=>{
    return({type:FILTER_BY_SOURCE, payload})
}
export const filterByTemperaments = (payload)=>{
    return({type: FILTER_BY_TEMPERAMENTS, payload })
}
export const removeFilters = ()=>{
    return({type:REMOVE_FILTERS})
}


//ORDER
export const sortName = (payload) =>{
    return({type: SORT_NAME, payload})
}
export const sortWeight = (payload)=>{
    return({type: SORT_WEIGHT, payload})
}

export const sortHeight = (payload)=>{
    return({type: SORT_HEIGHT, payload})
}Administrador@NRLV-EliteBook MINGW64 ~/OneEliteBook MINGW64 ~otCamp/Portal-info-Dogs/OneDrive/Escritorio/BootCamp/Portal-info-Dogs/api (main)

$ npm start        

> api@1.0.0 start  atabase has been establ
> node index.js    
                   n port 3001
Connection to the database has been established successfully.
Server is running on port 3001        
OPTIONS /dogs 204 5.152 ms - 0        
Recibida solicitud 
para crear un nuevo perro: {
  name: 'pruba doce',
  height_min: '20',  height_max: '30',  weight_min: '5', 
  weight_max: '10',  life_span: '20', 
  image: 'https://w7.pngwing.com/pngs/601/175/png-transparent-dog-dog-png-pets-image-wild-life-thumbnail.png',    
  temperamentId: [ 
'12', '16', '10', '18', '15' ],       
  tempName: [ null, null, null, null, 
null ]
}
POST /dogs 201 395.603 ms - 243