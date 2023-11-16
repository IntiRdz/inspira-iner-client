import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const OBTENER_CAMAS = gql`
query ObtenerCamas {
  obtenerCamas {
    id
    cama_numero
    cama_compartida
    cama_lado
    cama_prioridad
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

const SimpleTable = () => {
  const { data, loading, error } = useQuery(OBTENER_CAMAS);
  const [camas, setCamas] = useState([]);

  useEffect(() => {
    if (data && data.obtenerCamas) {
      setCamas(data.obtenerCamas);
    }
  }, [data]);


  const columns = React.useMemo(
    () => [
      {
        header: 'Numero',
        accessorKey: 'cama_numero',
      },
      {
        header: 'Cubiculo',
        accessorKey: 'cama_compartida',
      },
      {
        header: 'lado',
        accessorKey: 'cama_lado',
      },
      {
        header: 'Priodidad',
        accessorKey: 'cama_prioridad',
      },
      {
        header: 'Ocupada',
        accessorKey: 'cama_ocupada',
      },
      {
        header: 'Genero',
        accessorKey: 'cama_genero',
      },
      {
        header: 'Dispositivo O2',
        accessorKey: 'cama_dispositivo_o2',
      },
      {
        header: 'Hemodialisis',
        accessorKey: 'cama_hemodialisis',
      },
      {
        header: 'Aislamiento',
        accessorKey: 'cama_aislamiento',
      },
      {
        header: 'DAN',
        accessorKey: 'cama_dan',
      },
      {
        header: 'UVEH',
        accessorKey: 'cama_codigo_uveh',
      },
      {
        header: 'Paciente',
        accessorKey: 'paciente_relacionado.id',
      },
      // Agrega aquí más columnas según sea necesario
    ],
    []
  );




  const tableInstance = useReactTable({
    columns,
    data: camas,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return 'Cargando...';
  if (error) return `Error: ${error.message}`;
  if (!camas.length) return 'No hay datos disponibles';

  return (
    <div>
        <h1 className="text-2xl text-gray-800 font-light mt-32">Camas</h1>
        <table border="1">
            <thead>
            {tableInstance.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {tableInstance.getRowModel().rows.map(row => (
                <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
};

export default SimpleTable;




