import React, { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { gql, useMutation, useQuery  } from '@apollo/client';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'

import PacienteContext from '../context/pacientes/PacienteContext';
import { AsignarCama } from '../components/pacientes/AsignarCama';

const NUEVO_PACIENTE = gql`
    mutation nuevoPaciente($input: PacienteInput) {
        nuevoPaciente(input: $input) {
            id
            expediente
            pac_apellido_paterno
            pac_apellido_materno
            pac_nombre
            pac_genero
            pac_FN
            pac_dispositivo_o2
            pac_hemodialisis
            diagnostico1
            diagnostico
            pac_codigo_uveh
            fecha_prealta
            fecha_ingreso
            fecha_egreso
            hospitalizado
        }
    }
`;

const OBTENER_PACIENTES = gql`
    query obtenerPacientes {
        obtenerPacientes {
            id
            expediente
            pac_apellido_paterno
            pac_apellido_materno
            pac_nombre
            pac_genero
            pac_FN
            pac_dispositivo_o2
            pac_hemodialisis
            diagnostico1
            diagnostico
            pac_codigo_uveh
            fecha_prealta
            fecha_ingreso
            fecha_egreso
            hospitalizado
        }
    }

`;

const NuevoPaciente = () => {
    
    // routing
    const router = useRouter();

    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);

    const { cama,  } = useContext(PacienteContext);


    const { data: pacientesData, loading: pacientesLoading, error: pacientesError } = useQuery(OBTENER_PACIENTES);
 
    // Mutation de apollo
    const [nuevoPaciente] = useMutation(NUEVO_PACIENTE, {
        update(cache, { data: { nuevoPaciente } }) {
            // Obtener el objeto de cache directamente desde la consulta anterior
            const { obtenerPacientes } = pacientesData;
    
            // Verificar si hay errores o está cargando en la consulta original
            if (pacientesLoading || pacientesError) {
                console.log('Cargando o error en la consulta de pacientes');
                return;
            }
    
            // Reescribir ese objeto
            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data: {
                    obtenerPacientes: [...obtenerPacientes, nuevoPaciente]
                }
            });
        },
    });


    // Formulario para nuevos microorganismos
    const formik = useFormik({
        initialValues: {
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
            pac_codigo_uveh: ['SinDefinir'],
            fecha_ingreso: '',
            fecha_prealta: '',
            fecha_egreso: '',
            hospitalizado: true,
        },
        validationSchema: Yup.object({
            expediente: Yup.string().required('El expediente del paciente es obligatorio'),
            pac_apellido_paterno: Yup.string().required('El apellido paterno del paciente es obligatorio'),
            pac_apellido_materno: Yup.string().required('El apellido materno del paciente es obligatorio'),
            pac_nombre: Yup.string().required('El nombre del paciente es obligatorio'),
            pac_genero: Yup.string().oneOf(['Hombre', 'Mujer']).required('El género del paciente es obligatorio'),
            pac_FN: Yup.date().required('La fecha de nacimiento del paciente es obligatoria'),
            pac_dispositivo_o2: Yup.string().oneOf([
                'AA', 
                'PN', 
                'PNAF', 
                'VMNI', 
                'VM']).required('El dispositivo O2 del paciente es obligatorio'),
            pac_hemodialisis: Yup.boolean(),
            diagnostico1: Yup.array()
            .min(0, 'Debe seleccionar al menos un diagnóstico')
            .of(
                Yup.string().oneOf([
                'CodigoHemoptisis',
                'CodigoViaAerea',
                'CodigoInfarto',
                'COVID',
                'Influenza',
                'Parainfluenza',
                'Adenovirus',
                'VirusSincialRespiratorio',
                'TuberculosisSensible',
                'TuberculosisResistente',
                'B24',
                'SIRA',
                'NeumoniaBacteriana',
                'EPOC',
                'Asma',
                'TromboembiaPulmonar',
                'DerramePleural',
                'Neumotorax',
                'NeumoniaIntersticialDifusa',
                'InsuficienciaCaridiaca',
                'CaPulmonarOSospecha',
                ])
            ),
            diagnostico: Yup.string(),
            pac_codigo_uveh:  Yup.array()
            .min(0, 'Debe seleccionar al menos un diagnóstico')
            .of(
                Yup.string().oneOf([
                'SinDefinir',
                'SinAislamientos',
                'Acinetobacter',
                'ColonizaciónAcinetobacter',
                'ContactoAcinetobacter',
                'HisopadoRectal',
                'ClostridiumDifficile',
                'Enterobacterias-XDR-MDR',
                'Pseudomonas-XDR-MDR',
                'SAMR',
                'TuberculosisisOSospecha',
                'SAMS'
                ])
            ),
            fecha_ingreso: Yup.date().required('La fecha de ingreso es obligatoria'),
            fecha_prealta: Yup.date(),
            fecha_egreso: Yup.date(),
            hospitalizado: Yup.boolean()
        }),
        onSubmit: async valores => {
            const { 
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
                pac_codigo_uveh,
                fecha_ingreso,
                fecha_prealta,
                fecha_egreso,
                hospitalizado,
            } = valores;

            //console.log("valores inciales del nuevo objeto", valores)

            // Verificar si las fechas son nulas o vacías
            const fechaPrealta = fecha_prealta || undefined; // Establece un valor predeterminado si es nulo o vacío
            const fechaEgreso = fecha_egreso || undefined; // Establece un valor predeterminado si es nulo o vacío

            const valoresActualizados = {
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
                pac_codigo_uveh,
                fecha_ingreso,
                fecha_prealta: fechaPrealta,
                fecha_egreso: fechaEgreso,
                hospitalizado,
                cama_relacionada: cama,
            };

            //console.log("Valores actualizados:", valoresActualizados)


        
            try {
                const { data } = await nuevoPaciente({
                    variables: {
                        input: valoresActualizados
                    }
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
                console.error("Error durante la llamada a actualizarPaciente:", error);

                guardarMensaje(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => {
                    guardarMensaje(null);
                }, 5000);
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
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Paciente</h1>
                Hola Paciente   
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expediente">
                                    Expediente
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="expediente"
                                    type="text"
                                    placeholder="Expediente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.expediente}
                                />
                            </div>

                            { formik.touched.expediente && formik.errors.expediente ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.expediente}</p>
                                </div>
                            ) : null  }


              

                            <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Paciente"

                            
                        />
                    </form>
                </div>
            </div>
            {mensaje && mostrarMensaje()}
        </Layout>
    );
}
 
export default NuevoPaciente;