import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CamaVista from '../components/camas/CamaVista';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

import { OBTENER_CAMAS_DISPONIBLES_MUJER } from '../graphql/queries';

const CamasDisponiblesMujer = () => {
  const [camas, setCamas] = useState(null);
  const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES_MUJER);

  useEffect(() => {
    if (data && data.obtenerCamasDisponiblesMujer) {
      setCamas(data.obtenerCamasDisponiblesMujer);
    }
  }, [data]);

  if (loading) return 'Cargando...';
  if (error) return `Error: ${error.message}`;
  if (!camas) return 'No hay datos disponibles';

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
            {camas.map((cama) => (
              <CamaVista 
                key={cama.id} 
                cama={cama}
              />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}

export default CamasDisponiblesMujer;
