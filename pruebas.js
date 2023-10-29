import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import PacienteContext from '../../context/pacientes/PacienteContext';
import { AsignarCama } from '../../components/pacientes/AsignarCama';



const ACTUALIZAR_PACIENTE = gql`
    mutation actualizarPaciente($id: ID!, $input: PacienteInput) {
        actualizarPaciente(id: $id, input: $input) {
            expediente
            pac_apellido_paterno
            pac_apellido_materno

        }
    }
`;

const EditarPaciente = () => {

    const router = useRouter();
    const { query: { id } } = router;
    
    // Mensaje de alerta
    const [mensajeError, setMensajeError] = useState(null);

    // Consultar para obtener el paciente
    const { data, loading, error } = useQuery(OBTENER_PACIENTE, {
        variables: {
            id:id
        }
    });

    const { cama } = useContext(PacienteContext);
    //console.log("Valor de id.cama desde el contexto:", cama);
    
    const { data: pacientesData, loading: pacientesLoading, error: pacientesError } = useQuery(OBTENER_PACIENTES);
    
    
    // Mutation para modificar al paceinte
    const [actualizarPaciente] = useMutation(ACTUALIZAR_PACIENTE, {
        update(cache, { data: { actualizarPaciente } }) {
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
                    obtenerPacientes: [...obtenerPacientes, actualizarPaciente]
                }
            });
        },
    });

    // Schema de validacion
    const schemaValidacion = Yup.object({
        expediente: Yup.string().required('El expediente del paciente es obligatorio'),
        pac_apellido_paterno: Yup.string().required('El apellido paterno del paciente es obligatorio'),
        pac_apellido_materno: Yup.string().required('El apellido materno del paciente es obligatorio'),
    });

    if(loading) return 'Cargando...';
    
    const { obtenerPaciente } = data;
    //console.log("Data de Obtener Paciente",obtenerPaciente)

    const valoresIniciales = {
        expediente: obtenerPaciente.expediente ,
        pac_apellido_paterno: obtenerPaciente.pac_apellido_paterno,
        pac_apellido_materno: obtenerPaciente.pac_apellido_materno,

    };


    // Modifica el paciente en la BD
    const actualizarInfoPaciente = async valores => {
        const { 
            expediente,
            pac_apellido_paterno,
            pac_apellido_materno,
        } = valores;

        //console.log("Valores Inciales:", valores)

        const valoresActualizados = {
            expediente,
            pac_apellido_paterno,
            pac_apellido_materno,
        };

        console.log("Valores actualizados:", valoresActualizados)

        try {
            const { data} = await actualizarPaciente({
                variables: {
                    id,
                    input: valoresActualizados
                }
            });

            console.log("Después de la llamada a actualizarPaciente");

            // Mostrar Alerta
            Swal.fire(
                'Actualizado',
                'El paciente se actualizó correctamente',
                'success'
            )

            // Redireccionar
            router.push('/');
            
        } catch (error) {
            console.error("Error durante la llamada a actualizarPaciente:", error);

            setMensajeError(error.message.replace('GraphQL error: ', ''));
            setTimeout(() => {
                setMensajeError(null);
            }, 5000);
        }
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Paciente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ valoresIniciales }
                        onSubmit={ ( valores ) => {
                            actualizarInfoPaciente(valores)
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expediente">
                                    Expediente
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="expediente"
                                    type="text"
                                    placeholder="Expediente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.expediente}
                                />
                            </div>

                            { props.touched.expediente && props.errors.expediente ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.expediente}</p>
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
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.pac_apellido_paterno}
                                />
                            </div>

                            { props.touched.pac_apellido_paterno && props.errors.pac_apellido_paterno ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.pac_apellido_paterno}</p>
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
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.pac_apellido_materno}
                                />
                            </div>

                            { props.touched.pac_apellido_materno && props.errors.pac_apellido_materno ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.pac_apellido_materno}</p>
                                </div>
                            ) : null  }

                            <AsignarCama />   

                            <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Paciente"
                        />
                        </form>
                        )
                    }}
                    </Formik>
                </div>
            </div>
        </Layout>
     );
}
 
export default EditarPaciente;