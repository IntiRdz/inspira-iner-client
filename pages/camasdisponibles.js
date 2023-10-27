import React from 'react';
import Layout from '../components/Layout';
import Cama from '../components/Cama';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'


const OBTENER_CAMAS_DISPONIBLES = gql`
  query obtenerCamasDisponibles {
      obtenerCamasDisponibles {
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
        creado
        paciente_relacionado {
          id
          pac_nombre
        }
        microorganismo_relacionado {
          id
          microorganismo_nombre
        }
      }
  }
   
`;

const Camas = () => {

  // Consultar los camas
  const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES)

  console.log(data)
  // console.log(loading)
  // console.log(error)

  if(loading) return 'cargando...';


  return (
    <div>
      <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Camas</h1>

          <Link href="/camas">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
              Regresar
            </a>
          </Link>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                  <th className="w-1/7 py-2"> # </th>
                  <th className="w-1/6 py-2">Compartida</th>
                  <th className="w-1/7 py-2">Disponible</th>
                  <th className="w-1/7 py-2">Ocupada</th>
                  <th className="w-1/7 py-2">Género</th>
                  <th className="w-1/6 py-2">Dispositivo O2</th>
                  <th className="w-1/6 py-2">Hemodialisis</th>
                  <th className="w-1/5 py-2">Código UVEH</th>
                  <th className="w-1/5 py-2">Aislamiento</th>
                  <th className="w-1/5 py-2">DAN</th>
                  <th className="w-1/5 py-2">Editar</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.obtenerCamasDisponibles.map( cama => (
                <Cama 
                  key={cama.id}
                  cama={cama}
                />
              ))}
            </tbody>
          </table>

      </Layout>
    </div>
  )
}

export default Camas
