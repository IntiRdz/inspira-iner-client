import React, { useState } from 'react';
import { AstronautIcon } from './icons/AstronautIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navbar = ({ usuario, onCerrarSesion }) => {
  
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-gray-800 fixed top-0 w-full z-10">
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
                    {/* Resto de la barra de navegación */}
                    {/* ...Resto del código para la barra de navegación... */}

                    {/* Menú desplegable para el usuario */}
                    <div className="relative ml-3">
                        <button onClick={toggleDropdown} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded={isDropdownOpen} aria-haspopup="true">
                            <span className="sr-only">Open user menu</span>
                            <AstronautIcon color='white' />
                        </button>

                        {isDropdownOpen && (
                            {/* Menú desplegable */}
                            {/* ...Menú desplegable... */}
                        )}
                    </div>
                </div>
            </div>

            {/* Menú móvil, se muestra u oculta según el estado */}
            {isDropdownOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/* Enlaces del menú móvil */}
                        {/* ...Enlaces... */}
                    </div>
                </div>
            )}
        </nav>
    );
};
