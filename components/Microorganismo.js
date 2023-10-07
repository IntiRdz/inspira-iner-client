import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
//import Router from 'next/router';
import { format, differenceInYears } from 'date-fns';


/* const OBTENER_PACIENTES = gql`
    query obtenerPacientesUser {
        obtenerPacientesUser {
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

`; */


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
    const fechaNac = formatFecha(paciente.pac_FN, 'dd-MM-yy');
    const fechaIngreso = formatFecha(paciente.fecha_ingreso, 'dd-MM-yy');

    //console.log('Fecha de nacimiento con formato:', fechaIngreso);


    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        return differenceInYears(hoy, fechaNac);
    };  

    const pac_edad = calcularEdad(paciente.pac_FN);




/*     const editarPaciente = () => {
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
    } */

    return ( 
            <tr>
                <td className="border px-4 py-2">{fecha_deteccion}</td>
                <td className="border px-4 py-2">{metodo_deteccion}</td>
                <td className="border px-4 py-2">{microorganismo_tipo}</td>
                <td className="border px-4 py-2">{microorganismo_nombre}</td>
                <td className="border px-4 py-2">{susceptibilidad}</td>
                <td className="border px-4 py-2">{comentario_uveh}</td>
                <td className="border px-4 py-2">{paciente_relacionado}</td>
                <td className="border px-4 py-2">{cama_relacionada}</td>
                <td className="border px-4 py-2">
                </td>
                <td className="border px-4 py-2">
                </td>
            </tr>
     );
}
 
export default Microorganismo;