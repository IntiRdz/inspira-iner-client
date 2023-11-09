import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CamaVista from '../components/camas/CamaVista';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'


const OBTENER_CAMAS_OCUPADAS = gql`
  query obtenerCamasOcupadas {
      obtenerCamasOcupadas {
        id
        cama_numero
        cama_prioridad
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

const CamasOcupadas = () => {

  // Consultar los camas
  const [camas, setCamas] = useState(null);
  const { data, loading, error } = useQuery(OBTENER_CAMAS_OCUPADAS)

  useEffect(() => {
    if (data && data.obtenerCamasOcupadas) {
      setCamas(data.obtenerCamasOcupadas);
    }
  }, [data]);

  if (loading) return 'Cargando...';
  if (error) return `Error: ${error.message}`;
  if (!camas) return 'No hay datos disponibles';

  return (
    <div>
      <Layout>
          <h2 className="text-2xl text-gray-800 font-light">Camas</h2>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/9 px-1 py-1"> # </th>
                <th className="w-1/8 px-1 py-1">Prioridad</th>
                <th className="w-1/8 px-1 py-1">Cubículo</th>
                <th className="w-1/8 px-1 py-1">Género</th>
                <th className="w-1/8 px-1 py-1">Dispositivo O2</th>
                <th className="w-1/8 px-1 py-1">Hemodialisis</th>
                <th className="w-1/7 px-1 py-1">Código UVEH</th>
                <th className="w-1/8 px-1 py-1">Aislamiento</th>
                <th className="w-1/8 px-1 py-1">DAN</th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {Array.from(data.obtenerCamasOcupadas)
              .sort((a, b) => parseInt(a.cama_numero) - parseInt(b.cama_numero))
              .map((cama) => (
                <CamaVista 
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

export default CamasOcupadas
