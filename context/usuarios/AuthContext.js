import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.replace('/login');
    };

    useEffect(() => {
        const isTokenExpired = (token) => {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        };

        if (!authToken) {
            if (router.pathname !== '/login' && router.pathname !== '/nuevacuenta') {
                router.replace('/login');
            }
        } else if (isTokenExpired(authToken)) {
            cerrarSesion();
        } else {
            // Aquí podrías verificar si necesitas actualizar los datos del usuario
            // o si ya los tienes del proceso de inicio de sesión.
        }
    }, [authToken, router]);

    return (
        <AuthContext.Provider value={{ user, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};
