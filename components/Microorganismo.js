import React from 'react';
import { gql } from '@apollo/client';
import { format } from 'date-fns';


const OBTENER_MICROORGANISMOS_PACIENTE = gql`
    query obtenerMicroorganismosPatient ($id: ID!) {
        obtenerMicroorganismosPatient (id:ID){
            fecha_deteccion
            metodo_deteccion
            microorganismo_tipo
            microorganismo_nombre
            susceptibilidad
            comentario_uveh
            paciente_relacionado
            cama_relacionada
        }
    }
`;


const Microorganismo = ({microorganismo}) => {
    
    // Función para formatear una fecha en el formato deseado
    const formatFecha = (fecha, formato) => {
        return format(new Date(fecha), formato);
    };
    
    // Uso de la función para formatear la fecha de ingreso
    const fecha_deteccion = formatFecha(microorganismo.fecha_deteccion, 'dd-MM-yy');



    return ( 
            <tr>
                <td className="border px-4 py-2">{fecha_deteccion}</td>
                <td className="border px-4 py-2">{microorganismo.metodo_deteccion}</td>
                <td className="border px-4 py-2">{microorganismo.microorganismo_tipo}</td>
                <td className="border px-4 py-2">{microorganismo.microorganismo_nombre}</td>
                <td className="border px-4 py-2">{microorganismo.susceptibilidad}</td>
                <td className="border px-4 py-2">{microorganismo.comentario_uveh}</td>
                <td className="border px-4 py-2">{microorganismo.paciente_relacionado}</td>
                <td className="border px-4 py-2">{microorganismo.cama_relacionada}</td>
            </tr>
     );
}
 
export default Microorganismo;