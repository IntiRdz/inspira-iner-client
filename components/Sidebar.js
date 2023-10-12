import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

const Sidebar = () => {

    // routing de next
    const router = useRouter();

    // console.log(router.pathname)

    return ( 
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/6 sm:min-h-screen p-5" >
            <div>
                <p className="text-white text-2xl font-black">Perfiles</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/nuevopaciente" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/nuevopaciente">
                        <a className="text-white block">
                            Urgencias
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/nuevopaciente" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/nuevopaciente">
                        <a className="text-white block">
                            Servicios Clínicos
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/pacientes" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Admisión y Coordinacion
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/camas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camas">
                        <a className="text-white block">
                            UVEH
                        </a>
                    </Link>
                </li>
            </nav>

            <div className="sm:mt-10">
                <p className="text-white text-2xl font-black">Busquedas</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/nuevopaciente" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/nuevopaciente">
                        <a className="text-white block">
                            Ingresar nuevo paciente 
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/camas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camasocupadas">
                        <a className="text-white block">
                            Pacientes Hospitalizados
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/nuevacama" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camasdisponibles">
                        <a className="text-white block">
                            Camas Libres
                        </a>
                    </Link>
                </li>
            </nav>

        </aside>
     );
}
 
export default Sidebar;