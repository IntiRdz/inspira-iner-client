import React, { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import PacienteContext from '../../context/pacientes/PacienteContext';


import { OBTENER_CAMAS, OBTENER_CAMAS_DISPONIBLES, OBTENER_PACIENTE, OBTENER_PACIENTES } from '../../graphql/queries';
import { ACTUALIZAR_PACIENTE } from '../../graphql/mutations';

import { validationSchemaPatient } from '../../components/forms/validationSchemas';
import FormPatientEdit from '../forms/FormPatientEdit';

const timeZone = 'America/Mexico_City'; // Definir la zona horaria

import ModalGeneralAncho from '../modals/ModalGeneralAncho';


export default function PacienteEditar ({obtenerPaciente, isOpen, onClose}) {
    
    // Mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);
    const [childData, setChildData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [actualizando, setActualizando] = useState(false);

    const id = obtenerPaciente.id;

    const { cama } = useContext(PacienteContext);

    // Sincroniza el estado local del modal con el prop 'isOpen'
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const closeModal = () => {
        onClose(); // Cierra el modal utilizando la función del padre
    };

    const handleDataFromChild = (data) => {
        setChildData(data);
    }


/*     const [actualizarPaciente] = useMutation(ACTUALIZAR_PACIENTE, {
        update(cache, { data: { actualizarPaciente } }) {
            // Actualizar OBTENER_PACIENTES
            const { obtenerPacientes } = cache.readQuery({ query: OBTENER_PACIENTES });
            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data: { obtenerPacientes: [...obtenerPacientes, actualizarPaciente] },
            });
    
            // Actualizar OBTENER_CAMAS_DISPONIBLES si es necesario
            try {
                const { obtenerCamasDisponibles } = cache.readQuery({ query: OBTENER_CAMAS_DISPONIBLES });
                // Aquí, actualiza obtenerCamasDisponibles según sea necesario
                cache.writeQuery({
                    query: OBTENER_CAMAS_DISPONIBLES,
                    data: { obtenerCamasDisponibles: actualizarPaciente },
                });
            } catch (error) {
                console.log("No se pudo actualizar OBTENER_CAMAS_DISPONIBLES: ", error);
            }
    
            // Actualizar OBTENER_CAMAS si es necesario
            try {
                const { obtenerCamas } = cache.readQuery({ query: OBTENER_CAMAS });
                // Aquí, actualiza obtenerCamas según sea necesario
                cache.writeQuery({
                    query: OBTENER_CAMAS,
                    data: { obtenerCamas: actualizarPaciente },
                });
            } catch (error) {
                console.log("No se pudo actualizar OBTENER_CAMAS: ", error);
            }
        },
    }); */

    const [actualizarPaciente] = useMutation(ACTUALIZAR_PACIENTE, {
        refetchQueries: [
            { query: OBTENER_PACIENTE, variables: { id: id } },
            { query: OBTENER_CAMAS_DISPONIBLES },
            { query: OBTENER_CAMAS }
        ],
    });

    //console.log("obtenerPaciente", obtenerPaciente);

    const ultimaAdmision = obtenerPaciente.admision_relacionada?.slice(-1)[0] || null;
    const camaActual = ultimaAdmision?.cama_relacionada?.slice(-1)[0]?.cama_numero || null;
    
    const initialValues  = {
        servicio_tratante: obtenerPaciente.servicio_tratante,
        expediente: obtenerPaciente.expediente,
        pac_apellido_paterno: obtenerPaciente.pac_apellido_paterno,
        pac_apellido_materno: obtenerPaciente.pac_apellido_materno,
        pac_nombre: obtenerPaciente.pac_nombre,
        pac_genero: obtenerPaciente.pac_genero,
        pac_FN: obtenerPaciente.pac_FN ? format(new Date(obtenerPaciente.pac_FN), 'yyyy-MM-dd') : '',
        pac_dispositivo_o2: obtenerPaciente.pac_dispositivo_o2,
        pac_hemodialisis: obtenerPaciente.pac_hemodialisis,
        diagnostico1: obtenerPaciente.diagnostico1 || [],
        diagnostico: obtenerPaciente.diagnostico,
        caracteristicas_especiales: obtenerPaciente.caracteristicas_especiales || [],
        pac_codigo_uveh: obtenerPaciente.pac_codigo_uveh || [],
        pac_aislamiento: obtenerPaciente.pac_aislamiento,
        fecha_ingreso: ultimaAdmision?.fecha_ingreso ? format(new Date(ultimaAdmision.fecha_ingreso), 'yyyy-MM-dd HH:mm') : undefined,
        fecha_prealta: ultimaAdmision?.fecha_prealta ? format(new Date(ultimaAdmision.fecha_prealta), 'yyyy-MM-dd HH:mm') : undefined,
        fecha_egreso: ultimaAdmision?.fecha_egreso ? format(new Date(ultimaAdmision.fecha_egreso), 'yyyy-MM-dd') : undefined,
        hospitalizado: ultimaAdmision?.hospitalizado || false,
        cama_relacionada: camaActual
    };

    const actualizarInfoPaciente = async valores => {
        setActualizando(true); // Desactiva el botón al iniciar la actualización
        try {
            // Incluye la cama asignada si está disponible
            const valoresActualizados = {
                ...valores,
                cama_relacionada: cama && childData ? cama : valores.cama_relacionada
            };
    
            await actualizarPaciente({
                variables: {
                    id,
                    input: valoresActualizados
                }
            });
    
            setActualizando(false);
            Swal.fire(
                'Actualizado', 
                'El paciente se actualizó correctamente', 
                'success');
            onClose();
        } catch (error) {
            setActualizando(false); // Reactiva el botón si hay un error
            handleUpdateError(error);
        }
    };

    const handleUpdateError = (error) => {
        console.error("Errores en graphQL:", error);
        Swal.fire({
            icon: 'error',
            title: 'Errores de validación',
            text: 'Por favor, revise los datos del formulario.',
            footer: 'Detalles del error en la consola.'
        });
    
        let mensajeError = getErrorMessage(error);
        guardarMensaje(mensajeError);
        setTimeout(() => guardarMensaje(null), 10000);
    };
    
    const getErrorMessage = (error) => {
        if (error.networkError?.result?.errors) {
            return error.networkError.result.errors.map(err => err.message).join(", ");
        }
        if (error.networkError) {
            return `Error de red: ${error.networkError.message}`;
        }
        if (error.graphQLErrors) {
            return `Error en GraphQL: ${error.graphQLErrors.map(err => err.message).join(", ")}`;
        }
        return `Error: ${error.message}`;
    };


    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 
        
        <>
        <ModalGeneralAncho isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex justify-center mt-2">
                <div className="w-full max-w-7xl">
                {mensaje && mostrarMensaje()}
                    <FormPatientEdit
                        initialValues={initialValues}
                        validationSchema={validationSchemaPatient}
                        onSubmit={actualizarInfoPaciente}
                        camaActual={camaActual}
                        onData={handleDataFromChild}
                        actualizando={actualizando}
                        
                    />
                </div>
            </div>
        </ModalGeneralAncho>
        </>
     );
}