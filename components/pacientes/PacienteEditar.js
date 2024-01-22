import React, { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import PacienteContext from '../../context/pacientes/PacienteContext';


import { OBTENER_CAMAS_DISPONIBLES, OBTENER_PACIENTE } from '../../graphql/queries';
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

    const id = obtenerPaciente.id;

    const { cama } = useContext(PacienteContext);

    const handleDataFromChild = (data) => {
        setChildData(data);
    }

    // Sincroniza el estado local del modal con el prop 'isOpen'
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const closeModal = () => {
        onClose(); // Cierra el modal utilizando la función del padre
    };


    const [actualizarPaciente] = useMutation(ACTUALIZAR_PACIENTE, {
        refetchQueries: [
            { query: OBTENER_PACIENTE, variables: { id: id } },
            { query: OBTENER_CAMAS_DISPONIBLES }
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
        fecha_ingreso: ultimaAdmision?.fecha_ingreso ? format(new Date(ultimaAdmision.fecha_ingreso), 'yyyy-MM-dd HH:mm') : '',
        fecha_prealta: ultimaAdmision?.fecha_prealta ? format(new Date(ultimaAdmision.fecha_prealta), 'yyyy-MM-dd HH:mm') : '',
        fecha_egreso: ultimaAdmision?.fecha_egreso ? format(new Date(ultimaAdmision.fecha_egreso), 'yyyy-MM-dd') : '',
        hospitalizado: ultimaAdmision?.hospitalizado || false,
        cama_relacionada: camaActual
    };

    const actualizarInfoPaciente = async valores => {
        const { 
            servicio_tratante,
            expediente,
            pac_apellido_paterno,
            pac_apellido_materno,
            pac_nombre,
            pac_genero,
            pac_FN,
            pac_dispositivo_o2,
            pac_hemodialisis,
            diagnostico1,
            creado,
            diagnostico,
            caracteristicas_especiales,
            pac_codigo_uveh,
            pac_aislamiento,
            fecha_ingreso,
            fecha_prealta,
            fecha_egreso,
            hospitalizado,
            cama_relacionada
        } = valores;

        //console.log("Valores Inciales:", valores)

        const valoresActualizados = {
            servicio_tratante,
            expediente,
            pac_apellido_paterno,
            pac_apellido_materno,
            pac_nombre,
            creado,
            pac_genero,
            pac_FN,
            pac_dispositivo_o2,
            pac_hemodialisis,
            diagnostico1,
            diagnostico,
            caracteristicas_especiales,
            pac_codigo_uveh,
            pac_aislamiento,
            fecha_ingreso: fecha_ingreso === '' ? undefined : fecha_ingreso, // Si es cadena vacía, se envía undefined
            fecha_prealta: fecha_prealta === '' ? undefined : fecha_prealta, // Si es cadena vacía, se envía undefined
            fecha_egreso: fecha_egreso === '' ? undefined : fecha_egreso,
            hospitalizado,
        };
        // Si se muestra el componente childData y hay una cama asignada, incluir en los valores actualizados
        if (cama && childData) {
            valoresActualizados.cama_relacionada = cama;
        }

        //console.log("Valores actualizados:", valoresActualizados)

        try {
            const { data} = await actualizarPaciente({
                variables: {
                    id,
                    input: valoresActualizados
                }
            });
            //console.log("Respuesta de GraphQL", data);
            // Mostrar Alerta
            Swal.fire(
                'Actualizado',
                'El paciente se actualizó correctamente',
                'success'
            )

            // Redireccionar
            //router.push(`/editarpaciente/${id}`);
            onClose();
            
        } catch (error) {
            console.error("Errores en graphQL:", error);
            Swal.fire({
                icon: 'error',
                title: 'Errores de validación',
                text: 'Por favor, revise los datos del formulario.',
                footer: 'Detalles del error en la consola.'
            });
            console.error("Error completo:", error);
        
            let mensajeError = "Error desconocido durante la actualización del paciente.";
        
            // Verificar si es un error de Apollo y tratar de obtener detalles más específicos
            if (error.networkError && error.networkError.result) {
                let errores = error.networkError.result.errors;
                if (errores && errores.length > 0) {
                    // Asumiendo que el servidor devuelve mensajes de error útiles
                    mensajeError = errores.map(err => err.message).join(", ");
                }
            } else if (error.networkError) {
                mensajeError = `Error de red: ${error.networkError.message}`;
            } else if (error.graphQLErrors) {
                mensajeError = `Error en GraphQL: ${error.graphQLErrors.map(err => err.message).join(", ")}`;
            } else {
                mensajeError = `Error: ${error.message}`;
            }
        
            guardarMensaje(mensajeError);
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                guardarMensaje(null);
            }, 10000);
        }
    }


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
                        
                    />
                </div>
            </div>
        </ModalGeneralAncho>
        </>
     );
}