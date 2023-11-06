import React from 'react';
import Link from 'next/link';
import { useContext } from "react";
import SidebarContext from "../context/sidebar/SidebarContext";
import { useRouter } from 'next/router';

const SidebarItem = ({ icon, text, alert, href }) => {
  const { expanded } = useContext(SidebarContext);
  
  const router = useRouter();
  const active = router.pathname === href;

  // Cambia el color del ícono dependiendo si la ruta está activa
  const iconColor = active ? '#4f46e5' : '#808080'; // Azul para activo, gris para inactivo
  const IconComponent = React.cloneElement(icon, { color: iconColor });

  return (
    <Link href={href} passHref>
      <a
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
        `}
      >
        {IconComponent}
        <span className={`overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}`}>
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400 ${expanded ? "" : "top-2"}`}
          />
        )}
        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible group-hover:visible group-hover:opacity-100 -translate-x-3 opacity-20 transition-all
            `}
          >
            {text}
          </div>
        )}
      </a>
    </Link>
  );
};

export default SidebarItem;
