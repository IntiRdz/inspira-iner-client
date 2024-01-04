import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AstronautIcon } from './icons/AstronautIcon';

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const linkClass = `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-blue-600" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`;

  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
};

export const Navbar = ({ usuario, onCerrarSesion }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
    const menuItems = useMemo(() => [
      { href: "/nuevopaciente", label: "Ingresar Paciente" },
      { href: "/", label: "Urgencias" }, 
      { href: "/clinico1", label: "1" },
      { href: "/clinico2", label: "2" },
      { href: "/clinico3", label: "3" },
      { href: "/clinico4", label: "4" },
      { href: "/clinico5", label: "5" },
      { href: "/clinico7", label: "7" },
      { href: "/clinico8", label: "8" },
      { href: "/clinico9", label: "9" },
      { href: "/clinico10", label: "10" },
      { href: "/camas", label: "Camas" },
      { href: "/camasdisponibles", label: "Camas Disponibles" },
      // Agrega aquí más elementos según sea necesario
    ], []);
    
    return (
        <nav className="bg-gray-900 fixed top-0 w-full z-10 mr-2">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                {/* Botón para abrir/cerrar el menú móvil */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button type="button" onClick={toggleDropdown} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Menú</span>
                        {/* Icono que cambia dependiendo del estado del menú */}
                        <svg className={`${isDropdownOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg className={`${isDropdownOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {menuItems.map(item => (
                                            <NavLink key={item.href} href={item.href}>
                                            {item.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Botón para abrir el menú desplegable */}
                    <div className="relative ml-3">
                        <button onClick={toggleDropdown} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded={isDropdownOpen} aria-haspopup="true">
                            {/* Icono del usuario o imagen */}
                            <span className="sr-only">Open user menu</span>
                            {/* Reemplaza esto por <Image /> si estás usando imágenes optimizadas */}
                            <AstronautIcon color='white' />
                        </button>

                        {/* Menú desplegable */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                            <p className="block px-4 py-2 text-sm text-gray-700"> Bienvenid@,
                            </p>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">{usuario.nombre} {usuario.apellido}</a>
                            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Perfil</a> */}
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Configuracion</a>
                            <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" onClick={onCerrarSesion}>Cerrar Sesión</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {isDropdownOpen && (
        <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            {/*<a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
            */}
        
            </div>
        </div>
        )}
    </nav>
      );
    };


    
export default Navbar;

