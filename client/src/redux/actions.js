import axios from 'axios';

import { SORT_HEIGHT,GET_TEMPERAMENTS, GET_DOG, GET_DOGS, GET_DOG_BY_NAME, FILTER_BY_SOURCE, FILTER_BY_TEMPERAMENTS, SORT_NAME, SORT_WEIGHT, REMOVE_FILTERS, CLEAN_DOG_DETAILS, LOADING, CREATE_DOG, UPDATE_DOG,  } from './actionTypes';//importamos los tipos de acciones (constantes) necesaros para este archivo.


const SERVER_URL = 'https://db-portafolio-da6717d3fd5f.herokuapp.com/';
   //'http://localhost:3001'
   
//definimos las diversas funciones asíncronas para hacer solicitudes API

export const getDogs = () => { 
    return async function(dispatch){
        //llamamos funcion y desencadenamos la acción de carga        
        try{
            dispatch(({type:LOADING})); 
         //llamamos a la API para pedirle info        
        const apiData = await axios.get(`${SERVER_URL}`);///dogs
        //obtenemos la lista de perros 
        const dogs = apiData.data;
         //despachamos asia el store
        dispatch({type:GET_DOGS, payload: dogs})
        }catch (error) {
             alert(error.message);
          }
    }
} 


  //tomamos del parametro id
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
//por nombre
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
//buscamos los temperamentos
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
// limpiamos lista de detalles
export const cleanDogDetails = ()=>{
    return({type:CLEAN_DOG_DETAILS})
}//cargando
export const setLoading = ()=>{
    return({type:LOADING})
}

//creamos un perro, si algo rompe  manejamos el error con el try-catch
export const createDog = (form)=>{
    return async function(dispatch){
        try{
            const create = (await axios.post(`${SERVER_URL}/dogs`, form)).data
             dispatch({type: CREATE_DOG, payload: create})
             //mostramos un alert en el navegador
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
}