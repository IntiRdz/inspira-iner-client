import { gql } from '@apollo/client';



export const FRAGMENTO_CAMA = gql`
  fragment FragmentoCama on Cama {
    id
    cama_numero
    cama_orden
    cama_compartida
    cama_lado
    cama_ubicacion
    cama_prioridad
    cama_disponible
    cama_ocupada
    cama_genero
    cama_dispositivo_o2
    cama_hemodialisis
    cama_aislamiento
    cama_dan
    cama_codigo_uveh
  }
`;

export const FRAGMENTO_CAMA_HISTORIAL = gql`
  fragment FragmentoCamaHistorial on CamaHistorial {
    id
    fecha_traslado
  }
`;

export const FRAGMENTO_ADMISION = gql`
  fragment FragmentoAdmision on Admision {
    id
    fecha_ingreso
    fecha_prealta
    fecha_egreso
    hospitalizado
    servicio_tratante
  }
`;


export const FRAGMENTO_PACIENTE = gql`
  fragment FragmentoPaciente on Paciente {
    id
    expediente
    pac_apellido_paterno
    pac_apellido_materno
    pac_nombre
    pac_genero
    pac_FN
    pac_dispositivo_o2
    pac_hemodialisis
    diagnostico
    diagnostico1
    caracteristicas_especiales
    pac_codigo_uveh
    pac_aislamiento
  }
`;

export const FRAGMENTO_MICROORGANISMO = gql`
  fragment FragmentoMicroorganismo on Microorganismo {
    id
    fecha_deteccion
    metodo_deteccion
    microorganismo_tipo
    microorganismo_nombre
    microorganismo_muestra_resultado
    microorganismo_muestra_tipo
    fecha_ultima_revision
    susceptibilidad
    comentario_uveh
  }
`;


export const FRAGMENTO_ANTIBIOTICO = gql`
  fragment FragmentoAntibiotico on Antibiotico {
    id
    antibiotico_nombre
    antibiotico_comentario
    antibiotico_inicio
    antibiotico_fin
  }
`;

export const FRAGMENTO_DIAGNOSTICO = gql`
  fragment FragmentoDiagnostico on Diagnostico {
    id
    fecha_diagnostico
    fecha_resolucion
    diagnostico_nombre
    diagnostico_tipo
    diagnostico_activo
  }
`;


export const FRAGMENTO_PROGRAMA_INTEGRAL = gql`
  fragment FragmentoProgramaIntegral on ProgramaIntegral {
    id
    programa_discapacidad_hipoacusia
    programa_discapacidad_disminucion_visual
    programa_discapacidad_perdida_barthel
    programa_discapacidad_disminucion_cognitiva
    programa_discapacidad_gds_fast
    programa_discapacidad_nu_desc
    programa_paliativos_sorpresa
    programa_paliativos_perdida_funcionalidad
    programa_paliativos_perdida_nutricional
    programa_paliativos_multimorbilidad
    programa_paliativos_recursosOingresos
    programa_paliativos_otraEnfermedaAvanzada
    programa_paliativos_total
    programa_paliativos_ecog
    
    preguntas_contestadas
  }
`;




