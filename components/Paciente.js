import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { format, differenceInYears } from 'date-fns';

const ELIMINAR_PACIENTE = gql`
    mutation eliminarPaciente($id: ID!) {
        eliminarPaciente(id:$id) 
    }
`;

const OBTENER_PACIENTES = gql`
query obtenerPacientes {
    obtenerPacientes{
        id
        expediente
        pac_apellido_paterno
        pac_apellido_materno
        pac_nombre
        pac_genero
        pac_FN
        pac_dispositivo_o2
        pac_hemodialisis
        diagnostico
        pac_codigo_uveh
        fecha_ingreso
        fecha_prealta
        fecha_egreso
        hospitalizado
    }
  }
`;



const Paciente = ({paciente}) => {
    
    // Función para formatear una fecha en el formato deseado
    const formatFecha = (fecha, formato) => {
        return format(new Date(fecha), formato);
    };
    
    // Uso de la función para formatear la fecha de ingreso
    const fechaNac = formatFecha(paciente.pac_FN, 'dd-MM-yy');
    const fechaIngreso = formatFecha(paciente.fecha_ingreso, 'dd-MM-yy');

    //console.log('Fecha de nacimiento con formato:', fechaIngreso);


    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        return differenceInYears(hoy, fechaNac);
    };  

    const pac_edad = calcularEdad(paciente.pac_FN);

    // mutation para eliminar paciente
    const [ eliminarPaciente ] = useMutation( ELIMINAR_PACIENTE, {
        update(cache) {
            // obtener una copia del objeto de cache
            const { obtenerPacientesUser } = cache.readQuery({ query: OBTENER_PACIENTES });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data: {
                    obtenerPacientesUser : obtenerPacientesUser.filter( pacienteActual => pacienteActual.id !== id )
                }
            })
        }
    }  );

    const { 
        expediente,
        pac_apellido_paterno,
        pac_apellido_materno,
        pac_nombre,
        pac_genero,
        pac_FN,
        pac_dispositivo_o2,
        pac_hemodialisis,
        diagnostico,
        pac_codigo_uveh,
        fecha_ingreso,
        fecha_prealta,
        fecha_egreso,
        hospitalizado,
        id 
    } = paciente;
    //console.log(paciente)


    // Elimina un paciente
    const confirmarEliminarPaciente = () => {
        Swal.fire({
            title: '¿Deseas eliminar a este paciente?',
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
                    // Eliminar por ID
                    const { data } = await eliminarPaciente({
                        variables: {
                            id
                        }
                    });
                    // console.log(data);

                    // Mostrar una alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarPaciente,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
          })
    }

    const editarPaciente = () => {
        Router.push({
            pathname: "/editarpaciente/[id]",
            query: { id }
        })
    }

    const asignarMicroorganismo = () => {
        Router.push({
            pathname: "/nuevomicroorganismo/[id]",
            query: { id }
        })
    }

    const verMicroorganismo = () => {
        Router.push({
            pathname: "/microorganismospaciente/[id]",
            query: { id }
        })
    }

    return ( 
            <tr>
                <td className="border px-4 py-2">{expediente}</td>
                <td className="border px-4 py-2">{pac_apellido_paterno}</td>
                <td className="border px-4 py-2">{pac_apellido_materno}</td>
                <td className="border px-4 py-2">{pac_nombre}</td>
                <td className="border px-4 py-2">{pac_genero}</td>
                <td className="border px-4 py-2">{pac_edad}</td>
                <td className="border px-4 py-2">{pac_dispositivo_o2}</td>
                <td className="border px-4 py-2">{pac_hemodialisis ? 'Sí' : 'No'}</td>
                <td className="border px-4 py-2">{diagnostico}</td>
                <td
                    className={`border px-4 py-2 ${
                      (() => {
                        switch (pac_codigo_uveh) {
                            case 'Acinetobacter':
                                return 'bg-pink-300';
                            case 'Colonizacion_Acinetobacter':
                                return 'bg-yellow-200';
                            case 'Contacto_Acinetobacter':
                                return 'bg-yellow-200';
                            case 'Hisopado_Rectal':
                                return 'yellow-200';
                            case 'Clostridium_Difficile':
                                return 'bg-emerald-300';
                            case 'Enterobacterias_XDR_MDR':
                                return 'bg-violet-300';
                            case 'Pseudomonas_XDR_MDR':
                                return 'bg-amber-400';
                            case 'SAMR':
                                return 'bg-rose-500';
                            case 'Tuberculosisis_o_Sospecha':
                                return 'bg-cyan-600';
                            case 'SAMS':
                                return 'bg-blue-500';

                            default:
                                return '';  // Sin color predeterminado
                        }
                      })()
                    }`}
                  >
                  {pac_codigo_uveh}
                </td>
                <td className="border px-4 py-2">{fechaIngreso !== null? fechaIngreso :''}</td>
                <td className="border px-4 py-2">{fecha_prealta? format(new Date(paciente.fecha_prealta), 'dd-MM-yy') : ''}</td>
                <td className="border px-4 py-2">{fecha_egreso? format(new Date(paciente.fecha_egreso), 'dd-MM-yy') : ''}</td>
                <td className="border px-4 py-2">{hospitalizado ? 'Sí' : 'No'}</td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => confirmarEliminarPaciente() }
                    >
                        Eliminar

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                </td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => editarPaciente() }
                    >
                        Editar

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        /* onClick={() => editarPaciente() } */
                    >
                        Asignar Cama

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => asignarMicroorganismo() }
                    >
                        Agregar Microorganismo

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => verMicroorganismo() }
                    >
                        Ver Microorganismo

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
            </tr>
     );
}
 
export default Paciente;