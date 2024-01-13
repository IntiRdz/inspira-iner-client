import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { EditIcon } from '../icons';
import { useQuery } from '@apollo/client';

import { OBTENER_ULTIMA_ADMISION_PACIENTE } from '../../graphql/queries'; 


export default function DiagnosticosPaciente ({obtenerPaciente, onEdit}) {

    const [editDx, setEditDx] = useState(false);
    const [diagnosticoSeleccionado, setDiagnosticoSeleccionado] = useState(null);

    // useEffect para verificar el estado actualizado
    useEffect(() => {
        console.log(diagnosticoSeleccionado);
    }, [diagnosticoSeleccionado]);
    
    
    const id = obtenerPaciente.id;
    //console.log("id", id)

    const { data, loading, error } = useQuery(OBTENER_ULTIMA_ADMISION_PACIENTE,{
        variables: { id }
    });


    if (loading) return 'Cargando...';
    if (error) return `Error! ${error.message}`;

    // Asumiendo que 'data' contiene la respuesta del resolver
    const ultimaAdmision = data?.obtenerUltimaAdmisionPaciente;
    //console.log("ultimaAdmision", ultimaAdmision)

    // Función para formatear una fecha en el formato deseado
    const formatFecha = (fecha, formato) => {
        return format(new Date(fecha), formato);
    };

    const calcularDias = (fechaDeteccion) => {
        const hoy = new Date();
        const fechaDetec = new Date(fechaDeteccion);
        return differenceInDays(hoy, fechaDetec);
    };

    const handleEditClick = (diagnostico) => {
        setDiagnosticoSeleccionado(diagnostico);
        onEdit(diagnostico);
    };


    const cerrarEdicion = () => {
        setEditDx(false);
    };

    
  return ( 

        <div className="w-full backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">
            <h2 className="text-2xl text-gray-800 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">Diagnósticos de la Última Admisión
            </h2>
            <table className="table-auto shadow-md mt-1 w-full">
                <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="py-2">Nombre del Diagnóstico</th>
                        <th className="py-2">Fecha de Diagnóstico</th>
                        <th className="py-2">Fecha de Resolución</th>
                        <th className="py-2">Tipo</th>
                        <th className="py-2">Activo</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                     {ultimaAdmision && ultimaAdmision.diagnostico.map((diagnostico, index) => (
                        <tr key={diagnostico.id || index}>
                            <td className="border px-4 py-2">{diagnostico.diagnostico_nombre}</td>
                            <td className="border px-4 py-2">{formatFecha(diagnostico.fecha_diagnostico, 'dd-MM-yyyy')}</td>
                            <td className="border px-4 py-2">{diagnostico.fecha_resolucion? formatFecha(diagnostico.fecha_resolucion, 'dd-MM-yyyy'): ''}</td>
                            <td className="border px-4 py-2">{diagnostico.diagnostico_tipo}</td>
                            <td className="border px-4 py-2">{diagnostico.diagnostico_activo ? 'Sí' : 'No'}</td>
                            <td className="border px-1">
                                    <span className="flex justify-center items-center">
                                    <button 
                                        onClick={() => handleEditClick(diagnostico)}
                                        className="tooltip mr-2 flex justify-center items-center bg-blue-800 p-2 rounded text-xs"
                                        data-tooltip="Editar"
                                    >
                                        <EditIcon color='white' />
                                    </button>
                                    </span>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     )
}