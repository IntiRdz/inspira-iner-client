import React, { useState } from 'react';
import Layout from '../components/Layout';
import { gql, useMutation, useQuery  } from '@apollo/client';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'

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

    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);
    
    // routing
    const router = useRouter();


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
            diagnostico: '',
            pac_codigo_uveh: '',
            fecha_ingreso: '',
            fecha_prealta: '',
            fecha_egreso: '',
            hospitalizado: true
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
            diagnostico: Yup.string().required('El diagnóstico es obligatorio'),
            pac_codigo_uveh: Yup.string().required([
                'Sin Aislamientos',
                'Acinetobacter',
                'Colonización Acinetobacter',
                'Contacto Acinetobacter',
                'Hisopado Rectal',
                'Clostridium Difficile',
                'Enterobacterias XDR MDR',
                'Pseudomonas XDR MDR',
                'SAMR',
                'Tuberculosisis o Sospecha',
                'SAMS'
            ]).required('El Código es obligatorio'),
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
                diagnostico,
                pac_codigo_uveh,
                fecha_ingreso,
                fecha_prealta,
                fecha_egreso,
                hospitalizado
            } = valores;

            // Verificar si las fechas son nulas o vacías
            const fechaPrealta = fecha_prealta || undefined; // Establece un valor predeterminado si es nulo o vacío
            const fechaEgreso = fecha_egreso || undefined; // Establece un valor predeterminado si es nulo o vacío

        
            try {
                const { data } = await nuevoPaciente({
                    variables: {
                        input: {
                            expediente,
                            pac_apellido_paterno,
                            pac_apellido_materno,
                            pac_nombre,
                            pac_genero,
                            pac_FN,
                            pac_dispositivo_o2,
                            pac_hemodialisis,
                            diagnostico,
                            pac_codigo_uveh,
                            fecha_ingreso,
                            fecha_prealta: fechaPrealta,
                            fecha_egreso: fechaEgreso,
                            hospitalizado
                        }
                    }
                });
                
                
                console.log("Se creo el paciente",data.nuevoPaciente);

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
                guardarMensaje(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => {
                    guardarMensaje(null);
                }, 2000);
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

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_apellido_paterno">
                                    Apellido Paterno
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_apellido_paterno"
                                    type="text"
                                    placeholder="Apellido Paterno"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pac_apellido_paterno}
                                />
                            </div>

                            { formik.touched.pac_apellido_paterno && formik.errors.pac_apellido_paterno ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.pac_apellido_paterno}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_apellido_materno">
                                    Apellido Materno
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_apellido_materno"
                                    type="text"
                                    placeholder="Apellido Materno"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pac_apellido_materno}
                                />
                            </div>

                            { formik.touched.pac_apellido_materno && formik.errors.pac_apellido_materno ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.pac_apellido_materno}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_nombre">
                                    Nombre
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_nombre"
                                    type="text"
                                    placeholder="Nombre Paciente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pac_nombre}
                                />
                            </div>

                            { formik.touched.pac_nombre && formik.errors.pac_nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.pac_nombre}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_genero">
                                    Género
                                </label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_genero"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pac_genero}
                                >
                                    <option value="" label="Seleccione un género" />
                                    <option value="Hombre" label="Hombre" />
                                    <option value="Mujer" label="Mujer" />
                                </select>
                            </div>

                            { formik.touched.pac_genero && formik.errors.pac_genero ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.pac_genero}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_FN">
                                    Fecha de Nacimiento
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_FN"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pac_FN}
                                />
                            </div>

                            { formik.touched.pac_FN && formik.errors.pac_FN ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.pac_FN}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_dispositivo_o2">
                                    Dispositivo O2
                                </label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_dispositivo_o2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pac_dispositivo_o2}
                                >
                                    <option value="" label="Seleccione un dispositivo" />
                                    <option value="AA" label="AA" />
                                    <option value="PN" label="PN" />
                                    <option value="PNAF" label="PNAF" />
                                    <option value="VMNI" label="VMNI" />
                                    <option value="VM" label="VM" />
                                </select>
                            </div>

                            { formik.touched.pac_dispositivo_o2 && formik.errors.pac_dispositivo_o2 ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.pac_dispositivo_o2}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_hemodialisis">
                                    Hemodialisis
                                </label>

                                <div className="flex items-center">
                                    <input
                                        className="mr-2 leading-tight"
                                        id="pac_hemodialisis_true"
                                        type="radio"
                                        onChange={() => formik.setFieldValue("pac_hemodialisis", true)}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.pac_hemodialisis === true}
                                    />
                                    <label htmlFor="pac_hemodialisis_true">Sí</label>

                                    <input
                                        className="ml-4 mr-2 leading-tight"
                                        id="pac_hemodialisis_false"
                                        type="radio"
                                        onChange={() => formik.setFieldValue("pac_hemodialisis", false)}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.pac_hemodialisis === false}
                                    />
                                    <label htmlFor="pac_hemodialisis_false">No</label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico">
                                    Diagnóstico
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="diagnostico"
                                    type="text"
                                    placeholder="Diagnóstico"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.diagnostico}
                                />
                            </div>

                            { formik.touched.diagnostico && formik.errors.diagnostico ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.diagnostico}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_codigo_uveh">
                                    Código UVEH
                                </label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_codigo_uveh"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pac_codigo_uveh}
                                >
                                    <option value="" label="Seleccione una opción" />
                                    <option value="Sin_Aislamientos" label="Sin Aislamientos" />
                                    <option value="Acinetobacter" label="Acinetobacter" />
                                    <option value="Colonización_Acinetobacter" label="Colonización Acinetobacter" />
                                    <option value="Contacto_Acinetobacter" label="Contacto Acinetobacter" />
                                    <option value="Hisopado_Rectal" label="Hisopado Rectal" />
                                    <option value="Clostridium_Difficile" label="Clostridium Difficile" />
                                    <option value="Enterobacterias_XDR_MDR" label="Enterobacterias XDR MDR" />
                                    <option value="Pseudomonas_XDR_MDR" label="Pseudomonas XDR MDR" />
                                    <option value="SAMR" label="SAMR" />                                  
                                    <option value="Tuberculosisis_o_Sospecha" label="Tuberculosisis o Sospecha" />
                                    <option value="SAMS" label="SAMS" />  
                                </select>
                            </div>

                            { formik.touched.pac_codigo_uveh && formik.errors.pac_codigo_uveh ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.pac_codigo_uveh}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_ingreso">
                                    Fecha de Ingreso
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fecha_ingreso"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fecha_ingreso}
                                />
                            </div>

                            { formik.touched.fecha_ingreso && formik.errors.fecha_ingreso ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.fecha_ingreso}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_prealta">
                                    Fecha de Prealta
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fecha_prealta"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fecha_prealta}
                                />
                            </div>

                            { formik.touched.fecha_prealta && formik.errors.fecha_prealta ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.fecha_prealta}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_egreso">
                                    Fecha de Egreso
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fecha_egreso"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fecha_egreso}
                                />
                            </div>

                            { formik.touched.fecha_egreso && formik.errors.fecha_egreso ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.fecha_egreso}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospitalizado">
                                    Hospitalizado
                                </label>

                                <div className="flex items-center">
                                    <input
                                        className="mr-2 leading-tight"
                                        id="hospitalizado_true"
                                        type="radio"
                                        onChange={() => formik.setFieldValue("hospitalizado", true)}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.hospitalizado === true}
                                    />
                                    <label htmlFor="hospitalizado_true">Sí</label>

                                    <input
                                        className="ml-4 mr-2 leading-tight"
                                        id="hospitalizado_false"
                                        type="radio"
                                        onChange={() => formik.setFieldValue("hospitalizado", false)}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.hospitalizado === false}
                                    />
                                    <label htmlFor="hospitalizado_false">No</label>
                                </div>
                            </div>               

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