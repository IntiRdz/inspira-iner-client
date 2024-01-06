import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';

import {differenceInYears, differenceInDays, isTomorrow } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'; 

import { Formik } from 'formik';
import Swal from 'sweetalert2';

import PacienteContext from '../../context/pacientes/PacienteContext';
import { AsignarCama } from '../../components/forms/AsignarCama';
import ReactCamaDispHombre from '../../components/tablas/ReactCamaDispHombre';
import ClinicoAllSimple from '../../components/camas/ClinicoAllSimple';
import ReactCamaDispMujer from '../../components/tablas/ReactCamaDispMujer';

//import CamasDisponiblesHombre from '../../components/camas/CamasDisponiblesHom';
//import CamasDisponiblesMujer from '../../components/camas/CamasDisponiblesMujer';
import { OBTENER_PACIENTE, OBTENER_PACIENTES } from '../../graphql/queries';
import { ACTUALIZAR_PACIENTE } from '../../graphql/mutations';
import PacienteRenglon from '../../components/pacientes/PacienteRenglon';

const timeZone = 'America/Mexico_City'; // Definir la zona horaria



const NewBed = () => {

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

    //console.log("data",data)

    const { cama } = useContext(PacienteContext);
    console.log("Valor de id.cama del contexto:", cama);
    

    const [mostrarAsignarCama, setMostrarAsignarCama] = useState(false);
    const [mostrarCamasMujeres, setMostrarCamasMujeres] = useState(false);
    const [mostrarCamasHombres, setMostrarCamasHombres] = useState(false);
    const [mostrarPacientes, setMostrarPacientes] = useState(false);

    const { data: pacientesData, loading: pacientesLoading, error: pacientesError } = useQuery(OBTENER_PACIENTES);
    

    const calcularEdad = fechaNacimiento => {
        if (!fechaNacimiento) return '';
        const fechaNacZoned = utcToZonedTime(new Date(fechaNacimiento), timeZone);
        return differenceInYears(new Date(), fechaNacZoned);
      };
    
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


    if(loading) return 'Cargando...';
    
    const { obtenerPaciente } = data;
    console.log("obtenerPaciente", data);

    const ultimaAdmision = obtenerPaciente.admision_relacionada?.slice(-1)[0] || null;
    const camaActual = ultimaAdmision?.cama_relacionada?.slice(-1)[0]?.cama_numero || null;
    

    console.log(obtenerPaciente.expediente)
    
    const initialValues  = {

        cama_relacionada: camaActual
    };
    
    // Modifica el paciente en la BD
    const actualizarInfoPaciente = async valores => {
        const { 
        } = valores;

        //console.log("Valores Inciales:", valores)

        const valoresActualizados = {

        };
        // Si se muestra el componente childData y hay una cama asignada, incluir en los valores actualizados
        if (mostrarAsignarCama && cama) {
            valoresActualizados.cama_relacionada = cama;
        }

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
            router.push('/camas');
            
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
            <PacienteRenglon obtenerPaciente ={data.obtenerPaciente}/>
            
            <div className="flex justify-center mt-2">
                
                <div className="w-full max-w-6xl">

                <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={ ( valores ) => {
                            actualizarInfoPaciente(valores)
                        }}
                    >

                    {props => {
                    // console.log(props);
                    return (
                        <form
                        className="bg-white shadow-md mt-2"
                        onSubmit={props.handleSubmit}
                        >
                        <div className="form-row p-4"> 
                            {/* Botón para mostrar/ocultar AsignarCama */}
                            <button
                                type="button"
                                onClick={() => setMostrarAsignarCama(!mostrarAsignarCama)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                {mostrarAsignarCama ? 'Misma Cama' : 'Cambiar Cama'}
                            </button>
                            <a>  Cama Actual:  {camaActual} </a>
                            {/* Renderizar AsignarCama si el estado es true */}
                            {mostrarAsignarCama && <AsignarCama />}  

                            <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Actualizar Paciente"
                        />
                 
                    </div>
                        </form>
                        )
                    }}
                    </Formik>

                </div>
            </div>



            <div className="flex justify-center ">        
                <div className="w-full max-w-4xl">
                    <div className="flex justify-center"> {/* Contenedor para centrar el botón */}
                        <button
                            type="button"
                            onClick={() => setMostrarCamasMujeres(!mostrarCamasMujeres)}
                            className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                        >
                            {mostrarCamasMujeres ? 'Ocultar Camas Mujeres' : 'Camas Disponibles Mujeres'}
                        </button>
                   
                        <button
                            type="button"
                            onClick={() => setMostrarCamasHombres(!mostrarCamasHombres)}
                            className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                            >
                            {mostrarCamasHombres ? 'Ocultar Camas Hombres' : 'Camas Disponibles Hombres'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setMostrarPacientes(!mostrarPacientes)}
                            className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                            >
                            {mostrarPacientes ? 'Ocultar Pacientes' : 'Pacientes'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-row ">
                <div className="w-2/6 mr-2 bg-white p-1 border border-gray-300 shadow-lg rounded-lg">
                    {/* Columna 1 */}
                    {mostrarCamasHombres && <ReactCamaDispHombre />}
                    {mostrarCamasMujeres && <ReactCamaDispMujer/>}
                    {/* {mostrarCamasMujeres && <CamasDisponiblesMujer />} */}
                </div>

                <div className="w-4/6">
                    {/* Columna 2 */}
                    {mostrarPacientes && <ClinicoAllSimple />}
                    {/* {mostrarCamasHombres && <CamasDisponiblesHombre />} */}
                </div>
            </div>

            
        </Layout>
     );
}
 
export default NewBed;
