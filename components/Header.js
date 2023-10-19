import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/dist/client/router';
import jwtDecode from 'jwt-decode';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            _id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    const router = useRouter();

    // query de apollo
    const { data, loading, error} = useQuery(OBTENER_USUARIO);

    //console.log('Data de usuario',data)
    // console.log(loading)
    // console.log(error)

    // Función para verificar si el token está expirado
    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Fecha actual en segundos
        return decodedToken.exp < currentTime;
    };

    // Verifica si el token está expirado o no existe
    const authToken = localStorage.getItem('token'); // Cambia esto por tu forma de obtener el token

    if (!authToken || isTokenExpired(authToken)) {
        // Si no hay token o está expirado, redirige a la página de autenticación
        (async () => {
        await router.push('/login');
        })();
        return null; // No renderices nada más en este componente
    }

    // Proteger que no accedamos a data antes de tener resultados
    if (loading) return null;

/*     // Verifica que data y data.obtenerUsuario estén definidos
     if (!data || !data.obtenerUsuario) {
        (async () => {
            await router.push('/login');
        })();
        return null;
    }
     */

 

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        (async () => {
            await router.push('/login');
        })();
    }

    return ( 
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {nombre} {apellido}</p>

            <button 
                onClick={() => cerrarSesion() }
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"    
            >
                Cerrar Sesión
            </button>
        </div>
        
     );
}
 
export default Header;