import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import jwtDecode from 'jwt-decode';
import { Navbar } from './Navbar';

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

    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    useEffect(() => {
        const authToken = localStorage.getItem('token');
    
        if (!authToken || isTokenExpired(authToken)) {
            router.replace('/login');
        }
    }, [router]);

    if (loading) return null;

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <Navbar usuario={{ nombre, apellido }} onCerrarSesion={cerrarSesion} />
    );
};

export default Header;
