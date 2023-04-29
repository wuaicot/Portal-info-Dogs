import style from './About.module.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';


const Imagen = styled.img`
    filter: drop-shadow: 10px 10px 5px #fff;
    filter: blur(10px)
    opacity: 0.9;
    position: relative;
    animation: mymove 5s infinite;

  @keyframes mymove {
    0%   {top: 0px;}

    50%  {top: 50px;}

    100% {top: 0px;}
  }
`
const About = () => {

    return(
        <div className={style.div}>
          <div className={style.container}>

            <h1 className={style.titulo}>PORTAL INFO-DOGS by Naycol R. Linares V</h1>
            <p className={style.p} >Henry Academy - Individual Project: React, Redux, Node, Express y Sequelize. <br></br></p>
            <p>Este es mi proyecto personal para el BootcampHenry Development Fullstack, el cual consiste en desarrollar un info-porál utilizando la API de **TheDogApi**. Podrás realizar búsquedas, crear, filtrar y ordenar tus videojuegos favoritos.</p>

            <h2 className={style.p}>Follow me:
            <div style={{fontSize:'1.5em', color: 'white', position:'absolute', display:'inline-block', marginLeft: '0.5em', marginTop:'-0.2em'}}>
            <FontAwesomeIcon icon={faLinkedin}onClick={()=>{window.open('https://www.linkedin.com/in/lucia-bellardi-7184481a5/')}}/>{' '}
            <FontAwesomeIcon icon={faGithub} onClick={()=>{window.open('https://github.com/LuciaBe')}}/>{' '}
            <FontAwesomeIcon icon={faInstagram} onClick={()=>{window.open('https://www.instagram.com/lubellardi/')}}/>{' '}
            <FontAwesomeIcon icon={faFacebook} onClick={()=>{window.open('https://www.facebook.com/lu.bellardi')}}/>{' '}
            </div>

            </h2>

          </div>

            <div>
            <Imagen src='dogs.png' alt='imagen' ></Imagen>
            </div>


        </div>

    )

}

export default About;