import { gql } from '@apollo/client';



export const FRAGMENTO_CAMA = gql`
  fragment FragmentoCama on Cama {
    id
    cama_numero
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
  }
`;

export const FRAGMENTO_MICROORGANISMO = gql`
  fragment FragmentoMicroorganismo on Microorganismo {
    id
    fecha_deteccion
    metodo_deteccion
    microorganismo_tipo
    microorganismo_nombre
    susceptibilidad
    comentario_uveh
    antibiotico_relacionado {
      id
      antibiotico_nombre
      antibiotico_comentario
      antibiotico_inicio
      antibiotico_fin
    }
  }
`;


export const FRAGMENTO_ANTIBIOTICO = gql`
  fragment FragmentoAntibiotico on Antibiotico {
    id
    fecha_deteccion
    metodo_deteccion
    microorganismo_tipo
    microorganismo_nombre
    susceptibilidad
    comentario_uveh
    antibiotico_relacionado {
      id
      antibiotico_nombre
      antibiotico_comentario
      antibiotico_inicio
      antibiotico_fin
    }
  }
`;




