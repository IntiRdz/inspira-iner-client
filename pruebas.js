import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

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

  const rerender = React.useReducer(() => ({}), {})[1]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const refreshData = () => setData(() => useQuery(OBTENER_CAMAS);)

  const columns = React.useMemo<ColumnDef<Person>[]>(

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


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  )
};

export default SimpleTable;

