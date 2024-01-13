import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';

import Swal from 'sweetalert2';

import { OBTENER_PACIENTE } from '../../graphql/mutations';
import { ACTUALIZAR_MICROORGANISMO } from '../../graphql/mutations';

import { validationSchemaMicro } from '../../components/forms/validationSchemas';
import FormMicroEdit from '../forms/FormMicroEdit';

import ModalGeneral from '../modals/ModalGeneral';


export default function DiagnosticoEditar({ microorganismo, obtenerPaciente, isOpen, onClose  }) {
  
  //console.log("Microorganismo Prop",microorganismo ); // Esto te mostrará si el microorganismo está llegando
  
  const router = useRouter();
  const [mensaje, guardarMensaje] = useState(null);

  const pacId = obtenerPaciente.id;
  const id = microorganismo.id;


  const [isModalOpen, setIsModalOpen] = useState(isOpen);
    // Sincroniza el estado local del modal con el prop 'isOpen'
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const closeModal = () => {
        onClose(); // Cierra el modal utilizando la función del padre
    };

  const [actualizarMicroorganismo] = useMutation(ACTUALIZAR_MICROORGANISMO, {
    refetchQueries: [
        { query: OBTENER_PACIENTE, variables: { id: pacId } },
        { query: OBTENER_ULTIMA_ADMISION_PACIENTE, variables: { id: pacId } }
    ],
    });

  const initialValues  = {
    fecha_deteccion: microorganismo.fecha_deteccion ? format(new Date(microorganismo.fecha_deteccion), 'yyyy-MM-dd') : '',
    metodo_deteccion: microorganismo.metodo_deteccion,
    microorganismo_tipo: microorganismo.microorganismo_tipo,
    microorganismo_nombre: microorganismo.microorganismo_nombre,
    susceptibilidad: microorganismo.susceptibilidad,
    comentario_uveh: microorganismo.comentario_uveh,
};

//console.log("initialValues",initialValues); // Esto te mostrará si el microorganismo está llegando

const actualizarInfoMicroorganismo = async (valores) => {
    try {
      const { data } = await actualizarMicroorganismo({
        variables: {
          id,
          input: valores,
        },
      });
      console.log("Respuesta de GraphQL", data);
      // Mostrar Alerta
      Swal.fire(
          'Actualizado',
          'El microorganismo se actualizó correctamente',
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
        <ModalGeneral isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex justify-center mt-2">
                <div className="w-full max-w-lg">
                    <FormMicroEdit
                        initialValues={initialValues}
                        validationSchema={validationSchemaMicro}
                        onSubmit={actualizarInfoMicroorganismo}    
                        /* onClose={onClose}  */ 
                        />
                </div>
            </div>
        </ModalGeneral>
        {mensaje && mostrarMensaje()}
    </>
  );
}
