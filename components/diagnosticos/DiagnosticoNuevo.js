import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { format } from 'date-fns';

import Swal from 'sweetalert2';

import { OBTENER_PACIENTE, OBTENER_ULTIMA_ADMISION_PACIENTE } from '../../graphql/queries'; 
import { NUEVO_DIAGNOSTICO } from '../../graphql/mutations'; 

import { validationSchemaDx } from '../../components/forms/validationSchemas';
import FormDiagnosticNew from '../forms/FormDiagnosticNew';

import ModalGeneral from '../modals/ModalGeneral';

export default function DiagnosticoNuevo  ({obtenerPaciente, isOpen, onClose }) {
    // routing
    const router = useRouter();

    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);

    const id = obtenerPaciente.id;
   
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    // Sincroniza el estado local del modal con el prop 'isOpen'
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const closeModal = () => {
        onClose(); // Cierra el modal utilizando la función del padre
    };

    
    // Mutation para asignar el microrganismo al paciente al paciente
     const [nuevoDiagnostico] = useMutation(NUEVO_DIAGNOSTICO, {
        refetchQueries: [
            { query: OBTENER_PACIENTE, variables: { id: id } },
            { query: OBTENER_ULTIMA_ADMISION_PACIENTE, variables: { id: id } }
        ],
    });

    const admision_relacionadaId = obtenerPaciente.admision_relacionada[0].id;
    //console.log("Ultima Admision Relacionada", admision_relacionadaId);
            
    // Formulario para nuevos microorganismos
    const formik = useFormik({
        initialValues: {
            fecha_diagnostico: format(new Date(), 'yyyy-MM-dd'),
            fecha_resolucion: '',
            diagnostico_tipo: 'Ingreso',
            diagnostico_activo: true,
            admision_relacionada: admision_relacionadaId,

        },

        validationSchema: validationSchemaDx,

        onSubmit: async valores => {
            // Manejar el valor opcional de fecha_resolucion
            const fechaResolucion = valores.fecha_resolucion ? format(new Date(valores.fecha_resolucion), 'yyyy-MM-dd') : undefined;

            const input = {
                ...valores,
                fecha_resolucion: fechaResolucion
            };

            Swal.fire({
                title: 'Agregando Diagnóstico...',
                text: 'Por favor, espera.',
                allowOutsideClick: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            });

            try {
                const { data } = await nuevoDiagnostico({
                    variables: { input }
                });

            // Verificar que la respuesta contiene el ID del diagnóstico
            if (data && data.nuevoDiagnostico && data.nuevoDiagnostico.id) {

                // Cierra la alerta de carga
                Swal.close();

                // Muestra la alerta de éxito
                Swal.fire(
                    'Creado',
                    'Se agregó correctamente el diagnóstico',
                    'success'
                );

                // Resto de tu código...
                onClose();
            } else {
                // Manejar el caso en que no se recibe el ID
                throw new Error("No se recibió el ID del diagnóstico");
            }



            } catch (error) {
                Swal.close();
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
            <ModalGeneral isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-2xl">
                        <FormDiagnosticNew 
                            formik={formik}
                            obtenerPaciente={obtenerPaciente}
                        />
                    </div>
                </div>
            </ModalGeneral>
            {mensaje && mostrarMensaje()}
        </>
     );
}