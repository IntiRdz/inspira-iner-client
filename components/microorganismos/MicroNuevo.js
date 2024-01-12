import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { format } from 'date-fns';

import Swal from 'sweetalert2';

import PacienteContext from '../../context/pacientes/PacienteContext';

import { validationSchemaMicro } from '../../components/forms/validationSchemas';


import { OBTENER_PACIENTE } from '../../graphql/queries'; 
import { NUEVO_MICROORGANISMO } from '../../graphql/mutations'; 

import FormMicroNew from '../forms/FormMicroNew';


export default function MicroNuevo ({obtenerPaciente}) {
    // routing
    const router = useRouter();


    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);

    const id = obtenerPaciente.id;
    
    
    const {microorganismo} = useContext(PacienteContext);
    
    console.log('Microorganismo del PacienteContext:', microorganismo);


    // Mutation para asignar el microrganismo al paciente al paciente
     const [nuevoMicroorganismo] = useMutation(NUEVO_MICROORGANISMO, {
        refetchQueries: [
            {
                query: OBTENER_PACIENTE,
                variables: { id: id }
            }
        ],
    });

    


    const ultimaCamaRelacionadaId = obtenerPaciente.admision_relacionada[0].cama_relacionada.slice(-1)[0].id;
    console.log("ultimaCamaRelacionadaId", ultimaCamaRelacionadaId);
            
    // Formulario para nuevos microorganismos
    const formik = useFormik({
        initialValues: {
            fecha_deteccion: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss'),
            metodo_deteccion: '',
            microorganismo_tipo: '',
            susceptibilidad: '',
            comentario_uveh: '',

        },


        validationSchemaMicro,


        onSubmit: async valores => {

            
            const { 
                fecha_deteccion,
                metodo_deteccion,
                microorganismo_tipo,
                microorganismo_nombre,
                susceptibilidad,
                comentario_uveh,
                camahistorial,
            } = valores;
            
            //console.log("Valores Inciales:", valores)

            const valoresActualizados = {
                fecha_deteccion,
                metodo_deteccion,
                microorganismo_tipo,
                microorganismo_nombre: microorganismo,
                susceptibilidad,
                comentario_uveh,
                camahistorial: ultimaCamaRelacionadaId
            };

            //console.log("Valores actualizados:", valoresActualizados)

            try {
                const { data } = await nuevoMicroorganismo({
                    variables: {
                        input: valoresActualizados
                    }
                });

            
                console.log("Después de la llamada a actualizarPaciente");
                // Mostrar una alerta
                Swal.fire(
                    'Creado',
                    'Se creó el microorganismo correctamente',
                    'success'
                )

                // Redireccionar hacia los microorganismos
                router.push(`/editarpaciente/${id}`);



            } catch (error) {
                console.error("Error completo:", error);
            
                let mensajeError = "Error desconocido durante la actualización del paciente.";
            
                // Verificar si es un error de Apollo y tratar de obtener detalles más específicos
                if (error.networkError && error.networkError.result) {
                    let errores = error.networkError.result.errors;
                    if (errores && errores.length > 0) {
                        // Asumiendo que el servidor devuelve mensajes de error útiles
                        mensajeError = errores.map(err => err.message).join(", ");
                    }
                } else if (error.networkError) {
                    mensajeError = `Error de red: ${error.networkError.message}`;
                } else if (error.graphQLErrors) {
                    mensajeError = `Error en GraphQL: ${error.graphQLErrors.map(err => err.message).join(", ")}`;
                } else {
                    mensajeError = `Error: ${error.message}`;
                }
            
                guardarMensaje(mensajeError);
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    guardarMensaje(null);
                }, 10000);
            }
        }
    })

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }


    return ( 
        <>  

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <FormMicroNew 
                        formik={formik}
                        obtenerPaciente={obtenerPaciente}
                    />
                </div>
            </div>
            {mensaje && mostrarMensaje()}
        </>
     );
}