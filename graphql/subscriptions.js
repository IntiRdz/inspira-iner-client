
import { gql } from '@apollo/client';

import {
  FRAGMENTO_PACIENTE,
  FRAGMENTO_CAMA,
  FRAGMENTO_MICROORGANISMO,
  FRAGMENTO_ADMISION,
  FRAGMENTO_CAMA_HISTORIAL,
  FRAGMENTO_DIAGNOSTICO
} from './fragments';



export const SUSCRIPCION_NUEVO_PACIENTE = gql`
    subscription suscripcionNuevoPaciente {
        nuevoPaciente {
            ...FragmentoPaciente
            admision_relacionada {
                ...FragmentoAdmision
                cama_relacionada{
                    ...FragmentoCamaHistorial
                    cama{
                        ...FragmentoCama
                    }
                }
            }
        }
    }
    ${FRAGMENTO_PACIENTE}
    ${FRAGMENTO_ADMISION}
    ${FRAGMENTO_CAMA_HISTORIAL}
    ${FRAGMENTO_CAMA}
`;


export const SUSCRIPCION_ACTUALIZAR_PACIENTE = gql`
    subscription suscripcionActualizarPaciente {
        actualizarPaciente {
            ...FragmentoPaciente
            admision_relacionada {
                ...FragmentoAdmision
                cama_relacionada{
                    ...FragmentoCamaHistorial
                    cama{
                        ...FragmentoCama
                    }   
                }
                microorganismo_relacionado {
                ...FragmentoMicroorganismo
                }
            }
        }
    }
    ${FRAGMENTO_PACIENTE}
    ${FRAGMENTO_ADMISION}
    ${FRAGMENTO_CAMA_HISTORIAL}
    ${FRAGMENTO_CAMA}
`;

export const SUSCRIPCION_ACTUALIZAR_CAMA = gql`
    subscription suscripcionActualizarCama {
        actualizarCama {
            ...FragmentoCama
            camahistorial{
                ...FragmentoCamaHistorial
                admision_relacionada {
                ...FragmentoAdmision
                    paciente_relacionado {
                        ...FragmentoPaciente
                    }
                    microorganismo_relacionado {
                    ...FragmentoMicroorganismo
                    }
                }
            }

        }
    }
`;


