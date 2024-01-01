import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';
import { Navbar } from './Navbar';

import { OBTENER_USUARIO } from '../graphql/queries';


const Header = () => {

    const router = useRouter();

    // query de apollo
    const { data, loading, error} = useQuery(OBTENER_USUARIO);

    // console.log(data)
    // console.log(loading)
    // console.log(error)

    // Proteger que no accedamos a data antes de tener resultados
    if(loading) return null;

    // Si no hay informacion
    if(!data) {
        return router.push('/login');
    }

    console.log("first", data.obtenerUsuario)

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return ( 
            <Navbar usuario={{ nombre, apellido }} onCerrarSesion={cerrarSesion} />
     );
}
 
export default Header;