import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  ColumnDef,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';

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
  const { data, loading, error, refetch } = useQuery(OBTENER_CAMAS);

  // Asegúrate de que el tipo de 'columns' coincida con tus datos
  const columns = React.useMemo<ColumnDef<any>[]>(
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

  const [sorting, setSorting] = useState([]);

  const tableInstance = useReactTable({
    data: data?.obtenerCamas || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-2">
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
      <button onClick={() => refetch()}>Refresh Data</button>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  );
};

export default SimpleTable;
