import React, { createContext, useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { data, loading, error } = useQuery(OBTENER_USUARIO);
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        if (authToken) {
            const isTokenExpired = (token) => {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; 
                return decodedToken.exp < currentTime;
            };

            if (isTokenExpired(authToken)) {
                router.replace('/login');
            } else {
                if (data) {
                    setUser(data.obtenerUsuario);
                }
            }
        } else {
            // Verifica si la ruta actual no es 'nuevacuenta' para redirigir
            if (router.pathname !== '/nuevacuenta') {
                router.replace('/login');
            }
        }
    }, [authToken, data, router]);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ user, cerrarSesion, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
