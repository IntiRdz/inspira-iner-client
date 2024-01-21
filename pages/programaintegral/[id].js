import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';

import { OBTENER_ADMISION } from '../../graphql/queries';
import PacienteRenglon from '../../components/pacientes/PacienteRenglon';
import DiagnosticosPaciente from '../../components/pacientes/DiagnosticosPaciente';
import PdfPacPrograma from '../../components/programa/PdfPacPrograma';

import ProgramaEditar from '../../components/programas/ProgramaEditar';
import ProgramaEditarPaliativos from '../../components/programas/ProgramaEditarPaliativos';
import ProgramaEditarSuenio from '../../components/programas/ProgramaEditarSuenio';
import ProgramaEditarNutricion from '../../components/programas/ProgramaEditarNutricion';
import ProgramaEditarSocial from '../../components/programas/ProgramaEditarSocial';


import CardDiscapacidad from '../../components/cards/CardDiscapacidad';
import CardPaliativos from '../../components/cards/CardPaliativos';
import CardSuenio from '../../components/cards/CardSuenio';
import CardNutricion from '../../components/cards/CardNutricion';
import CardSocial from '../../components/cards/CardSocial';



export default function ProgramaPage () {

    const [editProgram, setEditProgram] = useState(false);
    const [editProgramPaliativos, setEditProgramPaliativos] = useState(false);
    const [editProgramSuenio, setEditProgramSuenio] = useState(false);
    const [editProgramNutri, setEditProgramNutri] = useState(false);
    const [editProgramSocial, setEditProgramSocial] = useState(false);

    const router = useRouter();
    const { query: { id } } = router;

    console.log("ID de busqueda del router",id)

    const { data, loading, error } = useQuery(OBTENER_ADMISION, {
        variables: { id }
    });

    
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Ha ocurrido un error</p>;

    console.log("Data del ID de busqueda obtener admision",data)

    const { programaintegral, diagnostico, paciente_relacionado } = data.obtenerAdmision;
        // Ahora puedes usar 'programaintegral' aquí

    const admonId = data.obtenerAdmision.id;

    //console.log("data ObtenerAdmision",data)
    console.log("Programa Desde pagina [id]",programaintegral);
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
                <button
                    type="button"
                    onClick={() => setEditProgramSuenio(true)}  
                    className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                    Sueño
                </button>  
                <button
                    type="button"
                    onClick={() => setEditProgramNutri(true)}  
                    className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                    Nutrición
                </button>   
                <button
                    type="button"
                    onClick={() => setEditProgramSocial(true)}  
                    className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                    Social
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
           
                {editProgramPaliativos && <ProgramaEditarPaliativos 
                    admonId={id}
                    paciente  = {paciente_relacionado}
                    programaintegral = {programaintegral}
                    diagnostico  = {diagnostico}
                    isOpen={editProgramPaliativos} 
                    onClose={() => setEditProgramPaliativos(false)}
                />}

                {editProgramSuenio && <ProgramaEditarSuenio
                    admonId={id}
                    paciente  = {paciente_relacionado}
                    programaintegral = {programaintegral}
                    diagnostico  = {diagnostico}
                    isOpen={editProgramSuenio} 
                    onClose={() => setEditProgramSuenio(false)}
                />}
                {editProgramNutri && <ProgramaEditarNutricion
                    admonId={id}
                    paciente  = {paciente_relacionado}
                    programaintegral = {programaintegral}
                    diagnostico  = {diagnostico}
                    isOpen={editProgramNutri} 
                    onClose={() => setEditProgramNutri(false)}
                />}
                {editProgramSocial && <ProgramaEditarSocial
                    admonId={id}
                    paciente  = {paciente_relacionado}
                    programaintegral = {programaintegral}
                    diagnostico  = {diagnostico}
                    isOpen={editProgramSocial} 
                    onClose={() => setEditProgramSocial(false)}
                />}

            </div> 

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">


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

            <CardSuenio 
                programa_suenio_imc={programaintegral.programa_suenio_imc}
                programa_suenio_hipoventilacion={programaintegral.programa_suenio_hipoventilacion}
                programa_suenio_restriccionTorax={programaintegral.programa_suenio_restriccionTorax}
                programa_suenio_neuromuscular={programaintegral.programa_suenio_neuromuscular}
            />

            <CardNutricion 
                programa_nutricion_puntuacion={programaintegral.programa_nutricion_puntuacion}
                programa_nutricion_grupoRiesgo={programaintegral.programa_nutricion_grupoRiesgo}
                programa_nutricion_via={programaintegral.programa_nutricion_via}
            />

            <CardSocial 
                programa_social_grupo_etario={programaintegral.programa_social_grupo_etario}
                programa_social_genero={programaintegral.programa_social_genero}
                programa_social_orientacion_sexual={programaintegral.programa_social_orientacion_sexual}
                programa_social_municipio={programaintegral.programa_social_municipio}
                programa_social_estado={programaintegral.programa_social_estado}
                programa_social_pais={programaintegral.programa_social_pais}
                programa_social_zona_marginada={programaintegral.programa_social_zona_marginada}
                programa_social_condicion_social={programaintegral.programa_social_condicion_social}
                programa_social_deficit_economico={programaintegral.programa_social_deficit_economico}
                programa_social_migrante={programaintegral.programa_social_migrante}
                programa_social_abandono_social={programaintegral.programa_social_abandono_social}
                programa_social_situacion_calle={programaintegral.programa_social_situacion_calle}
                programa_social_red_apoyo={programaintegral.programa_social_red_apoyo}
                programa_social_tipo_familia={programaintegral.programa_social_tipo_familia}
                programa_social_idioma={programaintegral.programa_social_idioma}
                programa_social_lengua_indigena={programaintegral.programa_social_lengua_indigena}
                programa_social_discapacidad_cdpd={programaintegral.programa_social_discapacidad_cdpd}
                programa_social_escolaridad={programaintegral.programa_social_escolaridad}
                programa_social_ocupacion={programaintegral.programa_social_ocupacion}
                programa_social_derechohabiencia={programaintegral.programa_social_derechohabiencia}
                programa_social_religion={programaintegral.programa_social_religion}
                programa_social_limitada={programaintegral.programa_social_limitada}
                programa_social_violencia={programaintegral.programa_social_violencia}
                programa_social_caso_medicolegal={programaintegral.programa_social_caso_medicolegal}
                programa_social_mater={programaintegral.programa_social_mater}
                programa_social_riesgos_vivienda={programaintegral.programa_social_riesgos_vivienda}
                programa_social_vivienda_tipo={programaintegral.programa_social_vivienda_tipo}
                programa_social_vivienda_material={programaintegral.programa_social_vivienda_material}
                programa_social_vivienda_servicios={programaintegral.programa_social_vivienda_servicios}
                programa_social_vivienda_cuartos={programaintegral.programa_social_vivienda_cuartos}
                programa_social_vivienda_personas={programaintegral.programa_social_vivienda_personas}
                programa_social_vivienda_hacinamiento={programaintegral.programa_social_vivienda_hacinamiento}
                programa_social_vivienda_atencion_alarma={programaintegral.programa_social_vivienda_atencion_alarma}
                programa_social_dispositivo_medicos={programaintegral.programa_social_dispositivo_medicos}
                programa_social_animales={programaintegral.programa_social_animales}
                programa_social_animales_tipo={programaintegral.programa_social_animales_tipo}
                programa_social_lenia={programaintegral.programa_social_lenia}
                programa_social_trabajo_riesgos={programaintegral.programa_social_trabajo_riesgos}
                programa_social_barreras_aprendizaje={programaintegral.programa_social_barreras_aprendizaje}
                programa_social_exposicion_sustancias={programaintegral.programa_social_exposicion_sustancias}
                programa_social_exposicion_sustancias_anios={programaintegral.programa_social_exposicion_sustancias_anios}
                programa_social_exposicion_sustancias_horas={programaintegral.programa_social_exposicion_sustancias_horas}
            />
        </div> 
        </Layout>
     );

}