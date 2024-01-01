import React from 'react'

export const TablaTamiz = () => {
  return (
    <div>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="border px-4 py-2 w-1/6">Encabezado 1</th>
                    <th className="border px-4 py-2 w-2/6">Encabezado 2</th>
                    <th className="border px-4 py-2 w-2/6">Encabezado 3</th>
                    <th className="border px-4 py-2 w-1/6">Encabezado 4</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {/* Primera fila con la celda combinada */}
                <tr>
                    <td rowSpan="5" className="border px-4 py-2 w-1/6">Edad</td>
                    <td className="border px-4 py-2 w-2/6">Adulto Mayor</td>
                    <td className="border px-4 py-2 w-2/6"> `&gt;` 75 años</td>
                    <td className="border px-4 py-2 w-1/6">60-75 años: Discapacidad severa por puntaje de Katz 2 o menos y/o Déficit cognitivo moderadamente grave o mayor (GDS 5-7). </td>
                </tr>
                {/* Segunda fila */}
                <tr>
                    <td className="border px-4 py-2 w-2/6">Fila 2, Columna 2</td>
                    <td className="border px-4 py-2 w-2/6">Fila 2, Columna 3</td>
                    <td className="border px-4 py-2 w-1/6">Fila 2, Columna 4</td>
                </tr>
                {/* Tercera fila */}
                <tr>
                    <td className="border px-4 py-2 w-2/6">Fila 3, Columna 2</td>
                    <td className="border px-4 py-2 w-2/6">Fila 3, Columna 3</td>
                    <td className="border px-4 py-2 w-1/6">Fila 3, Columna 4</td>
                </tr>
                {/* Cuarta fila */}
                <tr>
                    <td className="border px-4 py-2 w-2/6">Fila 4, Columna 2</td>
                    <td className="border px-4 py-2 w-2/6">Fila 4, Columna 3</td>
                    <td className="border px-4 py-2 w-1/6">Fila 4, Columna 4</td>
                </tr>
                {/* Quinta fila */}
                <tr>
                    <td className="border px-4 py-2 w-2/6">1 mes de edad a 18 años.</td>
                    <td className="border px-4 py-2 w-2/6">Fila 5, Columna 3</td>
                    <td className="border px-4 py-2 w-1/6">Fila 5, Columna 4</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
