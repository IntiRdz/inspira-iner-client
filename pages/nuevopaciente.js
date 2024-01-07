import React, { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { useMutation, useSubscription, useQuery  } from '@apollo/client';
import { useFormik } from 'formik'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'
import { format } from 'date-fns';


import PacienteContext from '../context/pacientes/PacienteContext';

import { validationSchema } from '../components/forms/validationSchemas';

import { NUEVO_PACIENTE } from '../graphql/mutations';

import { SUSCRIPCION_NUEVO_PACIENTE } from '../graphql/subscriptions';
import { OBTENER_CAMAS_URGENCIAS } from '../graphql/queries';
 import { SUSCRIPCION_ACTUALIZAR_CAMA } from '../graphql/subscriptions';  
import FormNuevoPaciente from '../components/forms/FormNuevoPaciente';

const NuevoPaciente = () => {
    
    // routing
    const router = useRouter();

    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);
    const { cama } = useContext(PacienteContext);



    const [nuevoPaciente] = useMutation(NUEVO_PACIENTE, {
        refetchQueries: [{
            query: OBTENER_CAMAS_URGENCIAS // Esta es la consulta que quieres refrescar
        }],
        onCompleted: () => {
            // Opcional: código que se ejecuta después de completar la mutación
            router.push('/');
            Swal.fire(
                'Creado',
                'Se agregó correctamente al paciente',
                'success'
            )
        },
        onError: (error) => {
            // Opcional: Manejar errores aquí
            console.error("Error al crear paciente:", error);
        }
    });

     const { data, loading, error } = useSubscription(SUSCRIPCION_NUEVO_PACIENTE);
    if (data) {
        console.log('Nuevo paciente recibido:', data);
      }

/*     const { data: dataSubscription, loading: loadingSubscription, error: errorSubscription } = useSubscription(SUSCRIPCION_ACTUALIZAR_CAMA);
    if (dataSubscription) {
    console.log('Cama actualizada recibido:', dataSubscription);
    }  */

    const formik = useFormik({
        initialValues: {
            servicio_tratante: 'Neumologia',
            expediente: '',
            pac_apellido_paterno: '',
            pac_apellido_materno: '',
            pac_nombre: '',
            pac_genero: '',
            pac_FN: '',
            pac_dispositivo_o2: '',
            pac_hemodialisis: false,
            diagnostico1: [],
            diagnostico: '',
            caracteristicas_especiales: [],
            pac_codigo_uveh: ['Sin_Definir'],
            fecha_ingreso: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss'),
            fecha_prealta: '',
            fecha_egreso: '',
            hospitalizado: true,
        },

        validationSchema,

        onSubmit: async valores => {
            console.log("Formulario enviado con los siguientes valores:", valores);
            const { 
                servicio_tratante,
                expediente,
                pac_apellido_paterno,
                pac_apellido_materno,
                pac_nombre,
                pac_genero,
                pac_FN,
                pac_dispositivo_o2,
                pac_hemodialisis,
                diagnostico1,
                diagnostico,
                caracteristicas_especiales,
                pac_codigo_uveh,
                fecha_ingreso,
                fecha_prealta,
                fecha_egreso,
                hospitalizado,
            } = valores;

            console.log("valores inciales del nuevo objeto", valores)

            // Verificar si las fechas son nulas o vacías
            const fechaPrealta = fecha_prealta || undefined; // Establece un valor predeterminado si es nulo o vacío
            const fechaEgreso = fecha_egreso || undefined; // Establece un valor predeterminado si es nulo o vacío

            const valoresActualizados = {
                servicio_tratante,
                expediente,
                pac_apellido_paterno,
                pac_apellido_materno,
                pac_nombre,
                pac_genero,
                pac_FN,
                pac_dispositivo_o2,
                pac_hemodialisis,
                diagnostico,
                diagnostico1,
                caracteristicas_especiales,
                pac_codigo_uveh,
                fecha_ingreso,
                fecha_prealta: fechaPrealta,
                fecha_egreso: fechaEgreso,
                hospitalizado,
                cama_relacionada: cama,
            };

            console.log("Valores actualizados:", valoresActualizados)


        
            try {
                console.log("antes de la llamada a crear Paciente");
                const { data } = await nuevoPaciente({
                    variables: {
                        input: valoresActualizados
                    },
                });
                
                
                console.log("Después de la llamada a crear Paciente");

                //console.log(data);

                //Mostrar alerta
                Swal.fire(
                    'Creado',
                    'Se agregó correctamente al paciente',
                    'success'
                )

                //Redireccionar
                router.push('/');

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
        <Layout>              
            <div className="flex justify-center mt-1">
                <div className="w-full max-w-5xl">
                    
                <FormNuevoPaciente 
                    formik={formik}
                />
                </div>
            </div>
            {mensaje && mostrarMensaje()}
        </Layout>
    );
}
 
export default NuevoPaciente;