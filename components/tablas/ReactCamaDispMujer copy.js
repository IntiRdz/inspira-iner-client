import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';

import { OBTENER_CAMAS_DISPONIBLES_MUJER } from '../../graphql/queries'; 

import { EditIcon, TaskIcon, BedIcon, Female, Male, Kidneys, SoapIcon } from '../../components/icons';


const ReactCamaDispMujer = () => {
  const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES_MUJER);
  const [camas, setCamas] = useState([]);
  
  useEffect(() => {
    if (data && data.obtenerCamasDisponiblesMujer) {
      setCamas(data.obtenerCamasDisponiblesMujer);
    }
  }, [data]);


  const columns = React.useMemo(
    () => [
      {
        header: 'Cama',
        accessorKey: 'cama_numero',
        cell: info => {
          const cama_numero = info.getValue();
          return (
            <div className="px-1 text-center">
              {cama_numero}
            </div>
          );
        },
      },
      {
        header: 'Prioridad',
        accessorKey: 'cama_prioridad',
        cell: info => {
          const cama_prioridad = info.getValue();
          return (
            <div className="px-1 text-left">
              {cama_prioridad !== "SinPrioridad" ? cama_prioridad : ''}
            </div>
          );
        },
      },
      {
        header: 'Cubículo',
        accessorKey: 'cama_compartida',
        cell: info => {
          const valor = info.getValue();
          const bgColor = valor === true ? "bg-indigo-100 p-2" : "";
          return (
            <div className={`${bgColor} text-center`}>
              {valor === true ? "Compartido" : "Aislado"}
            </div>
          );
        },
      },
      {
        header: 'Género',
        accessorKey: 'cama_genero',
        cell: info => {
          const cama_genero = info.getValue();
          return (
            <div className="px-1 text-center">
              {cama_genero === 'Mujer' ? (
                <Female width="2rem" height="2rem" color='#808080' style={{ display: 'inline-block' }} />
              ) : cama_genero === 'Hombre' ? (
                <Male width="2rem" height="2rem" color='#808080' style={{ display: 'inline-block' }}/>
              ) : ''}
            </div>
          );
        },
      },
      {
        header: 'Dispositivo O2',
        accessorKey: 'cama_dispositivo_o2',
        cell: info => {
          const cama_dispositivo_o2 = info.getValue();
          return (
            <div className="px-1 text-center">
              {cama_dispositivo_o2}
            </div>
          );
        },
      },
      {
        header: 'Hemodialisis',
        accessorKey: 'cama_hemodialisis',
        cell: info => {
          const cama_hemodialisis = info.getValue();
          return (
            <div className="px-1 text-center">
              {cama_hemodialisis ? (
                <Kidneys width="2rem" height="2rem" color='#808080' style={{ display: 'inline-block' }} />
              ) : ''}
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

export default ReactCamaDispMujer;




