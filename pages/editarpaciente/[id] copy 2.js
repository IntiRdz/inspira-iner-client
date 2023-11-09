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
import CamasDisponiblesHombre from '../../components/camas/CamasDisponiblesHom';
import CamasDisponiblesMujer from '../../components/camas/CamasDisponiblesMujer';

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
    query ObtenerPaciente($id: ID!) {
        obtenerPaciente(id: $id) {
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
            fecha_ingreso
            fecha_prealta
            fecha_egreso
            hospitalizado
        }
    }
`;

const ACTUALIZAR_PACIENTE = gql`
    mutation actualizarPaciente($id: ID!, $input: PacienteInput) {
        actualizarPaciente(id: $id, input: $input) {
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
    
    const [mostrarAsignarCama, setMostrarAsignarCama] = useState(false);

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
        expediente: Yup.string()
        .required('El expediente del paciente es obligatorio')
        .matches(/^[a-zA-Z0-9]{6,9}$/, 'El expediente debe tener entre 6 y 8 caracteres alfanuméricos'),
        pac_apellido_paterno: Yup.string().required('El apellido paterno del paciente es obligatorio'),
        pac_apellido_materno: Yup.string().required('El apellido materno del paciente es obligatorio'),
        pac_nombre: Yup.string().required('El nombre del paciente es obligatorio'),
        pac_genero: Yup.string().oneOf(['Hombre', 'Mujer']).required('El género del paciente es obligatorio'),
        pac_FN: Yup.date(),
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
        caracteristicas_especiales:  Yup.array()
        .min(0, 'Seleccione una catecteristica especial del paciente')
        .of(
            Yup.string().oneOf([
            'TrasladoDeHospital',
            'InfeccionReciente',
            'Embarazo',
            'Inmunosupresion',
            ])
        ),
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
        fecha_ingreso: Yup.date(),
        fecha_prealta: Yup.date(),
        fecha_egreso: Yup.date(),
        hospitalizado: Yup.boolean()

    });

    if(loading) return 'Cargando...';
    
    const { obtenerPaciente } = data;
    //console.log("Data de Obtener Paciente",obtenerPaciente)

    const valoresIniciales = {
        expediente: obtenerPaciente.expediente ,
        pac_apellido_paterno: obtenerPaciente.pac_apellido_paterno,
        pac_apellido_materno: obtenerPaciente.pac_apellido_materno,
        pac_nombre: obtenerPaciente.pac_nombre,
        pac_genero: obtenerPaciente.pac_genero,
        pac_FN: obtenerPaciente.pac_FN ? format(new Date(obtenerPaciente.pac_FN), 'yyyy-MM-dd') : '',
        pac_dispositivo_o2: obtenerPaciente.pac_dispositivo_o2,
        pac_hemodialisis: obtenerPaciente.pac_hemodialisis,
        diagnostico1: obtenerPaciente.diagnostico1 || [] ,
        diagnostico: obtenerPaciente.diagnostico ,
        caracteristicas_especiales: obtenerPaciente.caracteristicas_especiales || [] ,
        pac_codigo_uveh: obtenerPaciente.pac_codigo_uveh  || [], 
        fecha_ingreso: obtenerPaciente.fecha_ingreso  ? format(new Date(obtenerPaciente.fecha_ingreso), 'yyyy-MM-dd HH:mm') : '', // Si no hay fecha en las props, se establece como cadena vacía
        fecha_prealta: obtenerPaciente.fecha_prealta ? format(new Date(obtenerPaciente.fecha_prealta), 'yyyy-MM-dd') : '', // Si no hay fecha en las props, se establece como cadena vacía
        fecha_egreso: obtenerPaciente.fecha_egreso ? format(new Date(obtenerPaciente.fecha_egreso), 'yyyy-MM-dd') : '',
        hospitalizado: obtenerPaciente.hospitalizado,// Si no hay fecha en las props, se establece como cadena vacía
        cama_relacionada: obtenerPaciente.cama_relacionada
    };


    // Modifica el paciente en la BD
    const actualizarInfoPaciente = async valores => {
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
            caracteristicas_especiales,
            pac_codigo_uveh,
            fecha_ingreso,
            fecha_prealta,
            fecha_egreso,
            hospitalizado,
            cama_relacionada
        } = valores;

        //console.log("Valores Inciales:", valores)

        const valoresActualizados = {
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
            fecha_ingreso: fecha_ingreso === '' ? undefined : fecha_ingreso, // Si es cadena vacía, se envía undefined
            fecha_prealta: fecha_prealta === '' ? undefined : fecha_prealta, // Si es cadena vacía, se envía undefined
            fecha_egreso: fecha_egreso === '' ? undefined : fecha_egreso,
            hospitalizado,
            cama_relacionada: cama,
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
            }, 3000);
        }
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Paciente</h1>      
            <div className="flex justify-center mt-5">
            <div className="w-full max-w-3xl">

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
                        className="bg-white shadow-md w-full max-w-lg px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}
                        >


                            <div className="form-row">
                            <div className="form-column"> 


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


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_nombre">
                                    Nombre
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_nombre"
                                    type="text"
                                    placeholder="Nombre Paciente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.pac_nombre}
                                />
                            </div>

                            { props.touched.pac_nombre && props.errors.pac_nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.pac_nombre}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_genero">
                                    Género
                                </label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_genero"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.pac_genero}
                                >
                                    <option value="" label="Seleccione un género" />
                                    <option value="Hombre" label="Hombre" />
                                    <option value="Mujer" label="Mujer" />
                                </select>
                            </div>

                            { props.touched.pac_genero && props.errors.pac_genero ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.pac_genero}</p>
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
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.pac_FN}
                                />
                            </div>

                            { props.touched.pac_FN && props.errors.pac_FN ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.pac_FN}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_dispositivo_o2">
                                    Dispositivo O2
                                </label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="pac_dispositivo_o2"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.pac_dispositivo_o2}
                                >
                                    <option value="" label="Seleccione un dispositivo" />
                                    <option value="AA" label="AA" />
                                    <option value="PN" label="PN" />
                                    <option value="PNAF" label="PNAF" />
                                    <option value="VMNI" label="VMNI" />
                                    <option value="VM" label="VM" />
                                </select>
                            </div>

                            { props.touched.pac_dispositivo_o2 && props.errors.pac_dispositivo_o2 ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.pac_dispositivo_o2}</p>
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
                                        onChange={() => props.setFieldValue("pac_hemodialisis", true)}
                                        onBlur={props.handleBlur}
                                        checked={props.values.pac_hemodialisis === true}
                                    />
                                    <label htmlFor="pac_hemodialisis_true">Sí</label>

                                    <input
                                        className="ml-4 mr-2 leading-tight"
                                        id="pac_hemodialisis_false"
                                        type="radio"
                                        onChange={() => props.setFieldValue("pac_hemodialisis", false)}
                                        onBlur={props.handleBlur}
                                        checked={props.values.pac_hemodialisis === false}
                                    />
                                    <label htmlFor="pac_hemodialisis_false">No</label>
                                </div>
                            </div>
                            <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico1">
                                Diagnósticos Generales
                            </label>
                            {[
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
                            ].map((option) => (
                                <label key={option} className="block">
                                <input
                                    type="checkbox"
                                    name="diagnostico1"
                                    value={option}
                                    onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = e.target.value;

                                    props.setFieldValue(
                                        'diagnostico1',
                                        isChecked
                                        ? [...props.values.diagnostico1, value]
                                        : props.values.diagnostico1.filter((val) => val !== value)
                                    );
                                    }}
                                    onBlur={props.handleBlur}
                                    checked={props.values.diagnostico1.includes(option)}
                                    className="mr-2"
                                />
                                {option}
                                </label>
                            ))}
                            </div>

                            </div>
                            <div className="form-column">


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico">
                                    Diagnóstico
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="diagnostico"
                                    type="text"
                                    placeholder="Diagnóstico"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.diagnostico}
                                />
                            </div>

                            

                            { props.touched.diagnostico && props.errors.diagnostico ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.diagnostico}</p>
                                </div>
                            ) : null  }



                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_codigo_uveh">
                                    Código UVEH
                                </label>
                                {[
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
                                    'SAMS',
                                ].map((option) => (
                                    <label key={option} className="block">
                                        <input
                                            type="checkbox"
                                            name="pac_codigo_uveh"
                                            value={option}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const value = e.target.value;

                                                props.setFieldValue(
                                                    'pac_codigo_uveh',
                                                    isChecked
                                                    ? [...props.values.pac_codigo_uveh, value]
                                                    : props.values.pac_codigo_uveh.filter((val) => val !== value)
                                                );
                                            }}
                                            onBlur={props.handleBlur}
                                            checked={props.values.pac_codigo_uveh.includes(option)}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>



                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_ingreso">
                                    Fecha de Ingreso
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fecha_ingreso"
                                    type="datetime-local"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.fecha_ingreso}
                                />
                            </div>

                            { props.touched.fecha_ingreso && props.errors.fecha_ingreso ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.fecha_ingreso}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_prealta">
                                    Fecha de Prealta
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fecha_prealta"
                                    type="datetime-local"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.fecha_prealta}
                                />
                            </div>

                            { props.touched.fecha_prealta && props.errors.fecha_prealta ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.fecha_prealta}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_egreso">
                                    Fecha de Egreso
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fecha_egreso"
                                    type="datetime-local"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.fecha_egreso}
                                />
                            </div>

                            { props.touched.fecha_egreso && props.errors.fecha_egreso ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.fecha_egreso}</p>
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
                                        onChange={() => props.setFieldValue("hospitalizado", true)}
                                        onBlur={props.handleBlur}
                                        checked={props.values.hospitalizado === true}
                                    />
                                    <label htmlFor="hospitalizado_true">Sí</label>

                                    <input
                                        className="ml-4 mr-2 leading-tight"
                                        id="hospitalizado_false"
                                        type="radio"
                                        onChange={() => props.setFieldValue("hospitalizado", false)}
                                        onBlur={props.handleBlur}
                                        checked={props.values.hospitalizado === false}
                                    />
                                    <label htmlFor="hospitalizado_false">No</label>
                                </div>
                            </div>
                            {/* Botón para mostrar/ocultar AsignarCama */}
                            <button
                                type="button"
                                onClick={() => setMostrarAsignarCama(!mostrarAsignarCama)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                {mostrarAsignarCama ? 'Misma Cama' : 'Cambiar Cama'}
                            </button>

                            {/* Renderizar AsignarCama si el estado es true */}
                            {mostrarAsignarCama && <AsignarCama />}  

                            <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Paciente"
                            />
                            </div>
                        </div>

                        
                        </form>
                        )
                    }}
                    </Formik>
                </div>
            </div>
                <CamasDisponiblesHombre />
                <CamasDisponiblesMujer />
        </Layout>
     );
}
 
export default EditarPaciente;