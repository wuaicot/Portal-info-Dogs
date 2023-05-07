//  definimos la barra de navegación que se muestra en la parte superior de la aplicación.

//importamos el link para crear enlaces para navegar sin recargar la pag
import { Link } from "react-router-dom";
import style from './NavBar.module.css';

const NavBar = () => {
    //creamos los enlaces
    return(
        <div className={style.mainContainer}>
            <Link to='/'>PRINCIPAL</Link>
            <Link to='/home'>HOME</Link>
            <Link to='/create'>REGISTRA TU PERRO </Link>
            <Link to='/about'>ESTA PAGINA.</Link>
        </div>
    )
}
  // el componente
export default NavBar;