 import style from './LandingPage.module.css';
import {Link} from 'react-router-dom';


const Landing = () => {


    const dogImages = [
        'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
        'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=394&q=80',
        'https://images.unsplash.com/photo-1629740067905-bd3f515aa739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80',
        'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
        'https://images.pexels.com/photos/4588435/pexels-photo-4588435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ]; 


    return (
        <div className={style.container}>
          <div className={style.infoContainer}>
            <h1 className={style.title}>PORTAL DOGS</h1>
            <h2 className={style.subtitle}>Bienvenido/a</h2>
            <ul className={style.features}>
              <li>Aquí podras buscar perros por su raza.</li>
              <li>Visualizar la información de los perros.</li>
              <li>Filtrar y ordenar búsqueda.</li>
              <li>Registrar nuevos perros.</li>
            </ul>
                <br></br>
                             


          </div>
          <br></br>
          <br></br> 

          <div ><h4 className={style.hasclic}>HAS CLIC EN CUALQUIER PERRITO PARA ENTRAR.</h4></div>


          <Link to="/home" className={style.link}>
            <div className={style.imageContainer}>
              {dogImages.map((dogImage, index) => (
                <img key={index} src={dogImage} alt="perritos"></img>
              ))}
            </div>
          </Link>

             

        </div>
      );
    

    
};

export default Landing;