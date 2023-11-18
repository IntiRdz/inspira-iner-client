import { gql } from '@apollo/client';

export const OBTENER_PACIENTES = gql`
query ObtenerPacientes {
  obtenerPacientes {
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
    fecha_ingreso
    fecha_prealta
    fecha_egreso
    hospitalizado
    cama_relacionada {
      id
      cama_numero
      cama_compartida
      cama_disponible
      cama_ocupada
      cama_genero
      cama_dispositivo_o2
      cama_hemodialisis
      cama_aislamiento
      cama_dan
      cama_codigo_uveh
    }
    microorganismo_relacionado {
      id
      fecha_deteccion
      metodo_deteccion
      microorganismo_tipo
      microorganismo_nombre
      susceptibilidad
      comentario_uveh
    }
    antibiotico_relacionado {
      id
      antibiotico_nombre
      antibiotico_comentario
      antibiotico_inicio
      antibiotico_fin
    }
  }
}
`;

export const OBTENER_PACIENTES_HOSPITALIZADOS = gql`
query ObtenerPacientesHospitalizados {
  obtenerPacientesHospitalizados {
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
    fecha_ingreso
    fecha_prealta
    fecha_egreso
    hospitalizado
    cama_relacionada {
      id
      cama_numero
      cama_compartida
      cama_disponible
      cama_ocupada
      cama_genero
      cama_dispositivo_o2
      cama_hemodialisis
      cama_aislamiento
      cama_dan
      cama_codigo_uveh
    }
    microorganismo_relacionado {
      id
      fecha_deteccion
      metodo_deteccion
      microorganismo_tipo
      microorganismo_nombre
      susceptibilidad
      comentario_uveh
    }
    antibiotico_relacionado {
      id
      antibiotico_nombre
      antibiotico_comentario
      antibiotico_inicio
      antibiotico_fin
    }
  }
}
`;

