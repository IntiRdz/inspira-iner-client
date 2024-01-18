import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';

import { OBTENER_PACIENTE } from '../../graphql/queries';
import PacienteRenglon from '../../components/pacientes/PacienteRenglon';
import PacienteTraslados from '../../components/pacientes/PacienteTraslados';

import PacienteEditar from '../../components/pacientes/PacienteEditar';

import PacienteMicroorganismos from '../../components/pacientes/PacienteMicroorganismos';
import MicroNuevo from '../../components/microorganismos/MicroNuevo';
import MicroEditar from '../../components/microorganismos/MicroEditar';

import DiagnosticosPaciente from '../../components/pacientes/DiagnosticosPaciente';
import DiagnosticoNuevo from '../../components/diagnosticos/DiagnosticoNuevo';
import DiagnosticoEditar from '../../components/diagnosticos/DiagnosticoEditar';




const Editar = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_PACIENTE, {
        variables: { id }
    });
    console.log("data", data);

    const [editPx, setEditPx] = useState(false);

    const [newMicro, setNewMicro] = useState(false);
    const [microorganismoActual, setMicroorganismoActual] = useState(null);
    const [editMicro, setEditMicro] = useState(false);

    const [newDx, setNewDx] = useState(false);
    const [diagnosticoActual, setDiagnosticoActual] = useState(null);
    const [editDx, setEditDx] = useState(false);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Ha ocurrido un error</p>;

    return ( 
        
        <Layout>
                <div className="w-full mb-3 w-lg">  
                    <PacienteRenglon obtenerPaciente ={data.obtenerPaciente} onEdit={() => setEditPx(true)}/>
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
                        <PacienteMicroorganismos obtenerPaciente={data.obtenerPaciente} onEdit={microorganismo => {
                            setMicroorganismoActual(microorganismo);
                            setEditMicro(true);
                        }}/>
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
                    <DiagnosticosPaciente obtenerPaciente ={data.obtenerPaciente} onEdit={diagnostico => {
                            setDiagnosticoActual(diagnostico);
                            setEditDx(true);
                    }}/>      
                </div>

                {/* Editar Paciente  */}
                <div className="w-full w-lg">              
                    {editPx && <PacienteEditar obtenerPaciente={data.obtenerPaciente} isOpen={editPx} onClose={() => setEditPx(false)}/>}

                </div>


                {/* Nuevo Microorganismo  */}
                <div className="w-full w-lg">              
                    {newMicro && <MicroNuevo obtenerPaciente ={data.obtenerPaciente} isOpen={newMicro} onClose={() => setNewMicro(false)} />}

                </div>

                {/* Editar Microorganismo  */}
                <div className="w-full w-lg">              
                    {editMicro && <MicroEditar microorganismo={microorganismoActual} obtenerPaciente={data.obtenerPaciente} isOpen={editMicro} onClose={() => setEditMicro(false)}/>}

                </div>

                {/* Nuevo Diagnóstico */}
                <div className="w-full w-lg">              
                    {newDx && <DiagnosticoNuevo obtenerPaciente = {data.obtenerPaciente} isOpen={newDx} onClose={() => setNewDx(false)}/>}

                </div>

                {/* Editar Diagnóstico  */}
                <div className="w-full w-lg">              
                    {editDx && <DiagnosticoEditar diagnostico={diagnosticoActual} obtenerPaciente={data.obtenerPaciente} isOpen={editDx} onClose={() => setEditDx(false)}/>}

                </div>


            


            
        </Layout>
     );
}
 
export default Editar;