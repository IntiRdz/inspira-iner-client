import React from 'react'

export const TablaTamiz = () => {
  // Ejemplo de un objeto paciente con atributos booleanos
  const paciente = {
    adultoMayor: false,
    mayor75: false,
    discapacidadSevera: false,
    joven: true
  };

  return (
    <div>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="border px-4 py-2 w-1/6">Evaluación realizada</th>
                    <th className="border px-4 py-2 w-2/6">Riesgo o vulnerabilidad detectada</th>
                    <th className="border px-4 py-2 w-2/6">Criterio Presente</th>
                    <th className="border px-4 py-2 w-1/6">Intervención recomendada</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                
                {/* Renderizar condicionalmente cada fila basado en los atributos del paciente */}
                {paciente.adultoMayor && (
                  <tr>
                      <td rowSpan="5" className="border px-4 py-2 w-1/6">Edad</td>
                      <td className="border px-4 py-2 w-2/6">Adulto Mayor</td>
                      <td className="border px-4 py-2 w-2/6">Presente</td>
                      <td rowSpan="5" className="border px-4 py-2 w-1/6">Geriatria</td>
                  </tr>
                )}
                {paciente.mayor75 && (
                  <tr>
                      <td className="border px-4 py-2 w-2/6">&gt; 75 años</td>
                      <td className="border px-4 py-2 w-2/6">Presente</td>
                  </tr>
                )}
                {paciente.discapacidadSevera && (
                  <tr>
                      <td className="border px-4 py-2 w-2/6">60-75 años: Discapacidad severa por puntaje de Katz 2 o menos y/o Déficit cognitivo moderadamente grave o mayor (GDS 5-7).</td>
                      <td className="border px-4 py-2 w-2/6">Presente</td>
                  </tr>
                )}
                {paciente.joven && (
                  <tr>
                      <td className="border px-4 py-2 w-2/6">1 mes de edad a 18 años</td>
                      <td className="border px-4 py-2 w-2/6">Presente</td>
                  </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}
