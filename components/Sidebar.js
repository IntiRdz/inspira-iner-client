import React, { createContext, useState, useEffect, useContext  } from 'react';
import SidebarContext from "../context/sidebar/SidebarContext";
import { MoreVertical, ChevronLast, ChevronFirst, UserCircle2 } from "lucide-react"

import { AuthContext } from '../context/usuarios/AuthContext';

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  const { user, cerrarSesion } = useContext(AuthContext);
  if (!user) return <div>Cargando...</div>; // O cualquier otra señal de carga que prefieras

  
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-slate-800 border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
{/*                 <img
                    src="https://img.logoipsum.com/243.svg"
                    className={`overflow-hidden transition-all ${
                    expanded ? "w-32" : "w-0"
                    }`}
                    alt=""
                /> */}
                <button
                    onClick={() => setExpanded((curr) => !curr)}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                    {expanded ? <ChevronFirst /> : <ChevronLast />}
                </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3 text-white">
                    <UserCircle2/>
                <div
                    className={`
                    flex justify-between items-center
                    overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                `}
                >
                    <div className="leading-4">
                    <h4 className="font-semibold">Bienvenido</h4>
                    <span className="text-xs text-white font-semibold">{user.nombre} {user.apellido}</span>
                    </div>
                    <MoreVertical size={20} />
                </div>
                </div>
            </nav>
        </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
