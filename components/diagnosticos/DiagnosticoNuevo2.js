import React, { useState } from 'react';
import ModalGeneral from '../modals/ModalGeneral';
import FormDiagnosticNew from '../forms/FormDiagnosticNew';    
 // Asegúrate de crear este nuevo componente

export default function DiagnosticoNuevo({ obtenerPaciente }) {
    // ... (tu código existente)

    // Estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => setIsModalOpen(true);

    // Función para cerrar el modal
    const closeModal = () => setIsModalOpen(false);

    return ( 
        <>  
            <button onClick={openModal}>Abrir Diagnóstico</button>

            <ModalGeneral isOpen={isModalOpen} onClose={closeModal}>
                <FormDiagnosticNew 
                    formik={formik}
                    obtenerPaciente={obtenerPaciente}
                />
            </ModalGeneral>

            {mensaje && mostrarMensaje()}
        </>
    );
}