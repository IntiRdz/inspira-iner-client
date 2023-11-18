import { gql } from '@apollo/client';

export const ELIMINAR_PACIENTE = gql`
mutation eliminarPaciente($id: ID!) {
  eliminarPaciente(id: $id)
}
`;