import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';


import { Formik } from 'formik';
import Swal from 'sweetalert2';

import PacienteContext from '../../context/pacientes/PacienteContext';
import { AsignarCama } from '../../components/forms/AsignarCama';

import { OBTENER_PACIENTE, OBTENER_PACIENTES, OBTENER_CAMAS_DISPONIBLES } from '../../graphql/queries';
import { ACTUALIZAR_PACIENTE } from '../../graphql/mutations';
import PacienteRenglon2 from '../../components/pacientes/PacienteRenglon2';
import ClinicoAll from '../../components/camas/ClinicoAll';
import ClinicoAllNo0Simple from '../../components/camas/ClinicoAllNo0Simple';

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


<div className="w-full w-lg mt-4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">  
    <div style={{ position: 'sticky', top: '0px', zIndex: '1000' }}>
        <PacienteRenglon2 obtenerPaciente ={data.obtenerPaciente}/>
    </div> 
</div>
    <div className="flex justify-center w-full mt-2">

        <div className="w-lg">


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
                            {/* Renderizar AsignarCama si el estado es true */}
                            {mostrarAsignarCama && <AsignarCama 
                            
                            
                            
                            
                            />}  

                            <input
                            type="submit"
                            className="bg-gray-800  mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 rounded"
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
        <ClinicoAllNo0Simple />
    </div>



    
</Layout>
     );
}
 
export default NewBed;
