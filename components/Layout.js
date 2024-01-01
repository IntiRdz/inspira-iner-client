import React, { useContext } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { useRouter } from 'next/router';


const Layout = ({ children }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>INER - Administración de Pacientes</title>
            </Head>

            {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>
                        {children}
                    </div>
                    
                </div>
            ) : (
                <div className="mi-gradiente min-h-screen">
                    <main className="flex-grow overflow-auto pt-20 pl-3 pr-3 pb-3 text-sm">
                        <Header />
                        {children}
                    </main>
                </div>
            )}
        </>
    );
};
 
export default Layout;
