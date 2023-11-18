import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { format, differenceInYears, differenceInDays, isTomorrow } from 'date-fns';
import { BacteriumIcon, EyeIcon, EditIcon } from './icons';  // Asumiendo que EyeIcon y EditIcon están en el mismo directorio
import { OBTENER_PACIENTES } from './graphql/queries'; 
import { ELIMINAR_PACIENTE } from './graphql/mutations';

const PacienteHosp = ({ paciente, contador }) => {
    
    // Funciones de cálculo
    const calcularEdad = (fechaNacimiento) => differenceInYears(new Date(), new Date(fechaNacimiento));
    const calcularDias = (fechaIngreso) => differenceInDays(new Date(), new Date(fechaIngreso));
    
    // Verificación de fechas y diagnósticos
    const esManana = isTomorrow(new Date(paciente.fecha_prealta));
    let fechaPreAltaClasses = esManana ? "border px-1 py-1 bg-blue-500" : "border px-1 py-1";
    
    // Función para obtener la clase CSS basada en ciertas condiciones
    const obtenerClaseCodigo = (valor, codigosYColores) => {
        let claseBase = "px-1 py-1";

        for (const [codigos, color] of codigosYColores) {
            if (codigos.some(keyword => valor.includes(keyword))) {
                return claseBase + ` bg-${color}`;
            }
        }

        return claseBase; // Devuelve la clase base si no se cumple ninguna condición
    }

    // Uso para diagnostico1
    const diagnostico1CodigosYColores = [
        [["CodigoInfarto", "CodigoViaAerea", "CodigoHemoptisis"], "amber-400"],
        [["COVID", "Influenza", "Parainfluenza", "Adenovirus", "VirusSincialRespiratorio"], "yellow-400"],
        [["TuberculosisSensible", "TuberculosisResistente", "B24"], "blue-400"]
    ];
    const diagnostico1Classes = obtenerClaseCodigo(paciente.diagnostico1, diagnostico1CodigosYColores);

    // Uso para pac_codigo_uveh
    const codigoUvehCodigosYColores = [
        [["Acinetobacter"], "pink-300"],
        [["ColonizacionAcinetobacter", "ContactoAcinetobacter", "HisopadoRectal"], "yellow-200"],
        [["ClostridiumDifficile"], "emerald-300"],
        [["Enterobacterias_XDR_MDR"], "emerald-300"],
        [["Pseudomonas_XDR_MDR"], "emerald-300"],
        [["TuberculosisisOSospecha"], "emerald-300"],
        [["SAMR"], "emerald-300"],
        [["SAMS"], "emerald-300"],
    ];
    const codigoUvehClasses = obtenerClaseCodigo(paciente.pac_codigo_uveh, codigoUvehCodigosYColores);

    // Mutación para eliminar paciente
    const [eliminarPaciente] = useMutation(ELIMINAR_PACIENTE, {
        update(cache) {
            const { obtenerPacientes } = cache.readQuery({ query: OBTENER_PACIENTES });
            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data: {
                    obtenerPacientes: obtenerPacientes.filter(pacienteActual => pacienteActual.id !== paciente.id)
                }
            });
        }
    });

    // Navegación
    const navegar = (ruta) => Router.push({ pathname: ruta });

    return ( 
        <tr>
            <td className="border px-2 py-2">{contador}</td>
            <td className="border px-1 py-1">{expediente}</td>
            <td className="border px-1 py-1">
                {Array.isArray(paciente.cama_relacionada) && paciente.cama_relacionada.length > 0 ? (
                    <div>{paciente.cama_relacionada[paciente.cama_relacionada.length - 1].cama_numero}</div>
                ) : (
                    <div>No hay cama relacionada</div>
                )}
            </td>
            <td className="border px-1 py-1">{pac_apellido_paterno}</td>
            <td className="border px-1 py-1">{pac_apellido_materno}</td>
            <td className="border px-1 py-1">{pac_nombre}</td>
            <td className="border px-1 py-1">{calcularEdad(paciente.pac_FN)}</td>
            <td className="border border-l-4 border-l-sky-700 px-1 py-1">{pac_genero}</td>
            <td className="border px-1 py-1">{pac_dispositivo_o2}</td>
            <td className="border px-1 py-1">{pac_hemodialisis ? 'Sí' : 'No'}</td>
            <td className="border px-1 py-1">{caracteristicas_especiales}</td>
            <td className={codigoUvehClasses}>
                {Array.isArray(paciente.pac_codigo_uveh) ? (
                    paciente.pac_codigo_uveh.map((codigo_uveh, index) => (
                        <div key={index}>{codigo_uveh}</div>
                    ))
                ) : (
                    paciente.pac_codigo_uveh
                )}
            </td>
            <td className="border px-1 py-1">
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
            <td className={diagnostico1Classes}>
                {Array.isArray(paciente.diagnostico1) ? (
                    paciente.diagnostico1.map((diagnostico, index) => (
                        <div key={index}>{diagnostico}</div>
                    ))
                ) : (
                    paciente.diagnostico1 // Si no es un array, muestra el valor tal cual
                )}
            </td>
            <td className="border px-1 py-1">{diagnostico}</td>
            <td className="border border-l-4 border-l-sky-700 px-1 py-1">{fecha_ingreso? format(new Date(paciente.fecha_ingreso), 'dd-MM-yy') : ''}</td>
            <td className="border px-1 py-1">{calcularDias(paciente.fecha_ingreso)}</td>
            <td className={fechaPreAltaClasses}>{fecha_prealta? format(new Date(paciente.fecha_prealta), 'dd-MM-yy') : ''}</td>
            <td className="border px-1 py-1">
                <button 
                    onClick={() => navegar(`/editarpaciente/${paciente.id}`)}
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                >
                    <EditIcon />
                    <span className="ml-2">Editar</span>
                </button>
            </td>

            {/* Botón para asignar microorganismos */}
            <td className="border px-1 py-1">
                <button 
                    onClick={() => navegar(`/nuevomicroorganismo/${paciente.id}`)}
                    className="flex justify-center items-center bg-blue-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                >
                    <BacteriumIcon />
                    <span className="ml-2">Asignar Micro</span>
                </button>
            </td>

            {/* Botón para ver microorganismos */}
            <td className="border px-1 py-1">
                <button 
                    onClick={() => navegar(`/microorganismospaciente/${paciente.id}`)}
                    className="flex justify-center items-center bg-purple-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                >
                    <EyeIcon />
                    <span className="ml-2">Ver Micro</span>
                </button>
            </td>
        </tr>

    );
}
 
export default PacienteHosp;
