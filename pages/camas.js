import React from 'react';
import Layout from '../components/Layout';
import Cama from '../components/camas/Cama';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'


const OBTENER_CAMAS = gql`
query ObtenerCamas {
  obtenerCamas {
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
}
`;

const Camas = () => {

  // Consultar los camas
  const { data, loading, error } = useQuery(OBTENER_CAMAS)

  console.log(data)

  if(loading) return 'cargando...';


  return (
    <div>
      <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Camas</h1>

          <Link href="/nuevacama">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
              Nueva Cama
            </a>
          </Link>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                  <th className="w-1/7 py-2"> # </th>
                  <th className="w-1/6 py-2">Cubículo</th>
                  <th className="w-1/7 py-2">Estado</th>
                  <th className="w-1/7 py-2">Disponibilidad</th>
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
            {Array.from(data.obtenerCamas)
              .sort((a, b) => parseInt(b.cama_numero) - parseInt(a.cama_numero))
              .map((cama) => (
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
