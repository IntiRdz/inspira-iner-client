import React, {  useState, useEffect, useCallback  } from 'react';
import { gql, useQuery } from '@apollo/client';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';

import { OBTENER_PACIENTES_HOSPITALIZADOS } from '../../graphql/queries';


const ReactPacientesHosp = () => {
  const { data, loading, error } = useQuery(OBTENER_PACIENTES_HOSPITALIZADOS);  
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    if (data && data.obtenerPacientesHospitalizados) {
      setPacientes(data.obtenerPacientesHospitalizados);
    }
  }, [data]);

  // Definición de la función de ordenación para la columna 'Cama'
  const sortingFnCama = useCallback((rowA, rowB, columnId, desc) => {
    // Asegurarse de que el número de cama se maneje como un número
    const lastBedA = rowA.original.cama_relacionada.length > 0
      ? parseInt(rowA.original.cama_relacionada[rowA.original.cama_relacionada.length - 1].cama_numero, 10)
      : -1; // Usar un valor por defecto que represente 'sin cama'
    const lastBedB = rowB.original.cama_relacionada.length > 0
      ? parseInt(rowB.original.cama_relacionada[rowB.original.cama_relacionada.length - 1].cama_numero, 10)
      : -1; // Usar un valor por defecto que represente 'sin cama'
  
    return lastBedA - lastBedB; // Comparación numérica
  }, []);


  const columns = React.useMemo(
    () => [
      {
        header: 'Expediente',
        accessorKey: 'expediente',
      },
      {
        header: 'Cama',
        cell: info => {
          const paciente = info.row.original; // Accede al paciente actual
          // Tu lógica original para mostrar el número de la cama o un mensaje
          return Array.isArray(paciente.cama_relacionada) && paciente.cama_relacionada.length > 0 ? (
            <div>{paciente.cama_relacionada[paciente.cama_relacionada.length - 1].cama_numero}</div>
          ) : (
            <div>No hay cama relacionada</div>
          );
        },
        sortingFn: sortingFnCama,
      },            
      {
        header: 'Apellido Paterno',
        accessorKey: 'pac_apellido_paterno',
      },
/*       {
        header: 'lado',
        accessorKey: 'cama_lado',
      }, */
      {
        header: 'Nombre',
        accessorKey: 'pac_nombre',
      },

      {
        header: 'Genero',
        accessorKey: 'pac_genero',
      },
      {
        header: 'Dispositivo',
        accessorKey: 'pac_dispositivo_o2',
      },
      {
        header: 'HD',
        accessorKey: 'pac_hemodialisis',
      },
      {
        header: 'Diagnóstico',
        accessorKey: 'diagnostico',
      },
      {
        header: 'Diagnósticos',
        accessorKey: 'diagnostico1',
      },
      {
        header: 'Atención',
        accessorKey: 'caracteristicas_especiales',
      },
      {
        header: 'Código UVEH',
        accessorKey: 'pac_codigo_uveh',
      },
      {
        header: 'HD',
        accessorKey: 'pac_hemodialisis',
      },
      {
        header: 'Microorganismos',
        cell: info => {
          const paciente = info.row.original; // Accede al paciente actual
          // Comprobamos si microorganismo_relacionado es un array y lo renderizamos
          return Array.isArray(paciente.microorganismo_relacionado) ? (
            paciente.microorganismo_relacionado.map((microorganismo, index) => (
              <div key={index}>{microorganismo.microorganismo_nombre}</div>
            ))
          ) : (
            <div>No hay microorganismos relacionados</div>
          );
        }
      },


    ],
    [sortingFnCama]
  );


  const [sorting, setSorting] = useState([])

  const tableInstance = useReactTable({
    columns,
    data: pacientes,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    },
    onSortingChange: setSorting
  });

  if (loading) return 'Cargando...';
  if (error) return `Error: ${error.message}`;
  if (!pacientes.length) return 'No hay datos disponibles';

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

export default ReactPacientesHosp;




