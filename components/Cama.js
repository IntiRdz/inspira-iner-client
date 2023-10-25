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
    cama_disponible
    cama_ocupada
    cama_genero
    cama_dispositivo_o2
    cama_hemodialisis
    cama_aislamiento
    cama_dan
    cama_codigo_uveh
    cama_fecha_inicio
    cama_fecha_fin
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
        cama_disponible,
        cama_ocupada,
        cama_genero,
        cama_dispositivo_o2,
        cama_hemodialisis,
        cama_aislamiento,
        cama_dan,
        cama_codigo_uveh,
        cama_fecha_inicio,
        cama_fecha_fin,
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

/*     const confirmarEliminarCama = () => {
        Swal.fire({
            title: '¿Deseas eliminar a esta cama?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
          }).then( async (result) => {
                if (result.value) {
                        try {
                            // eliminar cama de la bd
                            const { data } = await eliminarCama({
                                variables: {
                                    id
                                }
                            });

                            Swal.fire(
                                'Correcto',
                                data.eliminarCama,
                                'success'
                            )
                        } catch (error) {
                            console.log(error);
                        }
                
                }
          })
    } */

    const editarCama = () => {
        Router.push({
            pathname: `/editarcama/${cama.id}`,
        })
    }

    return ( 
        <tr>
            <td className="border px-4 py-2">{cama_numero} </td>
            <td className="border px-4 py-2">{cama_compartida ? 'Sí' : 'No'} </td>
            <td className="border px-4 py-2">{cama_disponible ? 'Sí' : 'No'} </td>
            <td className="border px-4 py-2">{cama_ocupada ? 'Sí' : 'No'} </td>
            <td className="border px-4 py-2">{cama_genero} </td>
            <td className="border px-4 py-2">{cama_dispositivo_o2} </td>
            <td className="border px-4 py-2">{cama_hemodialisis ? 'Sí' : 'No'} </td>
            {/* <td className="border px-4 py-2">{cama_codigo_uveh} </td> */}
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
           {/*  <td className="border px-4 py-2">{cama_aislamiento ? 'Sí' : 'No'} </td> */}
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
                {cama_aislamiento ? 'Sí' : 'No'}
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
                {cama_dan ? 'Sí' : 'No'}
            </td>
            <td className="border px-4 py-2">{cama.cama_fecha_inicio ? format(new Date(cama.cama_fecha_inicio), 'dd-MM-yy') : ''}</td>
            <td className="border px-4 py-2">{cama.cama_fecha_fin ? format(new Date(cama.cama_fecha_fin), 'dd-MM-yy') : ''}</td>
{/*             <td className="border px-4 py-2">
                <button
                    type="button"
                    className={`flex justify-center items-center ${cama_ocupada ? 'bg-red-800' : 'bg-green-800'} py-2 px-4 w-full text-white rounded text-xs uppercase font-bold`}
                    onClick={() => confirmarEliminarCama() }
                >
                    {cama_ocupada ? 'Liberar' : 'Ocupar'}
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td> */}
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
