import React from 'react';
import FormEditarDiagnostico from '../forms/FormEditarDiagnostico';

export default function ModalForm ({ isOpen, diagnostico, onClose, onInputChange, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Diagnóstico</h3>
                    <FormEditarDiagnostico
                        diagnostico={diagnostico}
                        onInputChange={onInputChange}
                        onSubmit={onSubmit}
                    />
                    <div className="items-center px-4 py-3">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Cerrar</button>
                        {/* ... otros botones o acciones ... */}
                    </div>
                </div>
            </div>
        </div>
    );
};


