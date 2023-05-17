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

    80% {top: 0px;}
  }
`
const About = () => {

    return(
        <div className={style.div}>
          <div className={style.container}>

            <h1 className={style.titulo}>PORTAL INFO-PERROS. by </h1>
            <h1 className={style.titulodos}> Naycol R. Linares V.</h1>
            <p className={style.p} >Henry Academy - Individual Project: React, Redux, Node.js, Express y Sequelize-"psql". <br></br></p>
            <p>Este es mi proyecto personal para el BootcampHenry Development Fullstack, el cual consiste en desarrollar un info-portál conectando con información de una API externa. Podrás realizar búsquedas, crear, filtrar y ordenar tus raza de Perros favoritos.</p>

            <h2 className={style.p}>Sígueme:
            
            
            <div className={style.containI}>
            <FontAwesomeIcon  icon={faLinkedin}className={style.Ilkd}onClick={()=>{window.open('https://www.linkedin.com/in/rodolfo-linares-4066b724b/')}}/>{' '}
            <FontAwesomeIcon icon={faGithub}className={style.Igith} onClick={()=>{window.open('https://github.com/wuaicot')}}/>{' '}
            <FontAwesomeIcon icon={faInstagram}className={style.Iinst} onClick={()=>{window.open('https://www.instagram.com/holasoymoolly/')}}/>{' '}
            <FontAwesomeIcon icon={faFacebook}className={style.Imeta} onClick={()=>{window.open('https://www.facebook.com/')}}/>{' '}
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