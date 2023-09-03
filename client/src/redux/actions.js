import axios from 'axios';

import { SORT_HEIGHT,GET_TEMPERAMENTS, GET_DOG, GET_DOGS, GET_DOG_BY_NAME, FILTER_BY_SOURCE, FILTER_BY_TEMPERAMENTS, SORT_NAME, SORT_WEIGHT, REMOVE_FILTERS, CLEAN_DOG_DETAILS, LOADING, CREATE_DOG, UPDATE_DOG } from './actionTypes';


const SERVER_URL = 'http://localhost:3001';

export const getDogs = () => {
    return async function(dispatch){
        dispatch({type:LOADING});
        const apiData = await axios.get(`${SERVER_URL}/dogs`);
        const dogs = apiData.data;
        dispatch({type:GET_DOGS, payload: dogs})
    }
}

export const getDog = (id) => {
    return async function(dispatch){
        dispatch({type:LOADING});
        const apiData = await axios.get(`${SERVER_URL}/dogs/${id}`)
        const dog = apiData.data;
        dispatch({type:GET_DOG, payload:dog})
    }
}


export const getDogByName =(name) =>{
    return async function (dispatch){
        const dog = await axios.get(`${SERVER_URL}/dogs?name=${name}`).data;
        dispatch({type: GET_DOG_BY_NAME, payload:dog})
    }
}

export const getTemperaments = ()=>{
    return async function (dispatch){
        const temp = await axios.get(`${SERVER_URL}/temperaments`).data
        dispatch({type: GET_TEMPERAMENTS, payload: temp})    
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
            const create = await axios.post(`${SERVER_URL}/dogs`, form).data
             dispatch({type: CREATE_DOG, payload: create})
    } catch(error){
        alert(error.create)
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
        const update = await axios.put(`${SERVER_URL}/dogs/${id}`)
        dispatch({type:UPDATE_DOG, payload:update})
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