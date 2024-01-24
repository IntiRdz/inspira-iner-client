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
    fecha_creado
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

    programa_suenio_imc
    programa_suenio_hipoventilacion
    programa_suenio_restriccionTorax
    programa_suenio_neuromuscular

    programa_nutricion_puntuacion
    programa_nutricion_grupoRiesgo
    programa_nutricion_via

    programa_social_grupo_etario
    programa_social_genero
    programa_social_orientacion_sexual
    programa_social_municipio
    programa_social_estado
    programa_social_pais
    programa_social_zona_marginada
    programa_social_condicion_social
    programa_social_deficit_economico
    programa_social_migrante
    programa_social_abandono_social
    programa_social_situacion_calle
    programa_social_red_apoyo
    programa_social_tipo_familia
    programa_social_idioma
    programa_social_lengua_indigena
    programa_social_discapacidad_cdpd
    programa_social_escolaridad
    programa_social_ocupacion
    programa_social_derechohabiencia
    programa_social_religion
    programa_social_limitada
    programa_social_violencia
    programa_social_caso_medicolegal
    programa_social_mater
    programa_social_riesgos_vivienda
    programa_social_vivienda_tipo
    programa_social_vivienda_material
    programa_social_vivienda_servicios
    programa_social_vivienda_cuartos
    programa_social_vivienda_personas
    programa_social_vivienda_hacinamiento
    programa_social_vivienda_atencion_alarma
    programa_social_dispositivo_medicos
    programa_social_animales
    programa_social_animales_tipo
    programa_social_lenia
    programa_social_trabajo_riesgos
    programa_social_barreras_aprendizaje
    programa_social_exposicion_sustancias
    programa_social_exposicion_sustancias_anios
    programa_social_exposicion_sustancias_horas

    
    preguntas_contestadas
  }
`;




