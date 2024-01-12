import React, { useState, useContext } from 'react';
import { format, differenceInDays } from 'date-fns';
import { EditIcon, Female, Kidneys, Male } from '../icons';


export default function PacienteTraslados ({obtenerPaciente}) {

    const [editMicro, setEditMicro] = useState(false);

    // Función para formatear una fecha en el formato deseado
    const formatFecha = (fecha, formato) => {
        return format(new Date(fecha), formato);
    };

    const calcularDias = (fechaDeteccion) => {
        const hoy = new Date();
        const fechaDetec = new Date(fechaDeteccion);
        return differenceInDays(hoy, fechaDetec);
    };  

  return ( 

    <>
    
        <h2 className="text-2xl text-gray-800 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">Historial de Transferencias</h2>
        <table className="table-auto shadow-md mt-1 mb-4 w-full">
        <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="w-1/4 py-2">Número de Cama</th>
                    <th className="w-3/4 py-2">Fecha de Traslado</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {obtenerPaciente.admision_relacionada.flatMap(admision =>
                    admision.cama_relacionada.map((cama, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{cama.cama.cama_numero}</td>
                            <td className="border px-4 py-2">{cama.fecha_traslado}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </>
    
     )
}