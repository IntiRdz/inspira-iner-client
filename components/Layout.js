import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useRouter } from 'next/router';

import SidebarItem from '../components/SidebarItem';
import { Home, MessageSquare, Bed, Bug, UserPlus2, UserCog} from "lucide-react";
import { Femele } from './icons/Femele';
import { Male } from './icons/Male';
import { HospitalIcon } from './icons/HospitalIcon';
import { UrgenciasIcon } from './icons/UrgenciasIcon';
import { Navbar } from './Navbar';

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
                    {/* <div className="flex min-h-screen"> */}
{/*                     <Sidebar className="w-1/6"> 
                            <SidebarItem icon={<UserPlus2 />} text="Ingresar Paciente" href="/nuevopaciente" />
                            <SidebarItem icon={<UserCog />} text="Hospitalizados" href="/" />
                            <SidebarItem icon={<Femele />} text="Camas Disponibles Mujer" href="/disponiblesm" />
                            <SidebarItem icon={<Male /> } text="Camas Disponibles Hombre" href="/disponiblesh" />
                            <SidebarItem icon={<Bed />} text="Camas Disponibles" href="/camasdisponibles" />
                            <SidebarItem icon={<Bed />} text="Camas Ocupadas" href="/camasocupadas" />
                            <SidebarItem icon={<Bed />} text="Editar Cama" href="/camas" />
                            <SidebarItem icon={<HospitalIcon />} text="Pacientes (todos) " href="/pacientes" />
                            <SidebarItem icon={<Bed />} text="Pacientes no Hospitalizados" href="/nohospitalizados" />
                        </Sidebar> */}
                        
                        <Header />
                        <main className="flex-grow overflow-auto p-4 text-sm">
                            {/* <Navbar /> */}
                            {children}
                        </main>
                    {/* </div> */}
                </div> 
            )}
        </>
    );
}
 
export default Layout;
