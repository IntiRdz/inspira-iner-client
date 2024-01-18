import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';

import Swal from 'sweetalert2';

import { OBTENER_PACIENTE, OBTENER_ADMISION } from '../../graphql/queries';
import { ACTUALIZAR_PROGRAMA_INTEGRAL } from '../../graphql/mutations';

import { validationSchemaPrograma } from '../../components/forms/validationSchemas';
import FormProgramaIntegralPaliativosEdit from '../forms/FormProgramaIntegralPaliativosEdit';

import ModalGeneral from '../modals/ModalGeneral';

export default function ProgramaPaliativosEditar ({ admonId, paciente, programaintegral, diagnostico, isOpen, onClose  }) {
  
  //console.log("Microorganismo Prop",microorganismo ); // Esto te mostrará si el microorganismo está llegando
  
  const [mensaje, guardarMensaje] = useState(null);


  console.log("Llegamsos a programa paliativos editar");

  const pacId = paciente.id;
  const id = programaintegral.id;

  console.log("ID programa integral desde paliativos", id);

  const [isModalOpen, setIsModalOpen] = useState(isOpen);
    // Sincroniza el estado local del modal con el prop 'isOpen'
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const closeModal = () => {
        onClose(); // Cierra el modal utilizando la función del padre
    };

  const [actualizarProgramaIntegral] = useMutation(ACTUALIZAR_PROGRAMA_INTEGRAL, {
    refetchQueries: [
        { query: OBTENER_PACIENTE, variables: { id: pacId } },
        { query: OBTENER_ADMISION, variables: { id: admonId } }
    ],
    });

  const initialValues  = {
/*     fecha_diagnostico: programaintegral.fecha_diagnostico ? format(new Date(programaintegral.fecha_diagnostico), 'yyyy-MM-dd') : '',
    fecha_resolucion: programaintegral.fecha_resolucion ? format(new Date(programaintegral.fecha_resolucion), 'yyyy-MM-dd') : undefined, */
    programa_paliativos_sorpresa: programaintegral.programa_paliativos_sorpresa ? programaintegral.programa_paliativos_sorpresa : '',
    programa_paliativos_perdida_funcionalidad: programaintegral.programa_paliativos_perdida_funcionalidad ? programaintegral.programa_paliativos_perdida_funcionalidad : '',
    programa_paliativos_perdida_nutricional: programaintegral.programa_paliativos_perdida_nutricional ? programaintegral.programa_paliativos_perdida_nutricional : '',
    programa_paliativos_multimorbilidad: programaintegral.programa_paliativos_multimorbilidad ? programaintegral.programa_paliativos_multimorbilidad : '',
    programa_paliativos_recursosOingresos: programaintegral.programa_paliativos_recursosOingresos ? programaintegral.programa_paliativos_recursosOingresos : '',
    programa_paliativos_otraEnfermedaAvanzada: programaintegral.programa_paliativos_otraEnfermedaAvanzada || '',
    programa_paliativos_total: programaintegral.programa_paliativos_total || '',
    programa_paliativos_ecog: programaintegral.programa_paliativos_ecog || '',
};

const actualizarInfoProgramaIntegral = async (valores) => {
    try {
      const { data } = await actualizarProgramaIntegral({
        variables: {
          id,
          input: valores,
        },
      });
      //console.log("Respuesta de GraphQL", data);
      // Mostrar Alerta
      Swal.fire(
          'Actualizado',
          'Se actualizó correctamente el programa integral del paciente.',
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
                    <FormProgramaIntegralPaliativosEdit
                        initialValues={initialValues}
                        validationSchema={validationSchemaPrograma}
                        onSubmit={actualizarInfoProgramaIntegral}    
                        />
                </div>
            </div>
        </ModalGeneral>
        {mensaje && mostrarMensaje()}
    </>
  );
}
