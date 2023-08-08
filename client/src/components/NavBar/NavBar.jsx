//  definimos la barra de navegación que se muestra en la parte superior de la aplicación.

//importamos el link para crear enlaces para navegar sin recargar la pag
import { Link } from "react-router-dom";
import style from './NavBar.module.css';

const NavBar = () => {
    //creamos los enlaces
    return(
        <div className={style.mainContainer}>
            <Link to='/'>INICIO</Link>
            <Link to='/home'>GENERAL</Link>
            <Link to='/create'>REGISTRA TU PERRO</Link>
            <Link to='/about'>INFO.</Link>
        </div>
    )
}
  
export default NavBar;