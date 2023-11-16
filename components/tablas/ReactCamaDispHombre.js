import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';

const OBTENER_CAMAS_DISPONIBLES_HOMBRE = gql`
  query obtenerCamasDisponiblesHombre {
    obtenerCamasDisponiblesHombre {
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

const ReactCamaDispHombre = () => {
  const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES_HOMBRE);  
  const [camas, setCamas] = useState([]);

  useEffect(() => {
    if (data && data.obtenerCamasDisponiblesHombre) {
      setCamas(data.obtenerCamasDisponiblesHombre);
    }
  }, [data]);


  const columns = React.useMemo(
    () => [
      {
        header: '#',
        accessorKey: 'cama_numero',
      },
      {
        header: 'Priodidad',
        accessorKey: 'cama_prioridad',
      },
      {
        header: 'Cubiculo',
        accessorKey: 'cama_compartida',
        cell: info => {
          const valor = info.getValue();
          const bgColor = valor === true ? "bg-indigo-100 p-2" : "";
          return (
            <div className={`${bgColor}`}>
              {valor === true ? "Compartido" : "Aislado"}
            </div>
          );
        },
      },
      {
        header: 'Genero',
        accessorKey: 'cama_genero',
      },
/*       {
        header: 'lado',
        accessorKey: 'cama_lado',
      }, */
      {
        header: 'Dispositivo O2',
        accessorKey: 'cama_dispositivo_o2',
      },
      {
        header: 'Ocupada',
        accessorKey: 'cama_ocupada',
        cell: info => {
          const valor = info.getValue();
          if (valor === true) {
            return "Ocupada";
          } else if (valor === false) {
            return "Disponible";
          }
          return valor;
        },
      },
      {
        header: 'Hemodialisis',
        accessorKey: 'cama_hemodialisis',
        cell: info => {
          const valor = info.getValue();
          if (valor === true) {
            return "HD";
          } else if (valor === false) {
            return "";
          }
          return valor;
        },
      },
      {
        header: 'Código UVEH',
        accessorKey: 'cama_codigo_uveh',
      },
      {
        header: 'Aislamiento',
        accessorKey: 'cama_aislamiento',
        cell: info => {
          const valor = info.getValue();
          if (valor === true) {
            return "Aislamiento";
          } else if (valor === false) {
            return "";
          }
          return valor;
        },
      },
      {
        header: 'DAN',
        accessorKey: 'cama_dan',
        cell: info => {
          const valor = info.getValue();
          const bgColor = valor === true ? "bg-red-400 p-2" : "";
          return (
            <div className={`${bgColor}`}>
              {valor === true ? "DAN" : ""}
            </div>
          );
        },
      },
    ],
    []
  );


  const [sorting, setSorting] = useState([])

  const tableInstance = useReactTable({
    columns,
    data: camas,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    },
    onSortingChange: setSorting
  });

  if (loading) return 'Cargando...';
  if (error) return `Error: ${error.message}`;
  if (!camas.length) return 'No hay datos disponibles';

  return (
    <div>
        <table className="table-auto shadow-md mt-10 w-full">
            <thead className="bg-gray-800">
            {tableInstance.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="text-white">         
                {headerGroup.headers.map(header => (
                    <th key={header.id}
                      className="px-1 py-1 hover:bg-gray-700 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                    {
                    flexRender(
                      header.column.columnDef.header, 
                      header.getContext()
                    )
                    }
                    {
                        header.column.getIsSorted() === 'asc' ? ' 🔼' :
                        header.column.getIsSorted() === 'desc' ? ' 🔽' : null
                    }
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody className="bg-white">
            {tableInstance.getRowModel().rows.map(row => (
                <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-2 py-2 border-gray-200">
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

export default ReactCamaDispHombre;




