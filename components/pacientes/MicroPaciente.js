import React from 'react';
import { format, differenceInDays } from 'date-fns';

const MicroPaciente = ({obtenerPaciente}) => {

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

    <div className="flex w-full">
    <div className="w-1/4 mr-4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2"> {/* 40% del ancho */}
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
    </div>

    <div className="w-3/4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2"> {/* 60% del ancho */}
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
                                </tr>
                            ))
                        )
                    )}
                </tbody>
        </table>
    </div>
</div>


    
     )
}
 
export default MicroPaciente;