import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Importa Link
import { useQuery, gql, useMutation } from '@apollo/client';
import Microorganismo from '../../components/Microorganismo.js';

const OBTENER_PACIENTE = gql`
  query obtenerPaciente($id: ID!) {
    pacienteData: obtenerPaciente(id: $id) {
      id
      pac_apellido_paterno
      pac_apellido_materno
      pac_nombre
    }
  }
`;

const OBTENER_MICROORGANISMOS_PACIENTE = gql`
  query obtenerMicroorganismosPatient($id: ID!) {
    obtenerMicroorganismosPatient(id: $id) {
      id
      fecha_deteccion
      metodo_deteccion
      microorganismo_tipo
      microorganismo_nombre
      susceptibilidad
      comentario_uveh
      paciente_relacionado
      cama_relacionada
    }
  }
`;



const MicroorganismosPaciente = () => {


    // obtener el ID actual
    const router = useRouter();
    const { query: { id } } = router;
    //console.log(id)

    // Consultar para obtener el paciente
    const { data: dataPaciente, loading: loadingPaciente, error: errorPaciente } = useQuery(OBTENER_PACIENTE, {
        variables: {
            id
        }
    });

    // Consultar para obtener los microorganismos del paciente
    const { data: dataMicroorganismo, loading: loadingMicroorganismo, error: errorMicroorganismo } = useQuery(OBTENER_MICROORGANISMOS_PACIENTE, {
        variables: {
            id
        }
    });

  if (loadingPaciente || loadingMicroorganismo) return 'Cargando...';


    return ( 
        <div>
        <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Microorganismos asociados al paciente</h1>

        <Link href="/">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
            Regresar
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
                {/* <th className="w-1/7 py-2"> # </th> */}
                <th className="w-1/6 py-2">Fecha de Deteccción</th>
                <th className="w-1/7 py-2">Método Detección</th>
                <th className="w-1/7 py-2">Tipo</th>
                <th className="w-1/7 py-2">Nombre</th>
                <th className="w-1/6 py-2">Susceptibilidad</th>
                <th className="w-1/5 py-2">Comentario UVEH</th>
                <th className="w-1/5 py-2">Paciente</th>
                <th className="w-1/5 py-2">Cama</th>
            </tr>
          </thead>

            <tbody className="bg-white">
                {dataMicroorganismo.obtenerMicroorganismosPatient.map(microorganismo => (
                    <Microorganismo
                        key={microorganismo.id}
                        microorganismo={microorganismo}
                    />
            ))}
          </tbody>
        </table>

    </Layout>
    </div>
     )
}
 
export default MicroorganismosPaciente;