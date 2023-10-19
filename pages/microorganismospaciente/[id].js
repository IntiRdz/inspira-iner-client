import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Importa Link
import { useQuery, gql } from '@apollo/client';
import { format, differenceInDays } from 'date-fns';

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
      _id
      fecha_deteccion
      metodo_deteccion
      microorganismo_tipo
      microorganismo_nombre
      susceptibilidad
      comentario_uveh
      cama_relacionada{
        _id
        cama_numero
      }
      paciente_relacionado{
        id
        pac_nombre
      }

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


console.log(dataMicroorganismo)

  if (loadingPaciente || loadingMicroorganismo) return 'Cargando...';


  // Función para formatear una fecha en el formato deseado
  const formatFecha = (fecha, formato) => {
    return format(new Date(fecha), formato);
  };

  const calcularDias = (fechaDeteccion) => {
    const hoy = new Date();
    const fechaDetec = new Date(fechaDeteccion);
    return differenceInDays(hoy, fechaDetec);
};  

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
                <th className="w-1/7 py-2"> # </th>
                <th className="w-1/6 py-2">Fecha de Deteccción</th>
                <th className="w-1/6 py-2">Dias detección</th>
                <th className="w-1/7 py-2">Método Detección</th>
                <th className="w-1/7 py-2">Tipo</th>
                <th className="w-1/7 py-2">Nombre</th>
                <th className="w-1/6 py-2">Susceptibilidad</th>
                <th className="w-1/5 py-2">Comentario UVEH</th>
                <th className="w-1/5 py-2">Cama</th>
            </tr>
          </thead>

          <tbody className="bg-white">
          {dataMicroorganismo && dataMicroorganismo.obtenerMicroorganismosPatient
                .sort((a, b) => new Date(b.fecha_deteccion) - new Date(a.fecha_deteccion))
                .map((microorganismo, index) => (
                <tr key={microorganismo._id}>
                  <td className="border px-4 py-2">{index + 1}</td> {/* Utiliza el índice para el número incremental */}
                  <td className="border px-4 py-2">{formatFecha(microorganismo.fecha_deteccion, 'dd-MM-yy')}</td>
                  <td className="border px-4 py-2">{calcularDias(microorganismo.fecha_deteccion)}</td>
                  <td className="border px-4 py-2">{microorganismo.metodo_deteccion}</td>
                  <td className="border px-4 py-2">{microorganismo.microorganismo_tipo}</td>
                  <td className="border px-4 py-2">{microorganismo.microorganismo_nombre}</td>
                  <td
                    className={`border px-4 py-2 ${
                      (() => {
                        switch (microorganismo.susceptibilidad) {
                          case 'Sensible':
                            return 'bg-green-200';
                          case 'BLEE':
                            return 'bg-pink-300';
                          case 'MDR':
                            return 'bg-rose-500';
                          case 'XDR':
                            return 'bg-red-300'; 
                          default:
                            return '';
                        }
                      })()
                    }`}
                  >
                    {microorganismo.susceptibilidad}
                  </td>
                   <td className="border px-4 py-2">{microorganismo.comentario_uveh}</td>
                   <td className="border px-2 py-2">
                    {Array.isArray(microorganismo.cama_relacionada) ? (
                        microorganismo.cama_relacionada.map((cama, index) => (
                        <div key={index}>{cama.cama_numero}</div>
                        ))
                    ) : (
                        microorganismo.cama_relacionada.map((cama, index) => (
                        <div key={index}>{cama.cama_numero}</div>
                        ))
                    )}
                </td>
                </tr>
              ))}
          </tbody>
        </table>
    </Layout>
    </div>
     )
}
 
export default MicroorganismosPaciente;