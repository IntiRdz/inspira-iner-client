import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';

import { OBTENER_PACIENTE } from '../../graphql/queries';
import PacienteRenglon from '../../components/pacientes/PacienteRenglon';
import MicroPaciente from '../../components/pacientes/MicroPaciente';
import MicroNuevo from '../../components/pacientes/MicroNuevo';



const Editar = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_PACIENTE, {
        variables: { id }
    });

    const [newMicro, setNewMicro] = useState(false);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Ha ocurrido un error</p>;



    return ( 
        
        <Layout>

                <div className="w-full mb-3 w-lg">  
                    <PacienteRenglon obtenerPaciente ={data.obtenerPaciente}/>      
                </div>
               
                {/* Microorganismos del Paciente  */}
                <div className="w-full w-lg">  
                    <MicroPaciente obtenerPaciente ={data.obtenerPaciente}/>      
                </div>

                <div className="w-full max-w-4xl">  
                    <button
                        type="button"
                        onClick={() => setNewMicro(!newMicro)}
                        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                        >
                        {newMicro ? 'Ocultar' : 'Agregar Microorganismo'}
                    </button>
                </div>

                {/* Nuevo Microorganismo  */}
                <div className="w-full w-lg">              
                    {newMicro && <MicroNuevo obtenerPaciente ={data.obtenerPaciente}/>}

                </div>


            


            
        </Layout>
     );
}
 
export default Editar;