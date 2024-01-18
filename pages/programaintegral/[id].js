import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';

import { OBTENER_ADMISION } from '../../graphql/queries';
import PacienteRenglon from '../../components/pacientes/PacienteRenglon';
import DiagnosticosPaciente from '../../components/pacientes/DiagnosticosPaciente';
import PdfPacPrograma from '../../components/programa/PdfPacPrograma';
import ProgramaEditar from '../../components/programas/ProgramaEditar';
import ProgramaPaliativosEditar from '../../components/programas/ProgramaPaliativosEditar';


import CardDiscapacidad from '../../components/cards/CardDiscapacidad';
import CardPaliativos from '../../components/cards/CardPaliativos';



export default function ProgramaPage () {

    const [editProgram, setEditProgram] = useState(false);
    const [editProgramPaliativos, setEditProgramPaliativos] = useState(false);

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_ADMISION, {
        variables: { id }
    });

    
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Ha ocurrido un error</p>;

    

    const { programaintegral, diagnostico, paciente_relacionado } = data.obtenerAdmision;
        // Ahora puedes usar 'programaintegral' aquí

    const admonId = data.obtenerAdmision.id;

    //console.log("data ObtenerAdmision",data)
    console.log("Programa 1",programaintegral);
    //console.log("Programa Preguntas contestadas",programaintegral.preguntas_contestadas); 
    //console.log("Diagnostico", diagnostico);
    //console.log("Paciente", paciente_relacionado);
    //console.log("ID admision", admonId);




    return ( 
        
        <Layout>

            <div className="w-full w-lg mt-4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">  
                <button
                    type="button"
                    onClick={() => setEditProgram(true)}  
                    className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                    Discapacidad
                </button>    
                <button
                    type="button"
                    onClick={() => setEditProgramPaliativos(true)}  
                    className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                    Paliativos
                </button>    
            </div>

            <div className="w-full w-lg">              
                {editProgram && <ProgramaEditar 
                    admonId={id}
                    paciente  = {paciente_relacionado}
                    programaintegral = {programaintegral}
                    diagnostico  = {diagnostico}
                    isOpen={editProgram} 
                    onClose={() => setEditProgram(false)}
                />}
           
                {editProgramPaliativos && <ProgramaPaliativosEditar 
                    admonId={id}
                    paciente  = {paciente_relacionado}
                    programaintegral = {programaintegral}
                    diagnostico  = {diagnostico}
                    isOpen={editProgramPaliativos} 
                    onClose={() => setEditProgramPaliativos(false)}
                />}

            </div> 

            <CardDiscapacidad 
                programa_discapacidad_hipoacusia={programaintegral.programa_discapacidad_hipoacusia}
                programa_discapacidad_disminucion_visual={programaintegral.programa_discapacidad_disminucion_visual}
                programa_discapacidad_perdida_barthel={programaintegral.programa_discapacidad_perdida_barthel}
                programa_discapacidad_disminucion_cognitiva={programaintegral.programa_discapacidad_disminucion_cognitiva}
                programa_discapacidad_gds_fast={programaintegral.programa_discapacidad_gds_fast}
                programa_discapacidad_nu_desc={programaintegral.programa_discapacidad_nu_desc}
            
            
            />

            <CardPaliativos 
                programa_paliativos_sorpresa={programaintegral.programa_paliativos_sorpresa}
                programa_paliativos_perdida_funcionalidad={programaintegral.programa_paliativos_perdida_funcionalidad}
                programa_paliativos_perdida_nutricional={programaintegral.programa_paliativos_perdida_nutricional}
                programa_paliativos_multimorbilidad={programaintegral.programa_paliativos_multimorbilidad}
                programa_paliativos_recursosOingresos={programaintegral.programa_paliativos_recursosOingresos}
                programa_paliativos_otraEnfermedaAvanzada={programaintegral.programa_paliativos_otraEnfermedaAvanzada}
                programa_paliativos_total={programaintegral.programa_paliativos_total}
                programa_paliativos_ecog={programaintegral.programa_paliativos_ecog}
            
            />
        </Layout>
     );

}