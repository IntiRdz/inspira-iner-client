import React, { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

import PacienteContext from '../context/pacientes/PacienteContext';
import { validationSchema } from '../components/forms/validationSchemas';
import { NUEVO_PACIENTE, OBTENER_CAMAS_URGENCIAS } from '../graphql';
import FormNuevoPaciente from '../components/forms/FormNuevoPaciente';

const NuevoPaciente = () => {
    const router = useRouter();
    const { cama } = useContext(PacienteContext);
    const [mensaje, guardarMensaje] = useState(null);

    const [nuevoPaciente] = useMutation(NUEVO_PACIENTE, {
        refetchQueries: [{ query: OBTENER_CAMAS_URGENCIAS }],
        onError: (error) => {
            console.error("Error al crear paciente:", error);
        }
    });

    const formik = useFormik({
        initialValues: {
            // tus valores iniciales
            fecha_prealta: '',
            fecha_egreso: '',
            // otros valores...
        },
        validationSchema,
        onSubmit: async valores => {
            try {
                const response = await nuevoPaciente({
                    variables: {
                        input: {
                            ...valores,
                            cama_relacionada: cama,
                            fecha_prealta: valores.fecha_prealta || undefined,
                            fecha_egreso: valores.fecha_egreso || undefined
                        }
                    }
                });

                Swal.fire(
                    'Creado',
                    'Se agregó correctamente al paciente',
                    'success'
                );

                router.push('/');
            } catch (error) {
                let mensajeError = "Error durante la creación del paciente.";
                // Manejo detallado del error...
                guardarMensaje(mensajeError);
                setTimeout(() => guardarMensaje(null), 10000);
            }
        }
    });

    const mostrarMensaje = () => (
        <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
            <p>{mensaje}</p>
        </div>
    );

    return (
        <Layout>
            <div className="flex justify-center mt-1">
                <div className="w-full max-w-5xl">
                    <FormNuevoPaciente formik={formik} />
                </div>
            </div>
            {mensaje && mostrarMensaje()}
        </Layout>
    );
};

export default NuevoPaciente
