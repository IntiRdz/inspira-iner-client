import React, { useState, useEffect } from 'react';
import CamaVista from './CamaVista';
import { useQuery } from '@apollo/client';

import { OBTENER_CAMAS_DISPONIBLES_HOMBRE } from '../../graphql/queries'; 


const CamasDisponiblesHombre = () => {
  const [camas, setCamas] = useState(null);
  const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES_HOMBRE);

  useEffect(() => {
    if (data && data.obtenerCamasDisponiblesHombre) {
      setCamas(data.obtenerCamasDisponiblesHombre);
    }
  }, [data]);

  if (loading) return 'Cargando...';
  if (error) return `Error: ${error.message}`;
  if (!camas) return 'No hay datos disponibles';

  return (
    <div>
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
    </div>
  );
}

export default CamasDisponiblesHombre;
