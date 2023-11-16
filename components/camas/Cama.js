import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { format } from 'date-fns';


const ELIMINAR_CAMA = gql`
    mutation eliminarCama($id: ID!) {
        eliminarCama(id: $id) 
    }
`;

const OBTENER_CAMAS = gql`
query ObtenerCamas {
  obtenerCamas {
    id
    cama_numero
    cama_compartida
    cama_lado
    cama_prioridad
    cama_disponible
    cama_ocupada
    cama_genero
    cama_dispositivo_o2
    cama_hemodialisis
    cama_aislamiento
    cama_dan
    cama_codigo_uveh
    creado
    paciente_relacionado {
      id
      pac_nombre
    }
    microorganismo_relacionado {
      id
      microorganismo_nombre
    }
  }
}
`;

const Cama = ({cama}) => {
    const { 
        cama_numero,
        cama_compartida,
        cama_lado,
        cama_prioridad,
        cama_disponible,
        cama_ocupada,
        cama_genero,
        cama_dispositivo_o2,
        cama_hemodialisis,
        cama_aislamiento,
        cama_dan,
        cama_codigo_uveh,
        id
     } = cama;

    // Mutation para eliminar camas
    const [ eliminarCama ] = useMutation(ELIMINAR_CAMA, {
        update(cache) {
            const { obtenerCamas } = cache.readQuery({
                query: OBTENER_CAMAS
            });

            cache.writeQuery({
                query: OBTENER_CAMAS,
                data: {
                    obtenerCamas: obtenerCamas.filter( camaActual => camaActual.id !== id )
                }
            })
        }
    });

    const editarCama = () => {
        Router.push({
            pathname: `/editarcama/${cama.id}`,
        })
    }

    function getRowClass(camaLado) {
        if (camaLado === 'Pasillo') {
            return 'border-inferior-verde';
        } else if (camaLado === 'Ventana') {
            return 'border-superior-verde';
        }
        return '';
    }

    return ( 
        <tr className={getRowClass(cama_lado)}>
            <td className="border px-4 py-2">{cama_numero} </td>
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_compartida) {
                        case true:
                        return 'bg-indigo-100';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_compartida ? 'Compartido' : 'Aislado'}
            </td>
            
            {/* <td className="border px-4 py-2">{cama_lado} </td> */}
            <td className="border px-4 py-2">{cama_prioridad} </td>
            <td className="border px-4 py-2">{cama_disponible ? 'Disponible' : 'No disponible'} </td>
            <td className="border px-4 py-2">{cama_ocupada ? 'Ocupada' : 'Libre'} </td>
            <td className="border px-4 py-2">{cama_genero} </td>
            <td className="border px-4 py-2">{cama_dispositivo_o2} </td>
            <td className="border px-4 py-2">{cama_hemodialisis ? 'HD' : 'No HD'} </td>
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_codigo_uveh) {
                        case 'Previamente_Acinetobacter':
                        return 'bg-pink-300';
                        case 'Previamente_Clostridium':
                            return 'bg-emerald-300';
                        case 'Previamente_Enterobacterias_XDR':
                        return 'bg-violet-300';
                        case 'Previamente_Pseudomonas_Aeruginosa_XD':
                        return 'bg-amber-400';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_codigo_uveh}
            </td>
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_aislamiento) {
                        case true:
                        return 'bg-rose-200';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_aislamiento ? 'Asilamiento' : 'No Aislamiento'}
            </td>
            {/* <td className="border px-4 py-2">{cama_dan ? 'Sí' : 'No'} </td> */}
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_dan) {
                        case true:
                        return 'bg-red-400';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_dan ? 'DAN' : 'No DAN'}
            </td>
            <td className="border px-4 py-2">
                     <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => editarCama() }
                    >
                        Editar
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
            </td>
        </tr>
     );
}
 
export default Cama;
