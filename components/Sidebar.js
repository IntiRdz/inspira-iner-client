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
                            Ingresar Paciente
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/pacientes" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Editar Paciente
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/camas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camas">
                        <a className="text-white block">
                            Editar Cama
                        </a>
                    </Link>
                </li>
            </nav>

            <div className="sm:mt-10">
                <p className="text-white text-2xl font-black">Busquedas</p>
            </div>

            <div className="sm:mt-10">
                <p className="text-white text-1xl font-black">Pacientes</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Todos los Pacientes 
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/pacwobed" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/pacwobed">
                        <a className="text-white block">
                            Pacientes sin cama asignada 
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/pacienteshospitalizados" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/pacienteshospitalizados">
                        <a className="text-white block">
                            Pacientes Hospitalizados
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "pacientesnoospitalizados" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/pacientesnoospitalizados">
                        <a className="text-white block">
                            Pacientes no Hospitalizados
                        </a>
                    </Link>
                </li>
                <div className="sm:mt-10">
                    <p className="text-white text-1xl font-black">Camas</p>
                </div>
                <li className={router.pathname === "/camas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camas">
                        <a className="text-white block">
                            Todas las Camas
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/camasdisponibles" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camasdisponibles">
                        <a className="text-white block">
                            Camas Disponibles
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/camasocupadas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camasocupadas">
                        <a className="text-white block">
                            Camas Ocupadas
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/camasocupadas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/camasocupadas">
                        <a className="text-white block">
                            Tablero
                        </a>
                    </Link>
                </li>
            </nav>

        </aside>
     );
}
 
export default Sidebar;