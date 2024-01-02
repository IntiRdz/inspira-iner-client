import React from 'react';
import { useQuery } from '@apollo/client';



import { OBTENER_TRASLADOS_HOY } from '../../graphql/queries'; 


const ClinicoTraslados = () => {
  const { data, loading, error } = useQuery(OBTENER_TRASLADOS_HOY);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Verificar que data y data.obtenerTrasladosHoy existen
  if (!data || !data.obtenerTrasladosHoy) return <p>No hay datos disponibles.</p>;


  return (
    
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Expediente</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Apellido Paterno</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Apellido Materno</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Género</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Diagnóstico</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Código</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Dispositivo O2</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Hemodiálisis</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Código UVEH</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Número de Cama</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.obtenerTrasladosHoy.map((traslado) => (
            <tr key={traslado.admision_relacionada.paciente_relacionado.expediente}>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.expediente}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.pac_apellido_paterno}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.pac_apellido_materno}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.pac_nombre}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.pac_genero}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.diagnostico}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.diagnostico1}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.pac_dispositivo_o2}</td>
              <td className="py-3 px-4">{traslado.admision_relacionada.paciente_relacionado.pac_hemodialisis ? 'Sí' : 'No'}</td>
              <td className="py-3 px-4">
                {
                  traslado.admision_relacionada.paciente_relacionado.pac_codigo_uveh
                    .filter(codigo => codigo !== "Sin_Definir")
                    .join(', ')
                }
              </td>
              <td className="py-3 px-4">
                {traslado.admision_relacionada.cama_relacionada.map(cama => cama.cama.cama_numero).join(' pasa a cama: ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}
export default ClinicoTraslados;
