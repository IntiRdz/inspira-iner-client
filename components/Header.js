import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/dist/client/router';
import jwtDecode from 'jwt-decode';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {
    const router = useRouter();

    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp < currentTime;
    };

    // query de apollo
    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    useEffect(() => {
        const authToken = localStorage.getItem('token'); 
    
        if (!authToken || isTokenExpired(authToken)) {
            // Usar el método replace en lugar de push para evitar que el usuario pueda volver atrás con el botón de navegación
            router.replace('/login');
        }
    }, [router]);

    if (loading) return null;

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
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