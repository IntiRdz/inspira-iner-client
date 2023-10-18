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
        _id
        expediente
        cama_relacionada
        microorganimo_relacionado
        pac_apellido_paterno
        pac_apellido_materno
        pac_nombre
        pac_genero
        pac_FN
        pac_dispositivo_o2
        pac_hemodialisis
        diagnostico1
        diagnostico
        pac_codigo_uveh
        fecha_ingreso
        fecha_prealta
        fecha_egreso
        hospitalizado
        microorganismo_relacionado
    }
  }
`;


let contador = 0

const Paciente = ({paciente}) => {
    console.log("Paciente del componente Paciente",paciente)
    
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

    // Verificar si diagnostico1 contiene palabras clave para código rojo, amarillo o azul
    const isCodigoRojo = ["CodigoInfarto", "CodigoViaAerea", "CodigoHemoptisis"].some((keyword) =>
    paciente.diagnostico1.includes(keyword)
    );

    const isCodigoAmarillo = ["COVID", "Influenza", "Parainfluenza", "Adenovirus", "VirusSincialRespiratorio"].some((keyword) =>
    paciente.diagnostico1.includes(keyword)
    );

    const isCodigoAzul = ["TuberculosisSensible", "TuberculosisResistente", "B24"].some((keyword) =>
    paciente.diagnostico1.includes(keyword)
    );

    // Clases CSS condicionales para cambiar el fondo de la columna
    let diagnostico1Classes = "border px-4 py-2";

    switch (true) {
    case isCodigoRojo:
        diagnostico1Classes += " bg-red-400";
        break;
    case isCodigoAmarillo:
        diagnostico1Classes += " bg-yellow-400";
        break;
    case isCodigoAzul:
        diagnostico1Classes += " bg-blue-400";
        break;
    default:
        // Puedes manejar un caso predeterminado aquí si es necesario
        break;
    }


    // mutation para eliminar paciente
    const [ eliminarPaciente ] = useMutation( ELIMINAR_PACIENTE, {
        update(cache) {
            // obtener una copia del objeto de cache
            const { obtenerPacientes } = cache.readQuery({ query: OBTENER_PACIENTES });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data: {
                    obtenerPacientes : obtenerPacientes.filter( pacienteActual => pacienteActual.id !== id )
                }
            })
        }
    }  );

    console.log("el ID del paciente es",paciente._id)
    const { 
        expediente,
        cama_numero,
        pac_apellido_paterno,
        pac_apellido_materno,
        pac_nombre,
        pac_genero,
        pac_FN,
        pac_dispositivo_o2,
        pac_hemodialisis,
        diagnostico1,
        diagnostico,
        pac_codigo_uveh,
        fecha_ingreso,
        fecha_prealta,
        fecha_egreso,
        hospitalizado,
        id,
    } = paciente;

    const editarPaciente = () => {
        console.log("el ID del paciente es en el botón",paciente._id)
        Router.push({
            pathname: `/editarpaciente/${paciente._id}`,
            
        })
    }

     const asignarMicroorganismo = () => {
        Router.push({
            pathname: `/nuevomicroorganismo/${paciente._id}`,
        })
    } 

    const verMicroorganismo = () => {
        Router.push({
            pathname: `/microorganismospaciente/${paciente._id}`,
        })
    }

    console.log("paciente recibido",paciente)

    return ( 
            <tr className="h-8">
                <td className="border px-2 py-2">{contador++}</td> 
                <td className="border px-2 py-2">{expediente}</td>
                {/* <td className="border px-2 py-2">{cama_numero}</td> */}
                <td className="border px-2 py-2">
                    {Array.isArray(paciente.cama_relacionada) ? (
                        paciente.cama_relacionada.map((cama, index) => (
                        <div key={index}>{cama}</div>
                        ))
                    ) : (
                        paciente.cama_relacionada // Si no es un arreglo, muestra el valor tal cual
                    )}
                </td>
                <td className="border px-2 py-2">
                    {Array.isArray(paciente.microorganimo_relacionado) ? (
                        paciente.microorganimo_relacionado.map((microorganismo, index) => (
                        <div key={index}>{microorganismo}</div>
                        ))
                    ) : (
                        paciente.microorganimo_relacionado // Si no es un arreglo, muestra el valor tal cual
                    )}
                </td>
                <td className="border px-2 py-2">{pac_apellido_paterno}</td>
                <td className="border px-2 py-2">{pac_apellido_materno}</td>
                <td className="border px-2 py-2">{pac_nombre}</td>
                <td className="border px-2 py-2">{pac_genero}</td>
                <td className="border px-2 py-2">{pac_edad}</td>
                <td className="border px-2 py-2">{pac_dispositivo_o2}</td>
                <td className="border px-2 py-2">{pac_hemodialisis ? 'Sí' : 'No'}</td>
                <td className={diagnostico1Classes}>
                {Array.isArray(paciente.diagnostico1) ? (
                    paciente.diagnostico1.map((diagnostico, index) => (
                        <div key={index}>{diagnostico}</div>
                    ))
                ) : (
                    paciente.diagnostico1 // Si no es un array, muestra el valor tal cual
                )}
            </td>
                <td className="border px-2 py-2">{diagnostico}</td>
                <td
                    className={`border px-2 py-2${
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
                <td className="border px-2 py-2">{fechaIngreso !== null? fechaIngreso :''}</td>
                <td className="border px-2 py-2">{fecha_prealta? format(new Date(paciente.fecha_prealta), 'dd-MM-yy') : ''}</td>
                <td className="border px-2 py-2">{fecha_egreso? format(new Date(paciente.fecha_egreso), 'dd-MM-yy') : ''}</td>
                <td className="border px-2 py-2">{hospitalizado ? 'Sí' : 'No'}</td>
                <td className="border px-2 py-2">
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
                        onClick={() => asignarMicroorganismo() }
                    >
                        Asignar Microorganismo

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>           

                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => verMicroorganismo() }
                    >
                        Microorganismos

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
            </tr>
     );
}
 
export default Paciente;