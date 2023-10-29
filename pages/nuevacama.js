import React, { useState } from 'react';
import Layout from '../components/Layout'
import {useQuery, gql, useMutation} from '@apollo/client' 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const NUEVA_CAMA = gql`
    mutation nuevaCama($input: CamaInput) {
        nuevaCama(input: $input) {
            id
            cama_numero
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

const OBTENER_CAMAS = gql`
  query obtenerCamas {
      obtenerCamas {
            id
            cama_numero
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

const NuevaCama = () => {

    // routing
    const router = useRouter();

    const { data: camasData, loading: camasLoading, error: camasError } = useQuery(OBTENER_CAMAS);

    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);

    // Mutation de apollo
    const [nuevaCama] = useMutation(NUEVA_CAMA, {
        update(cache, { data: { nuevaCama } }) {
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
                    obtenerCamas: [...obtenerCamas, nuevaCama]
                }
            });
        },
    });
    
    // Formulario para nuevas camas
    const formik = useFormik({
        initialValues: {
            cama_numero: '',
            cama_compartida: true,
            cama_disponible: true,
            cama_ocupada: false,
            cama_genero: 'Indeterminado',
            cama_dispositivo_o2: 'VM',
            cama_hemodialisis: true,
            cama_aislamiento: false,
            cama_dan: false,
            cama_codigo_uveh: 'Sin_Definir',
        },
        validationSchema: Yup.object({
            cama_numero: Yup.number().required('El número de la cama es obligatorio').positive('No se aceptan números negativos'),
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
            ]).required('Definido por UVEH'),
            cama_aislamiento: Yup.bool(),
            cama_dan: Yup.bool(),
        }), 
        onSubmit: async valores => {

            const { 
                cama_numero,
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
                const { data } = await nuevaCama({
                    variables: {
                        input: {
                            cama_numero,
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

                //console.log(data);

                // Mostrar una alerta
                Swal.fire(
                    'Creado',
                    'Se creó la cama correctamente',
                    'success'
                )

                // Redireccionar hacia los camas
                router.push('/camas'); 
                
            } catch (error) {
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
            <h1 className="text-2xl text-gray-800 font-light">Crear Nueva Cama</h1>
                Hola cama
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                    onSubmit={formik.handleSubmit}
                    >
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_numero">
                                Número
                            </label>
        
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cama_numero"
                                type="number"
                                placeholder="Número de Cama"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cama_numero}
                            />
                        </div>
        
                        { formik.touched.cama_numero && formik.errors.cama_numero ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.cama_numero}</p>
                            </div>
                        ) : null  } 
        
        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Compartida
                            </label>
                            <label className="inline-flex items-center mr-3" htmlFor="cama_compartida_true">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_compartida"
                                    value="true"
                                    id="cama_compartida_true"
                                    checked={formik.values.cama_compartida === true}
                                    onChange={() => formik.setFieldValue("cama_compartida", true)}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className="inline-flex items-center" htmlFor="cama_compartida_false">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_compartida"
                                    value="false"
                                    id="cama_compartida_false"
                                    checked={formik.values.cama_compartida === false}
                                    onChange={() => formik.setFieldValue("cama_compartida", false)}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
       
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Disponible
                            </label>
                            <label className="inline-flex items-center mr-3" htmlFor="cama_disponible_true">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_disponible"
                                    value="true"
                                    id= "cama_disponible_true"
                                    checked={formik.values.cama_disponible === true}
                                    onChange={() => formik.setFieldValue("cama_disponible", true)}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className="inline-flex items-center" htmlFor="cama_disponible_false">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_disponible"
                                    value="false"
                                    id="cama_disponible_false"
                                    checked={formik.values.cama_disponible === false}
                                    onChange={() => formik.setFieldValue("cama_disponible", false)}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Ocupada
                            </label>
                            <label className="inline-flex items-center mr-3" htmlFor="cama_ocupada_true">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_ocupada"
                                    value="true"
                                    id= "cama_ocupada_true"
                                    checked={formik.values.cama_ocupada === true}
                                    onChange={() => formik.setFieldValue("cama_ocupada", true)}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className="inline-flex items-center" htmlFor="cama_ocupada_false">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_ocupada"
                                    value="false"
                                    id="cama_ocupada_false"
                                    checked={formik.values.cama_ocupada === false}
                                    onChange={() => formik.setFieldValue("cama_ocupada", false)}
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
                                id="cama_genero" // Este es el id del select
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cama_genero}
                                name="cama_genero" // Agrega el atributo name para que Formik pueda rastrear el campo
                            >
                                <option value="" label="Seleccione un género" />
                                <option value="Hombre" label="Hombre" />
                                <option value="Mujer" label="Mujer" />
                                <option value="Indeterminado" label="Indeterminado" />
                            </select>
                        </div>

                        {formik.touched.cama_genero && formik.errors.cama_genero ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.cama_genero}</p>
                            </div>
                        ) : null}
        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_dispositivo_o2">
                                Dispositivo O2
                            </label>
                            <select 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cama_dispositivo_o2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cama_dispositivo_o2}
                            >
                                <option value="" label="Seleccione un dispositivo" />
                                <option value="No_VM" label="No VM" />
                                <option value="VM" label="VM" />
                            </select>
                        </div>
        
                        { formik.touched.cama_dispositivo_o2 && formik.errors.cama_dispositivo_o2 ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.cama_dispositivo_o2}</p>
                            </div>
                        ) : null  }
        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Hemodialisis Disponible
                            </label>
                            <label className="inline-flex items-center mr-3" htmlFor="cama_hemodialisis_true">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_hemodialisis"
                                    value="true"
                                    id="cama_hemodialisis_true"
                                    checked={formik.values.cama_hemodialisis === true}
                                    onChange={() => formik.setFieldValue("cama_hemodialisis", true)}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className="inline-flex items-center" htmlFor="cama_hemodialisis_false">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_hemodialisis"
                                    value="false"
                                    id="cama_hemodialisis_false"
                                    checked={formik.values.cama_hemodialisis === false}
                                    onChange={() => formik.setFieldValue("cama_hemodialisis", false)}
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
                                id="cama_codigo_uveh" // Este es el id del select
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cama_codigo_uveh}
                                name="cama_codigo_uveh" // El atributo name ya está configurado correctamente
                            >
                                <option value="" label="Código UVEH" />
                                <option value="Sin_Definir" label="Sin Definir" />
                                <option value="Sin_Aislamientos" label="Sin Aislamientos" />
                                <option value="Previamente_Acinetobacter" label="Previamente Acinetobacter" />
                                <option value="Previamente_Clostridium" label="Previamente Clostridium" />
                                <option value="Previamente_Enterobacterias_XDR" label="Previamente Enterobacterias XDR" />
                                <option value="Previamente_Pseudomonas_Aeruginosa_XDR" label="Previamente Pseudomonas Aeruginosa XDR" />
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Requiere aislamento
                            </label>
                            <label className="inline-flex items-center mr-3" htmlFor="cama_aislamiento_true">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_aislamiento"
                                    value="true"
                                    id="cama_aislamiento_true"
                                    checked={formik.values.cama_aislamiento === true}
                                    onChange={() => formik.setFieldValue("cama_aislamiento", true)}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className="inline-flex items-center" htmlFor="cama_aislamiento_false">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_aislamiento"
                                    value="false"
                                    id="cama_aislamiento_false"
                                    checked={formik.values.cama_aislamiento === false}
                                    onChange={() => formik.setFieldValue("cama_aislamiento", false)}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Requiere DAN
                            </label>
                            <label className="inline-flex items-center mr-3"  htmlFor="cama_dan_true">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_dan"
                                    value="true"
                                    id="cama_dan_true"
                                    checked={formik.values.cama_dan === true}
                                    onChange={() => formik.setFieldValue("cama_dan", true)}
                                />
                                <span className="ml-2">Sí</span>
                            </label>
                            <label className="inline-flex items-center"  htmlFor="cama_dan_false">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="cama_dan"
                                    value="false"
                                    id="cama_dan_false"
                                    checked={formik.values.cama_dan === false}
                                    onChange={() => formik.setFieldValue("cama_dan", false)}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
        
                        { formik.touched.cama_codigo_uveh && formik.errors.cama_codigo_uveh ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.cama_codigo_uveh}</p>
                            </div>
                        ) : null  }
                
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Agregar Nueva Cama"
                        />
                    </form>
                </div>
            </div>
            {mensaje && mostrarMensaje()}
        </Layout>
     );
}
 
export default NuevaCama;