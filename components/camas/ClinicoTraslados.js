import React from 'react';
import { useQuery } from '@apollo/client';

import { OBTENER_TRASLADOS_HOY } from '../../graphql/queries'; 

import { format } from 'date-fns'; // Importar format
import { utcToZonedTime } from 'date-fns-tz';
const timeZone = 'America/Mexico_City'; // Define la zona horaria



const ClinicoTraslados = () => {
  const { data, loading, error } = useQuery(OBTENER_TRASLADOS_HOY);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Verificar que data y data.obtenerTrasladosHoy existen
  if (!data || !data.obtenerTrasladosHoy) return <p>No hay datos disponibles.</p>;
  console.log(data.obtenerTrasladosHoy)

  return (
    
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Cama Origen</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm"> NOMBRE COMPLETO</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Cama Destino</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Dispositivo O2</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Aislado</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Código</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Diagnóstico</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Fecha Traslado</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.obtenerTrasladosHoy.map((traslado, index) => (
            <tr key={`${traslado.admision_relacionada.paciente_relacionado.expediente}-${index}`}>
              <td className="py-3 px-4 uppercase">
                {traslado.admision_relacionada.cama_relacionada[0]?.cama?.cama_numero || 'N/A'}
              </td>
              <td className="py-3 px-4">
                {
                  `${traslado.admision_relacionada.paciente_relacionado.pac_apellido_paterno} ${traslado.admision_relacionada.paciente_relacionado.pac_apellido_materno} ${traslado.admision_relacionada.paciente_relacionado.pac_nombre}`
                }
              </td>
              <td className="py-3 px-4 uppercase">
                {traslado.admision_relacionada.cama_relacionada[1]?.cama?.cama_numero || 'N/A'}
              </td>
              <td className="py-3 px-4 uppercase">{traslado.admision_relacionada.paciente_relacionado.pac_dispositivo_o2}</td>
              <td className="py-3 px-4 uppercase"></td>
              <td className="py-3 px-4 uppercase">
                {
                  traslado.admision_relacionada.paciente_relacionado.pac_codigo_uveh
                    .filter(codigo => codigo !== "Sin_Definir")
                    .join(', ')
                }
              </td>
              <td className="py-3 px-4 uppercase">
                {
                  traslado.admision_relacionada.diagnostico
                    .map(diag => diag.diagnostico_nombre)
                    .join(', ')
                }
              </td>
              <td className="py-3 px-4 uppercase">
                {
                  format(utcToZonedTime(new Date(traslado.fecha_traslado), timeZone), 'dd-MM' + ' - HH') + ' hrs'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}
export default ClinicoTraslados;
