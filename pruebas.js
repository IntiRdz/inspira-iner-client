import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { format, differenceInYears } from 'date-fns';

//Esta busqueda es para modifcar al encotrado en el botón 
//Utilizo el resolver de eliminar que modifiqué por dentro 
const ELIMINAR_PACIENTE = gql`
    mutation eliminarPaciente($id: ID!) {
        eliminarPaciente(id:$id) 
    }
`;

//Esta busqueda es para modifcar al encotrado en el botón 
const OBTENER_PACIENTES = gql`
    query ObtenerPacientes {
        obtenerPacientes {
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
            diagnostico1
            pac_codigo_uveh
            fecha_ingreso
            fecha_prealta
            fecha_egreso
            hospitalizado
            creado
            user
            cama_relacionada {
                id
                cama_numero
            }
            microorganismo_relacionado {
                id
                microorganismo_nombre
            }
            antibiotico_relacionado{
                id
                antibiotico_nombre
            }
        }
    }
`;


//Esta busqueda es para modifcar al encotrado en el botón 

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
        diagnostico1Classes += " bg-amber-400";
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

    let codigoUvehClasses = "px-2 py-2";
    switch (paciente.pac_codigo_uveh) {
        case 'Acinetobacter':
        codigoUvehClasses += ' bg-pink-300';
        break;
        case 'ColonizacionAcinetobacter':
        codigoUvehClasses += ' bg-yellow-200';
        break;
        case 'ContactoAcinetobacter':
        codigoUvehClasses += ' bg-yellow-200';
        break;
        case 'HisopadoRectal':
        codigoUvehClasses += ' yellow-200';
        break;
        case 'ClostridiumDifficile':
        codigoUvehClasses += ' bg-emerald-300';
        break;
        case 'Enterobacterias_XDR_MDR':
        codigoUvehClasses += ' bg-violet-300';
        break;
        case 'Pseudomonas_XDR_MDR':
        codigoUvehClasses += ' bg-amber-400';
        break;
        case 'SAMR':
        codigoUvehClasses += ' bg-rose-500';
        break;
        case 'TuberculosisisOSospecha':
        codigoUvehClasses += ' bg-cyan-600';
        break;
        case 'SAMS':
        codigoUvehClasses += ' bg-blue-500';
        break;
        default:
        // Sin color predeterminado
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
                    obtenerPacientes : obtenerPacientes.filter( pacienteActual => pacienteActual.id !== paciente.id )
                }
            })
        }
    }  );

    console.log("el ID del paciente es",paciente.id)
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
        //console.log("el ID del paciente es en el botón",paciente.id)
        Router.push({
            pathname: `/editarpaciente/${paciente.id}`,       
        })
    }
    const asignarMicroorganismo = () => {
        Router.push({
            pathname: `/nuevomicroorganismo/${paciente.id}`,
        })
    } 
    const verMicroorganismo = () => {
        Router.push({
            pathname: `/microorganismospaciente/${paciente.id}`,
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
                        <div key={index}>{cama.cama_numero}</div>
                        ))
                    ) : (
                        paciente.cama_relacionada.map((cama, index) => (
                        <div key={index}>{cama.cama_numero}</div>
                        ))
                    )}
                </td>
                <td className="border px-2 py-2">
                    {Array.isArray(paciente.microorganismo_relacionado) ? (
                        paciente.microorganismo_relacionado.map((microorganismo, index) => (
                        <div key={index}>{microorganismo.microorganismo_nombre}</div>
                        ))
                    ) : (
                        paciente.microorganismo_relacionado.map((microorganismo, index) => (
                        <div key={index}>{microorganismo.microorganismo_nombre}</div>
                        ))
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
                <td className="border px-2 py-2">
                <td className="border px-2 py-2">
                    {Array.isArray(paciente.pac_codigo_uveh) ? (
                        paciente.pac_codigo_uveh.map((codigo_uveh, index) => (
                            <div key={index}>{codigo_uveh}</div>
                        ))
                    ) : (
                        paciente.pac_codigo_uveh
                    )}
                </td>
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
                        + Microorganismo
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