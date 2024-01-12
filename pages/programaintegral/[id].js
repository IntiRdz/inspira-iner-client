import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';

import { OBTENER_PACIENTE } from '../../graphql/queries';
import PacienteRenglon from '../../components/pacientes/PacienteRenglon';
import DiagnosticosPaciente from '../../components/pacientes/DiagnosticosPaciente';
import PdfPacPrograma from '../../components/programa/PdfPacPrograma';



const Editar = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_PACIENTE, {
        variables: { id }
    });

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Ha ocurrido un error</p>;



    return ( 
        
        <Layout>

                <div className="w-full mb-3 w-lg">  
                    <PacienteRenglon obtenerPaciente ={data.obtenerPaciente}/>      
                </div>
               
                <div className="w-full w-lg">  
                    <DiagnosticosPaciente obtenerPaciente ={data.obtenerPaciente}/>      
                </div>
                <div className="w-full w-lg">  
                    <PdfPacPrograma obtenerPaciente ={data.obtenerPaciente}/>      
                </div> 



            


            
        </Layout>
     );
}
 
export default Editar;