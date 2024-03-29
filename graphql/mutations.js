import { gql } from '@apollo/client';
import { 
    FRAGMENTO_PACIENTE, 
    FRAGMENTO_CAMA, 
    FRAGMENTO_ADMISION,
    FRAGMENTO_CAMA_HISTORIAL,
    FRAGMENTO_MICROORGANISMO,
    FRAGMENTO_DIAGNOSTICO,
    FRAGMENTO_ANTIBIOTICO,
    FRAGMENTO_PROGRAMA_INTEGRAL
 } from './fragments';


export const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
            id
            nombre
            apellido
            email
        }
    }
`;

export const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`;

export const NUEVO_PACIENTE = gql`
    mutation nuevoPaciente($input: PacienteInput) {
        nuevoPaciente(input: $input) {
            ...FragmentoPaciente
        }
    }
${FRAGMENTO_PACIENTE}
`;

export const ACTUALIZAR_PACIENTE = gql`
    mutation actualizarPaciente($id: ID!, $input: PacienteInput) {
        actualizarPaciente(id: $id, input: $input) {
            ...FragmentoPaciente
            admision_relacionada {
                ...FragmentoAdmision
                cama_relacionada{
                    ...FragmentoCamaHistorial
                    cama{
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


export const ELIMINAR_PACIENTE = gql`
mutation eliminarPaciente($id: ID!) {
  eliminarPaciente(id: $id)
}
`;

export const NUEVA_CAMA = gql`
    mutation nuevaCama($input: CamaInput) {
        nuevaCama(input: $input) {
            ...FragmentoCama
            }
    }
${FRAGMENTO_CAMA}
`;

export const ACTUALIZAR_CAMA = gql`
    mutation actualizarCama($id: ID!, $input: CamaInput) {
            actualizarCama(id:$id, input:$input) {
                ...FragmentoCama
            }
    }
${FRAGMENTO_CAMA}
`;


export const ELIMINAR_CAMA = gql`
    mutation eliminarCama($id: ID!) {
        eliminarCama(id: $id) 
    }
`;


export const NUEVO_MICROORGANISMO = gql`
  mutation nuevoMicroorganismo($input: MicroorganismoInput) {
    nuevoMicroorganismo(input: $input) {
        fecha_deteccion
        metodo_deteccion
        microorganismo_tipo
        microorganismo_nombre
        susceptibilidad
        comentario_uveh
    }
  }
`;


export const ACTUALIZAR_MICROORGANISMO = gql`
    mutation actualizarMicroorganismo($id: ID!, $input: MicroorganismoInput) {
            actualizarMicroorganismo(id:$id, input:$input) {
                ...FragmentoMicroorganismo
            }
    }
${FRAGMENTO_MICROORGANISMO}
`;


export const NUEVO_DIAGNOSTICO = gql`
  mutation nuevoDiagnostico($input: DiagnosticoInput) {
    nuevoDiagnostico(input: $input) {
        ...FragmentoDiagnostico
    }
  }
${FRAGMENTO_DIAGNOSTICO}
`;

export const ACTUALIZAR_DIAGNOSTICO = gql`
    mutation actualizarDiagnostico($id: ID!, $input: DiagnosticoInput) {
            actualizarDiagnostico(id:$id, input:$input) {
                ...FragmentoDiagnostico
            }
    }
${FRAGMENTO_DIAGNOSTICO}
`;


export const ACTUALIZAR_PROGRAMA_INTEGRAL = gql`
    mutation actualizarProgramaIntegral($id: ID!, $input: ProgramaIntegralInput) {
            actualizarProgramaIntegral(id:$id, input:$input) {
                ...FragmentoProgramaIntegral
            }
    }
${FRAGMENTO_PROGRAMA_INTEGRAL}
`;