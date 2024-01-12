import React from 'react';

export default function FormDiagnosticEdit ({ diagnostico, onInputChange, onSubmit })  {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre del Diagnóstico
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="diagnostico_nombre"
                    value={diagnostico.diagnostico_nombre || ''}
                    onChange={onInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre del Diagnóstico
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="diagnostico_nombre"
                    value={diagnostico.diagnostico_nombre || ''}
                    onChange={onInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre del Diagnóstico
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="diagnostico_nombre"
                    value={diagnostico.diagnostico_nombre || ''}
                    onChange={onInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            {/* Agregar más campos según sea necesario */}
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Guardar Cambios
                </button>
            </div>
        </form>
    );
};