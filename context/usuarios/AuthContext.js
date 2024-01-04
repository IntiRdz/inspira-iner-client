import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const iniciarSesion = (token) => {
        localStorage.setItem('token', token);
        const userData = jwtDecode(token);
        setUser(userData);
        // Redireccionar a la página de inicio o dashboard tras el inicio de sesión
        router.replace('/dashboard');
    };

    const cerrarSesion = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        router.replace('/login');
    }, [router]);

    useEffect(() => {
        const isTokenExpired = (token) => {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                return decodedToken.exp < currentTime;
            } catch (error) {
                return true;
            }
        };

        if (!authToken) {
            if (router.pathname !== '/login' && router.pathname !== '/nuevacuenta') {
                router.replace('/login');
            }
        } else if (isTokenExpired(authToken)) {
            cerrarSesion();
        } else {
            const userData = jwtDecode(authToken);
            setUser(userData);
        }
    }, [authToken, router, cerrarSesion]);

    const contextValue = useMemo(() => ({
        user,
        iniciarSesion,
        cerrarSesion,
    }), [user, cerrarSesion]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};