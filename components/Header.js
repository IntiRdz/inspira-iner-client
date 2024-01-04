import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from './Navbar';
import { AuthContext } from '../context/usuarios/AuthContext'; // Asegúrate de usar la ruta correcta

const Header = () => {

    const { user, iniciarSesion, cerrarSesion } = useContext(AuthContext);

    const manejarLogin = () => {
        // Suponiendo que obtienes un token de alguna manera
        const token = 'tu_token_jwt';
        iniciarSesion(token);
    };

    const manejarLogout = () => {
        cerrarSesion();
    };

    const {nombre, apellido} = user || {};

    return ( 
            <Navbar usuario={{ nombre, apellido }}  onCerrarSesion={cerrarSesion}  />
     );
}
 
export default Header;

