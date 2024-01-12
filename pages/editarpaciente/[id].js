import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';

import { OBTENER_PACIENTE } from '../../graphql/queries';
import PacienteRenglon from '../../components/pacientes/PacienteRenglon';
import PacienteMicroorganismos from '../../components/pacientes/PacienteMicroorganismos';
import MicroNuevo from '../../components/microorganismos/MicroNuevo';
import DiagnosticosPaciente from '../../components/pacientes/DiagnosticosPaciente';
import DiagnosticoNuevo from '../../components/diagnosticos/DiagnosticoNuevo';
import PacienteTraslados from '../../components/pacientes/PacienteTraslados';


const Editar = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_PACIENTE, {
        variables: { id }
    });

    const [newMicro, setNewMicro] = useState(false);
    const [newDx, setNewDx] = useState(false);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Ha ocurrido un error</p>;



    return ( 
        
        <Layout>
                <div className="w-full mb-3 w-lg">  
                    <PacienteRenglon obtenerPaciente ={data.obtenerPaciente}/>      
                </div>


                <div className="flex w-full">
                    <div className="w-1/4 mr-4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2"> {/* 40% del ancho */}  
                        <PacienteTraslados obtenerPaciente ={data.obtenerPaciente}/>      
                    </div>

                    <div className="w-3/4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2"> {/* 60% del ancho */} 
                        <button
                            type="button"
                            onClick={() => setNewMicro(true)}
                            className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                            >
                            Agregar Microorganismo
                        </button>
                        <PacienteMicroorganismos obtenerPaciente ={data.obtenerPaciente}/>      
                    </div>

                </div>




                <div className="w-full w-lg mt-4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">  
                <button
                        type="button"
                        onClick={() => setNewDx(true)}  // Cambiado para solo abrir el modal
                        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                    >
                        Agregar Diagnósticos
                    </button>
                    <DiagnosticosPaciente obtenerPaciente ={data.obtenerPaciente}/>      
                </div>


                {/* Nuevo Microorganismo  */}
                <div className="w-full w-lg">              
                    {newMicro && <MicroNuevo obtenerPaciente ={data.obtenerPaciente} isOpen={newMicro} onClose={() => setNewMicro(false)}/>}

                </div>
                {/* Nuevo Diagnóstico */}
                <div className="w-full w-lg">              
                    {newDx && <DiagnosticoNuevo obtenerPaciente = {data.obtenerPaciente} isOpen={newDx} onClose={() => setNewDx(false)}/>}

                </div>


            


            
        </Layout>
     );
}
 
export default Editar;