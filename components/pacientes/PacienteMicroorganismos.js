import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { EditIcon } from '../icons';

export default function PacienteMicroorganismos({ obtenerPaciente, onEdit }) {


    const [editMicro, setEditMicro] = useState(false);
    const [microorganismoSeleccionado, setMicroorganismoSeleccionado] = useState(null);

   
    const formatFecha = (fecha, formato) => {
        return format(new Date(fecha), formato);
    };

    const calcularDias = (fechaDeteccion) => {
        const hoy = new Date();
        const fechaDetec = new Date(fechaDeteccion);
        return differenceInDays(hoy, fechaDetec);
    };

   
    const handleEditClick = (microorganismo) => {
        setMicroorganismoSeleccionado(microorganismo);
        onEdit(microorganismo);
    };

    // useEffect para verificar el estado actualizado
    useEffect(() => {
        console.log(microorganismoSeleccionado);
    }, [microorganismoSeleccionado]);


    const cerrarEdicion = () => {
        setEditMicro(false);
    };


    return (
        <> 
    <h2 className="text-2xl text-gray-800 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">Microorganismos asociados al paciente</h2>
        <table className="table-auto shadow-md mt-1 w-full">
            <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="w-1/7 py-2">Cama</th>
                    <th className="w-1/7 py-2">Fecha de Detección</th>
                    <th className="w-1/7 py-2">Días desde Detección</th>
                    <th className="w-1/7 py-2">Método de Detección</th>
                    <th className="w-1/7 py-2">Tipo de Microorganismo</th>
                    <th className="w-1/7 py-2">Nombre del Microorganismo</th>
                    <th className="w-1/5 py-2">Susceptibilidad</th>
                    <th className="w-1/5 py-2">Comentario UVEH</th>
                    <th className="w-1/8 py-2">Editar</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {obtenerPaciente.admision_relacionada.flatMap(admision =>
                    admision.cama_relacionada.flatMap(cama =>
                        cama.microorganismo_relacionado.map((microorganismo, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{cama.cama.cama_numero}</td>
                                <td className="border px-4 py-2">{formatFecha(microorganismo.fecha_deteccion, 'dd-MM-yyyy')}</td>
                                <td className="border px-4 py-2">{calcularDias(microorganismo.fecha_deteccion)}</td>
                                <td className="border px-4 py-2">{microorganismo.metodo_deteccion}</td>
                                <td className="border px-4 py-2">{microorganismo.microorganismo_tipo}</td>
                                <td className="border px-4 py-2">{microorganismo.microorganismo_nombre}</td>
                                <td className="border px-4 py-2">{microorganismo.susceptibilidad}</td>
                                <td className="border px-4 py-2">{microorganismo.comentario_uveh}</td>
                                <td className="border px-1">
                                    <span className="flex justify-center items-center">
                                    <button 
                                        onClick={() => handleEditClick(microorganismo)}
                                        className="tooltip mr-2 flex justify-center items-center bg-blue-800 p-2 rounded text-xs"
                                        data-tooltip="Editar"
                                    >
                                        <EditIcon color='white' />
                                    </button>
                                    </span>
                                </td>
                            </tr>
                        ))
                    )
                )}
            </tbody>
            </table>
        </>
    );
}
