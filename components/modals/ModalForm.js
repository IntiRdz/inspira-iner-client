import React from 'react';

export default function ModalGeneral({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    {children}
                    <div className="items-center px-4 py-3">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Cerrar</button>
                        {/* ... otros botones o acciones ... */}
                    </div>            
                </div>
            </div>
        </div>
    );
}
