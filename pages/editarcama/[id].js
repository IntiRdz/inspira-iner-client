import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const OBTENER_CAMAS = gql`
  query obtenerCamas {
      obtenerCamas {
            id
            cama_numero
            cama_prioridad
            cama_compartida
            cama_disponible
            cama_genero
            cama_dispositivo_o2
            cama_hemodialisis
            cama_aislamiento
            cama_dan
            cama_codigo_uveh
      }
  }
`;

const OBTENER_CAMA = gql`
    query obtenerCama($id: ID!) {
        obtenerCama(id: $id) {
            cama_numero
            cama_prioridad
            cama_compartida
            cama_disponible
            cama_ocupada
            cama_genero
            cama_dispositivo_o2
            cama_hemodialisis
            cama_codigo_uveh
            cama_aislamiento
            cama_dan
        }
    }
`;

const ACTUALIZAR_CAMA = gql`
    mutation actualizarCama($id: ID!, $input: CamaInput) {
            actualizarCama(id:$id, input:$input) {
                cama_numero
                cama_prioridad
                cama_compartida
                cama_disponible
                cama_ocupada
                cama_genero
                cama_dispositivo_o2
                cama_hemodialisis
                cama_codigo_uveh
                cama_aislamiento
                cama_dan
            }
    }
`;

const EditarCama = () => {
    
    const router = useRouter();
    const { query: { id } } = router;
    
    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);

    // Consultar para obtener la cama
    const { data, loading, error } = useQuery(OBTENER_CAMA, {
        variables: {
            id
        }
    });
    
    const { data: camasData, loading: camasLoading, error: camasError } = useQuery(OBTENER_CAMAS);

    // Mutation para modificar la cama

    const [actualizarCama] = useMutation(ACTUALIZAR_CAMA, {
        update(cache, { data: { actualizarCama } }) {
            // Obtener el objeto de cache directamente desde la consulta anterior
            const { obtenerCamas } = camasData;
    
            // Verificar si hay errores o está cargando en la consulta original
            if (camasLoading || camasError) {
                console.log('Cargando o error en la consulta de camas');
                return;
            }
    
            // Reescribir ese objeto
            cache.writeQuery({
                query: OBTENER_CAMAS,
                data: {
                    obtenerCamas: [...obtenerCamas, actualizarCama]
                }
            });
        },
    });

    // Schema de validación
    const schemaValidacion = Yup.object({
        cama_numero: Yup.number().required('El número de la cama es obligatorio').positive('No se aceptan números negativos'),
        cama_prioridad: Yup.string().oneOf([
            'SinPrioridad',
            'COVID',
            'Influenza',
            'VirusRespiratorios', 
            'B24',
            'TuberculosisSensible',
            'TuberculosisResistente'
        ]),
        cama_compartida: Yup.bool(),
        cama_disponible: Yup.bool(),
        cama_ocupada: Yup.bool(),
        cama_genero: Yup.string().oneOf([
            'Hombre', 
            'Mujer', 
            'Indeterminado'
        ]).required('El género es obligatorio'),
        cama_dispositivo_o2: Yup.string().oneOf([
            'No_VM', 
            'VM'
        ]).required('El dispositivo O2 es obligatorio'),
        cama_hemodialisis: Yup.bool(),
        cama_codigo_uveh: Yup.string().oneOf([
            'Sin_Definir', 
            'Sin_Aislamientos', 
            'Previamente_Acinetobacter', 
            'Previamente_Clostridium', 
            'Previamente_Enterobacterias_XDR', 
            'Previamente_Pseudomonas_Aeruginosa_XDR'
        ], 'Opcion no válida'),
        cama_aislamiento: Yup.bool(),
        cama_dan: Yup.bool(),
    });

    if(loading) return 'Cargando...';

    //console.log(data.obtenerCama)

    const { obtenerCama } = data;

    const valoresIniciales = {
        cama_numero: obtenerCama.cama_numero,
        cama_prioridad: obtenerCama.cama_prioridad ,
        cama_compartida: obtenerCama.cama_compartida ,
        cama_disponible: obtenerCama.cama_disponible,
        cama_ocupada: obtenerCama.cama_ocupada,
        cama_genero: obtenerCama.cama_genero,
        cama_dispositivo_o2: obtenerCama.cama_dispositivo_o2,
        cama_hemodialisis: obtenerCama.cama_hemodialisis,
        cama_codigo_uveh: obtenerCama.cama_codigo_uveh  || '', 
        cama_aislamiento: obtenerCama.cama_aislamiento,
        cama_dan: obtenerCama.cama_dan,
    };

    // Modifica la cama en la BD

    const actualizarInfoCama = async valores => {
        const {
            cama_numero,
            cama_prioridad,
            cama_compartida,
            cama_disponible,
            cama_ocupada,
            cama_genero,
            cama_dispositivo_o2,
            cama_hemodialisis,
            cama_codigo_uveh,
            cama_aislamiento,
            cama_dan,
        } = valores;
        try {
            const {data} =  await actualizarCama({
                variables: {
                    id, 
                    input: {
                        cama_numero,
                        cama_prioridad,
                        cama_compartida,
                        cama_disponible,
                        cama_ocupada,
                        cama_genero,
                        cama_dispositivo_o2,
                        cama_hemodialisis,
                        cama_codigo_uveh,
                        cama_aislamiento,
                        cama_dan,
                    }
                }
            });

            // console.log(data);

            // Mostrar una alerta
            Swal.fire(
                'Correcto',
                'La cama se actualizó correctamente',
                'success'
            )
            // Redirigir hacia camas
            router.push('/camas')
            
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error: ', ''));

            setTimeout(() => {
                guardarMensaje(null);
            }, 5000);
        }
    }

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cama</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={valoresIniciales}
                        onSubmit={ valores => {
                            actualizarInfoCama(valores)
                        }} 
                    >

                        {props => {
                        // console.log(props);
                            return (
                                <form 
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                                onSubmit={props.handleSubmit}
                                >
                                    
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_numero">
                                            Número
                                        </label>

                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="cama_numero"
                                            type="number"
                                            placeholder={props.values.cama_numero}
                                            onChange={props.handleChange}
                                            value={props.values.cama_numero}
                                            readOnly
                                        />
                                    </div>

                                    { props.touched.cama_numero && props.errors.cama_numero ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.cama_numero}</p>
                                        </div>
                                    ) : null  } 

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_prioridad">
                                            Prioridad
                                        </label>
                                        <select 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="cama_prioridad"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.cama_prioridad}
                                        >
                                            <option value="" label="Seleccione una Prioridad" />
                                            <option value="SinPrioridad" label="Sin Prioridad" />
                                            <option value="COVID" label="COVID" />
                                            <option value="Influenza" label="Influenza" />
                                            <option value="VirusRespiratorios" label="Virus Respiratorios" />
                                            <option value="B24" label="B24" />
                                            <option value="TuberculosisSensible" label="Tuberculosis Sensible" />
                                            <option value="TuberculosisResistente" label="Tuberculosis Resistente" />
                                        </select>
                                    </div>

                                    { props.touched.cama_genero && props.errors.cama_genero ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.cama_genero}</p>
                                        </div>
                                    ) : null  }
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_compartida">
                                            Compartida
                                        </label>
                                        <label className="inline-flex items-center mr-3">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_compartida"
                                                value="true"
                                                checked={props.values.cama_compartida === true}
                                                onChange={() => props.setFieldValue("cama_compartida", true)}
                                            />
                                            <span className="ml-2">Sí</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_compartida"
                                                value="false"
                                                checked={props.values.cama_compartida === false}
                                                onChange={() => props.setFieldValue("cama_compartida", false)}
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_disponible">
                                            Disponible
                                        </label>
                                        <label className="inline-flex items-center mr-3">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_disponible"
                                                value="true"
                                                checked={props.values.cama_disponible === true}
                                                onChange={() => props.setFieldValue("cama_disponible", true)}
                                            />
                                            <span className="ml-2">Sí</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_disponible"
                                                value="false"
                                                checked={props.values.cama_disponible === false}
                                                onChange={() => props.setFieldValue("cama_disponible", false)}
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_ocupada">
                                            Ocupada
                                        </label>
                                        <label className="inline-flex items-center mr-3">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_ocupada"
                                                value="true"
                                                checked={props.values.cama_ocupada === true}
                                                onChange={() => props.setFieldValue("cama_ocupada", true)}
                                            />
                                            <span className="ml-2">Sí</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_ocupada"
                                                value="false"
                                                checked={props.values.cama_ocupada === false}
                                                onChange={() => props.setFieldValue("cama_ocupada", false)}
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>


                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_genero">
                                            Género por Habitacion
                                        </label>
                                        <select 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="cama_genero"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.cama_genero}
                                        >
                                            <option value="" label="Seleccione un género" />
                                            <option value="Hombre" label="Hombre" />
                                            <option value="Mujer" label="Mujer" />
                                            <option value="Indeterminado" label="Indeterminado" />
                                        </select>
                                    </div>

                                    { props.touched.cama_genero && props.errors.cama_genero ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.cama_genero}</p>
                                        </div>
                                    ) : null  }

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_dispositivo_o2">
                                            Dispositivo O2
                                        </label>
                                        <select 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="cama_dispositivo_o2"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.cama_dispositivo_o2}
                                        >
                                            <option value="" label="Seleccione un dispositivo" />
                                            <option value="No_VM" label="No VM" />
                                            <option value="VM" label="VM" />
                                        </select>
                                    </div>

                                    { props.touched.cama_dispositivo_o2 && props.errors.cama_dispositivo_o2 ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.cama_dispositivo_o2}</p>
                                        </div>
                                    ) : null  }

                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_hemodialisis">
                                            Hemodialisis Disponible
                                        </label>
                                        <label className="inline-flex items-center mr-3">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_hemodialisis"
                                                value="true"
                                                checked={props.values.cama_hemodialisis === true}
                                                onChange={() => props.setFieldValue("cama_hemodialisis", true)}
                                            />
                                            <span className="ml-2">Sí</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_hemodialisis"
                                                value="false"
                                                checked={props.values.cama_hemodialisis === false}
                                                onChange={() => props.setFieldValue("cama_hemodialisis", false)}
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_codigo_uveh">
                                            Código UVEH
                                        </label>
                                        <select 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="cama_codigo_uveh"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.cama_codigo_uveh}
                                        >
                                            <option value="" label="Código UVEH" />
                                            <option value="Sin_Definir" label="Sin Asignar" />
                                            <option value="Sin_Aislamientos" label="Sin Aislamientos" />
                                            <option value="Previamente_Acinetobacter" label="Previamente Acinetobacter" />
                                            <option value="Previamente_Clostridium" label="Previamente Clostridium" />
                                            <option value="Previamente_Enterobacterias_XDR" label="Previamente Enterobacterias XDR" />
                                            <option value="Previamente_Pseudomonas_Aeruginosa_XDR" label="Previamente Pseudomonas Aeruginosa XDR" />

                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_aislamiento">
                                            Requiere aislamento
                                        </label>
                                        <label className="inline-flex items-center mr-3">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_aislamiento"
                                                value="true"
                                                checked={props.values.cama_aislamiento === true}
                                                onChange={() => props.setFieldValue("cama_aislamiento", true)}
                                            />
                                            <span className="ml-2">Sí</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_aislamiento"
                                                value="false"
                                                checked={props.values.cama_aislamiento === false}
                                                onChange={() => props.setFieldValue("cama_aislamiento", false)}
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_dan">
                                            Requiere DAN
                                        </label>
                                        <label className="inline-flex items-center mr-3">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_dan"
                                                value="true"
                                                checked={props.values.cama_dan === true}
                                                onChange={() => props.setFieldValue("cama_dan", true)}
                                            />
                                            <span className="ml-2">Sí</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="cama_dan"
                                                value="false"
                                                checked={props.values.cama_dan === false}
                                                onChange={() => props.setFieldValue("cama_dan", false)}
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>

                                    { props.touched.cama_codigo_uveh && props.errors.cama_codigo_uveh ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.cama_codigo_uveh}</p>
                                        </div>
                                    ) : null  }

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Editar Cama"
                                    />
                                </form>
                    )
                }}
                    </Formik>
                </div>
            </div>
            {mensaje && mostrarMensaje() }
        </Layout>
     );
}
 
export default EditarCama;