import React, { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import PacienteContext from '../../context/pacientes/PacienteContext';
/* import { AsignarCamaTodas } from '../../components/pacientes/AsignarCamaTodas'; */
import { AsignarMicroorganismo } from '../../components/microrganismos/AsignarMicroorganismo';

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

const OBTENER_PACIENTE = gql`
  query obtenerPaciente($id: ID!) {
    pacienteData: obtenerPaciente(id: $id) {
      id
      pac_apellido_paterno
      pac_apellido_materno
      pac_nombre
      cama_relacionada{
        id
      }
    
    }
  }
`;

const NUEVO_MICROORGANISMO = gql`
  mutation nuevoMicroorganismo($input: MicroorganismoInput) {
    nuevoMicroorganismo(input: $input) {
      fecha_deteccion
      metodo_deteccion
      microorganismo_tipo
      microorganismo_nombre
      susceptibilidad
      comentario_uveh
      paciente_relacionado {
        id
      }
      cama_relacionada{
        id
      }
    }
  }
`;

const NuevoMicroorganismo = () => {
    // routing
    const router = useRouter();
    const { query: { id } } = router;

    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);


  const { cama, diagnostico } = useContext(PacienteContext);

    //console.log("Nombre del Microorganismo:", typeof diagnostico);     //no se por que el contex se guarda en diagnostico
    //console.log("Contenido del Microorganismo:",  diagnostico);

// Consulta para obtener todos los pacientes y actualizar el context de la consulta obtenerPacientes
  const { data: pacientesData, loading: pacientesLoading, error: pacientesError } = useQuery(OBTENER_PACIENTES);
  
  // Consulta para obtener el paciente
  const { data: pacienteData, loading: pacienteLoading, error: pacienteError } = useQuery(OBTENER_PACIENTE, {
    variables: {
      id,
    },
  });


    // Mutation para asignar el microrganismo al paciente al paciente
    const [nuevoMicroorganismo] = useMutation(NUEVO_MICROORGANISMO, {

        update(cache, { data: { nuevoMicroorganismo } }) {
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
                    obtenerPacientes: [...obtenerPacientes, nuevoMicroorganismo]
                }
            });
        },
    });

  console.log('datos paciente', pacienteData);
  //console.log('datos micro', microData);
            
    // Formulario para nuevos microorganismos
    const formik = useFormik({
        initialValues: {
            fecha_deteccion: '',
            metodo_deteccion: '',
            microorganismo_tipo: '',
            susceptibilidad: '',
            comentario_uveh: '',
            paciente_relacionado: id,

        },
        validationSchema: Yup.object({
            fecha_deteccion: Yup.date().required('La fecha de detección es obligatoria'),
            metodo_deteccion: Yup.string()
                .oneOf([
                    'PCR', 
                    'Panel', 
                    'Cultivo'
                ])
                .required('El método de detección es obligatorio'),
            microorganismo_tipo: Yup.string()
                .oneOf([
                    'Virus', 
                    'Bacteria', 
                    'Micobacteria', 
                    'Hongo'
                ])
                .required('El tipo de microorganismo es obligatorio'),
            susceptibilidad: Yup.string().oneOf([
                'BLEE', 
                'MDR', 
                'XDR', 
                'Sensible'
            ]),
            comentario_uveh: Yup.string(),
        }), 
        onSubmit: async valores => {

            
            const { 
                fecha_deteccion,
                metodo_deteccion,
                microorganismo_tipo,
                microorganismo_nombre,
                susceptibilidad,
                comentario_uveh,
                paciente_relacionado,
                cama_relacionada,
            } = valores;
            
            //console.log("Valores Inciales:", valores)

            const valoresActualizados = {
                fecha_deteccion,
                metodo_deteccion,
                microorganismo_tipo,
                microorganismo_nombre: diagnostico,
                susceptibilidad,
                comentario_uveh,
                paciente_relacionado: id,
                cama_relacionada: pacienteData.pacienteData.cama_relacionada[pacienteData.pacienteData.cama_relacionada.length - 1].id
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
                router.push('/'); 



            } catch (error) {
                console.error("Error durante al crear microorganismo:", error);

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

            
            <h2 className=" pt-20 text-2xl text-gray-800 font-light">Asignar Microorganismo</h2>
            {pacienteData && pacienteData.pacienteData.cama_relacionada && pacienteData.pacienteData.cama_relacionada.length > 0 && (
                <div>
                    <p>Paciente: {pacienteData.pacienteData.pac_apellido_paterno} {pacienteData.pacienteData.pac_apellido_materno} {pacienteData.pacienteData.pac_nombre}</p>
                    <p>Cama Relacionada: {pacienteData.pacienteData.cama_relacionada[pacienteData.pacienteData.cama_relacionada.length - 1].id} </p>
                </div>
            )}


                <div className="flex justify-center mt-5">


                <div className="w-full max-w-lg">
                    <form 
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                    onSubmit={formik.handleSubmit}
                    >
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_deteccion">
                                Fecha de detección
                            </label>
        
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fecha_deteccion"
                                type="datetime-local"
                                placeholder="Fecha de detección del Microorganismo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fecha_deteccion}
                            />
                        </div>
        
                        { formik.touched.fecha_deteccion && formik.errors.fecha_deteccion ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.fecha_deteccion}</p>
                            </div>
                        ) : null  } 

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metodo_deteccion">
                                Método de Detección
                            </label>
                            <select 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="metodo_deteccion"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.metodo_deteccion}
                            >
                                <option value="" label="Seleccione una opción" />
                                <option value="PCR" label="PCR" />
                                <option value="Panel" label="Panel" />
                                <option value="Cultivo" label="Cultivo" />                            
                            </select>
                        </div>
        
                        { formik.touched.metodo_deteccion && formik.errors.metodo_deteccion ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.metodo_deteccion}</p>
                            </div>
                        ) : null  }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="microorganismo_tipo">
                                Tipo de Microorganismo
                            </label>
                            <select 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="microorganismo_tipo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.microorganismo_tipo}
                            >
                                <option value="" label="Seleccione una opción" />
                                <option value="Virus" label="Virus" />
                                <option value="Bacteria" label="Bacteria" />
                                <option value="Micobacteria" label="No Micobacteria" />
                                <option value="Hongo" label="Hongo" />                             
                            </select>
                        </div>
        
                        { formik.touched.microorganismo_tipo && formik.errors.microorganismo_tipo ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.microorganismo_tipo}</p>
                            </div>
                        ) : null  }


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="microorganismo_nombre">
                                Nombre del Microorganismo
                            </label>

                            < AsignarMicroorganismo/>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="susceptibilidad">
                                Susceptibilidad
                            </label>
                            <select 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="susceptibilidad"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.susceptibilidad}
                            >
                                <option value="" label="Seleccione una opción" />
                                <option value="Sensible" label="Sensible" />
                                <option value="BLEE" label="BLEE" />
                                <option value="MDR" label="MDR" />
                                <option value="XDR" label="XDR" />
                            </select>
                        </div>
        
                        { formik.touched.susceptibilidad && formik.errors.susceptibilidad ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.susceptibilidad}</p>
                            </div>
                        ) : null  }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comentario_uveh">
                                Comentario UVEH
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="comentario_uveh"
                                type="text"
                                placeholder="Comentario UVEH"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.comentario_uveh}
                            />
                        </div>

                        { formik.touched.comentario_uveh && formik.errors.comentario_uveh ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.comentario_uveh}</p>
                            </div>
                        ) : null  }

                        {/* <AsignarCamaTodas />  */}     
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Agregar Microorganismo"
                        />
                    </form>
                </div>
            </div>
            {mensaje && mostrarMensaje()}
        </Layout>
     );
}
 
export default NuevoMicroorganismo;