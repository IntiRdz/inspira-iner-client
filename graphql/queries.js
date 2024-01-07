import { gql } from '@apollo/client';

import {
  FRAGMENTO_PACIENTE,
  FRAGMENTO_CAMA,
  FRAGMENTO_MICROORGANISMO,
  FRAGMENTO_ADMISION,
  FRAGMENTO_CAMA_HISTORIAL,
  FRAGMENTO_DIAGNOSTICO
} from './fragments';


export const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;



export const OBTENER_PACIENTE = gql`
  query ObtenerPaciente($id: ID!) {
    obtenerPaciente(id: $id) {
      ...FragmentoPaciente
      admision_relacionada {
        ...FragmentoAdmision
        cama_relacionada {
          ...FragmentoCamaHistorial
          cama {
            ...FragmentoCama
          }
          microorganismo_relacionado {
          ...FragmentoMicroorganismo
          }
        }
      }
    }
  }
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_MICROORGANISMO}
`;


 
export const OBTENER_PACIENTES = gql`
query ObtenerPacientes {
  obtenerPacientes {
    ...FragmentoPaciente
      admision_relacionada {
        ...FragmentoAdmision
        cama_relacionada {
          ...FragmentoCamaHistorial
          cama {
            ...FragmentoCama
          }
          microorganismo_relacionado {
          ...FragmentoMicroorganismo
        }
        }

      }
    }
  }
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_MICROORGANISMO}
`;


export const OBTENER_PACIENTES_HOSPITALIZADOS = gql`
query ObtenerPacientesHospitalizados {
  obtenerPacientesHospitalizados {
    ...FragmentoPaciente
      admision_relacionada {
        ...FragmentoAdmision
        cama_relacionada {
          ...FragmentoCamaHistorial
          cama {
            ...FragmentoCama
          }
          microorganismo_relacionado {
          ...FragmentoMicroorganismo
        }
        }

      }
    }
  }
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_MICROORGANISMO}
`;

export const OBTENER_PACIENTES_NO_HOSPITALIZADOS = gql`
query ObtenerPacientesNoHospitalizados {
  obtenerPacientesNoHospitalizados {
    ...FragmentoPaciente
      admision_relacionada {
        ...FragmentoAdmision
        cama_relacionada {
          ...FragmentoCamaHistorial
          cama {
            ...FragmentoCama
          }
          microorganismo_relacionado {
          ...FragmentoMicroorganismo
        }
        }

      }
    }
  }
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_MICROORGANISMO}
`;


export const OBTENER_CAMAS = gql`
  query ObtenerCamas {
    obtenerCamas {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_URGENCIAS = gql`
  query ObtenerCamasUrgencias {
    obtenerCamasUrgencias {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_1 = gql`
  query ObtenerCamas1 {
    obtenerCamas1 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_2 = gql`
  query ObtenerCamas2 {
    obtenerCamas2 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_3 = gql`
  query ObtenerCamas3 {
    obtenerCamas3 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_4 = gql`
  query ObtenerCamas4 {
    obtenerCamas4 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;
export const OBTENER_CAMA = gql`
    query obtenerCama($id: ID!) {
        obtenerCama(id: $id) {
          ...FragmentoCama
        }
    }
  ${FRAGMENTO_CAMA}
`;

export const OBTENER_CAMAS_5 = gql`
  query ObtenerCamas5 {
    obtenerCamas5 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;


export const OBTENER_CAMAS_7 = gql`
  query ObtenerCamas7 {
    obtenerCamas7 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_8 = gql`
  query ObtenerCamas8 {
    obtenerCamas8 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_9 = gql`
  query ObtenerCamas9 {
    obtenerCamas9 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;

export const OBTENER_CAMAS_10 = gql`
  query ObtenerCamas10 {
    obtenerCamas10 {
      ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
                cama_relacionada {
                  ...FragmentoCamaHistorial
                  microorganismo_relacionado {
                  ...FragmentoMicroorganismo
                  }
                }
                diagnostico {
                  ...FragmentoDiagnostico
                }
            }
          }
        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_DIAGNOSTICO}
`;


export const OBTENER_CAMAS_DISPONIBLES = gql`
query ObtenerCamasDisponibles {
  obtenerCamasDisponibles {
    ...FragmentoCama
          camahistorial {
              ...FragmentoCamaHistorial
              admision_relacionada {
              ...FragmentoAdmision
                paciente_relacionado {
                  ...FragmentoPaciente
                }
            }
          }


        }

    }
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_CAMA_HISTORIAL}
  ${FRAGMENTO_ADMISION}
  ${FRAGMENTO_PACIENTE}
`;


export const OBTENER_CAMAS_DISPONIBLES_MUJER = gql`
  query obtenerCamasDisponiblesMujer {
    obtenerCamasDisponiblesMujer {
      ...FragmentoCama
    }
  }
  ${FRAGMENTO_CAMA}
`;

export const OBTENER_CAMAS_DISPONIBLES_HOMBRE = gql`
  query obtenerCamasDisponiblesHombre {
    obtenerCamasDisponiblesHombre {
      ...FragmentoCama
    }
  }
  ${FRAGMENTO_CAMA}
`;

export const OBTENER_CAMAS_OCUPADAS = gql`
  query obtenerCamasOcupadas {
      obtenerCamasOcupadas {
        ...FragmentoCama
      }
  }
  ${FRAGMENTO_CAMA}
`;


export const OBTENER_MICROORGANISMOS_PACIENTE = gql`
  query obtenerMicroorganismosPatient($id: ID!) {
    obtenerMicroorganismosPatient(id: $id) {
      ...FragmentoMicroorganismo
      camas_relacionadas {
        ...FragmentoCama
      }
      paciente_relacionado {
        ...FragmentoPaciente
      }
    }
  }
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_PACIENTE}
`;


export const OBTENER_MICROORGANISMOS_ADMISION = gql`
  query obtenerMicroorganismosPatient($id: ID!) {
    obtenerMicroorganismosPatient(id: $id) {
      ...FragmentoAdmision
      cama_relacionada {
        ...FragmentoCama
      }
      paciente_relacionado {
        ...FragmentoPaciente
      }
    }
  }
  ${FRAGMENTO_MICROORGANISMO}
  ${FRAGMENTO_CAMA}
  ${FRAGMENTO_PACIENTE}
`;


export const OBTENER_ADMISIONES = gql`
query ObtenerAdmisiones {
  obtenerAdmisiones {
    ...FragmentoAdmision
    paciente_relacionado {
      ...FragmentoPaciente
    }
    cama_relacionada {
      ...FragmentoCamaHistorial
      cama {
        ...FragmentoCama
      }
      microorganismo_relacionado {
      ...FragmentoMicroorganismo
    }
    }

  }
}
${FRAGMENTO_ADMISION}
${FRAGMENTO_PACIENTE}
${FRAGMENTO_CAMA_HISTORIAL}
${FRAGMENTO_CAMA}
${FRAGMENTO_MICROORGANISMO}
`;

export const OBTENER_ADMISIONES_ACTIVAS = gql`
query ObtenerAdmisionesActivas {
  obtenerAdmisionesActivas {
    ...FragmentoAdmision
    paciente_relacionado {
      ...FragmentoPaciente
    }
    cama_relacionada {
      ...FragmentoCamaHistorial
      cama {
        ...FragmentoCama
      }
      microorganismo_relacionado {
      ...FragmentoMicroorganismo
    } 
    }

  }
}
${FRAGMENTO_ADMISION}
${FRAGMENTO_PACIENTE}
${FRAGMENTO_CAMA_HISTORIAL}
${FRAGMENTO_CAMA}
${FRAGMENTO_MICROORGANISMO}
`;

export const OBTENER_ADMISIONES_INACTIVAS = gql`
query ObtenerAdmisionesInactivas {
  obtenerAdmisionesInactivas {
    ...FragmentoAdmision
    paciente_relacionado {
      ...FragmentoPaciente
    }
    cama_relacionada {
      ...FragmentoCamaHistorial
      cama {
        ...FragmentoCama
      }
      microorganismo_relacionado {
      ...FragmentoMicroorganismo
    }
    }

  }
}
${FRAGMENTO_ADMISION}
${FRAGMENTO_PACIENTE}
${FRAGMENTO_CAMA_HISTORIAL}
${FRAGMENTO_CAMA}
${FRAGMENTO_MICROORGANISMO}

`;


export const OBTENER_ULTIMA_ADMISION_PACIENTE = gql`
query ObtenerUltimaAdmisionPaciente($id: ID!) {
    obtenerUltimaAdmisionPaciente(id: $id) {
    ...FragmentoAdmision
    paciente_relacionado {
      ...FragmentoPaciente
    }
    cama_relacionada {
      ...FragmentoCamaHistorial
      cama {
        ...FragmentoCama
      }
      microorganismo_relacionado {
        ...FragmentoMicroorganismo
      }
    }
    diagnostico {
      ...FragmentoDiagnostico
    }

  }
}
${FRAGMENTO_ADMISION}
${FRAGMENTO_PACIENTE}
${FRAGMENTO_CAMA_HISTORIAL}
${FRAGMENTO_CAMA}
${FRAGMENTO_MICROORGANISMO}
${FRAGMENTO_DIAGNOSTICO}
`;


export const OBTENER_TRASLADOS_HOY = gql`
query ObtenerTrasladosHoy {
  obtenerTrasladosHoy {
    admision_relacionada {
      paciente_relacionado {
        ...FragmentoPaciente
      }
      cama_relacionada {
        cama {
          cama_numero
        }
      }
    }
    microorganismo_relacionado {
      microorganismo_nombre
    }
  }
}
${FRAGMENTO_PACIENTE}
`;