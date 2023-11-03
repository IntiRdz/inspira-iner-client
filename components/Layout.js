import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useRouter } from 'next/router';

import SidebarItem from '../components/SidebarItem';
import { Home, MessageSquare, Bed, Bug } from "lucide-react";

const Layout = ({ children }) => {
    // Hook de routing
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
                <div className="bg-gray-200 min-h-screen">
                    <div className="flex min-h-screen">
                        <Sidebar className="w-1/6"> 
                            <SidebarItem icon={<Home />} text="Ingresar Paciente" href="/nuevopaciente" />
                            <SidebarItem icon={<MessageSquare />} text="Editar Paciente" href="/" />
                            <SidebarItem icon={<Bed />} text="Pacientes Hospitalizados" href="/hospitalizados" />
                            <SidebarItem icon={<Bed />} text="Pacientes no Hospitalizados" href="/nohospitalizados" />
                            <SidebarItem icon={<Bed />} text="Camas Disponibles" href="/camasdisponibles" />
                            <SidebarItem icon={<Bed />} text="Camas Ocupadas" href="/camasocupadas" />
                            <SidebarItem icon={<Bed />} text="Editar Cama" href="/camas" />
                            {/* ... más ítems ... */}
                        </Sidebar>
                        
                        <main className="flex-grow overflow-auto p-4 text-sm">
                            <Header />
                            {children}
                        </main>
                    </div>
                </div> 
            )}
        </>
    );
}
 
export default Layout;
