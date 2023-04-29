import React from "react";
import style from './Loading.module.css';


const Loading = () => {
    return(
        <div  className={style.container}>
            <img src= 'loading.gif' ></img>
    
        </div>
    )
}

export default Loading;