import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { useQuery } from '@apollo/client';

import { OBTENER_ULTIMA_ADMISION_PACIENTE } from '../../graphql/queries'; 
import FormDiagnosticEdit from '../forms/FormDiagnosticEdit';


export default function DiagnosticosPaciente ({obtenerPaciente}) {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diagnosticoActual, setDiagnosticoActual] = useState(null);  // Estado añadido


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


    const handleEditClick = (diagnostico) => {
        setDiagnosticoActual(diagnostico);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        setDiagnosticoActual({ ...diagnosticoActual, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDiagnosticoActual(null);
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
                     {ultimaAdmision && ultimaAdmision.diagnostico.map((diag, index) => (
                        <tr key={diag.id || index}>
                            <td className="border px-4 py-2">{diag.diagnostico_nombre}</td>
                            <td className="border px-4 py-2">{formatFecha(diag.fecha_diagnostico, 'dd-MM-yyyy')}</td>
                            <td className="border px-4 py-2">{diag.fecha_resolucion? formatFecha(diag.fecha_resolucion, 'dd-MM-yyyy'): ''}</td>
                            <td className="border px-4 py-2">{diag.diagnostico_tipo}</td>
                            <td className="border px-4 py-2">{diag.diagnostico_activo ? 'Sí' : 'No'}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEditClick(diag.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar diagnóstico */}

            {isModalOpen && diagnosticoActual && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-0 mx-auto p-5 border w-full h-full shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Diagnóstico</h3>
                            <FormDiagnosticEdit
                                diagnostico={diagnosticoActual}
                                onInputChange={handleInputChange}
                                onSubmit={handleFormSubmit}
                            />
                            <div className="items-center px-4 py-3">
                                <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    
     )
}