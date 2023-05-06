import { Link } from "react-router-dom";
import style from './NavBar.module.css';

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            <Link to='/'>PRINCIPAL</Link>
            <Link to='/home'>HOME</Link>
            <Link to='/create'>REGISTRA TU PERRO </Link>
            <Link to='/about'>ESTA PAGINA.</Link>
        </div>
    )
}

export default NavBar;