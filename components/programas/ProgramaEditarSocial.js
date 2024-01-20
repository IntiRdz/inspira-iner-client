import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Swal from 'sweetalert2';

import { OBTENER_PACIENTE, OBTENER_ADMISION } from '../../graphql/queries';
import { ACTUALIZAR_PROGRAMA_INTEGRAL } from '../../graphql/mutations';

import { validationSchemaPrograma } from '../../components/forms/validationSchemas';
import FormProgramaIntegralSocialEdit from '../forms/FormProgramaIntegralSocialEdit';

import ModalGeneral from '../modals/ModalGeneral';

export default function ProgramaEditarSocial ({ admonId, paciente, programaintegral, diagnostico, isOpen, onClose  }) {
  
  //console.log("Microorganismo Prop",microorganismo ); // Esto te mostrará si el microorganismo está llegando
  
  const [mensaje, guardarMensaje] = useState(null);


  console.log("Llegamsos a programa social editar");

  const pacId = paciente.id;
  const id = programaintegral.id;

  //console.log("ID programa integral desde social", id);

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
    programa_social_grupo_etario: programaintegral.programa_social_grupo_etario !== null && programaintegral.programa_social_grupo_etario !== undefined ? programaintegral.programa_social_grupo_etario : '',
    programa_social_genero: programaintegral.programa_social_genero !== null && programaintegral.programa_social_genero !== undefined ? programaintegral.programa_social_genero : '',
    programa_social_orientacion_sexual: programaintegral.programa_social_orientacion_sexual !== null && programaintegral.programa_social_orientacion_sexual !== undefined ? programaintegral.programa_social_orientacion_sexual : '',
    programa_social_municipio: programaintegral.programa_social_municipio !== null && programaintegral.programa_social_municipio !== undefined ? programaintegral.programa_social_municipio : '',
    programa_social_estado: programaintegral.programa_social_estado !== null && programaintegral.programa_social_estado !== undefined ? programaintegral.programa_social_estado : '',
    programa_social_pais: programaintegral.programa_social_pais !== null && programaintegral.programa_social_pais !== undefined ? programaintegral.programa_social_pais : '',
    programa_social_zona_marginada: programaintegral.programa_social_zona_marginada !== null && programaintegral.programa_social_zona_marginada !== undefined ? programaintegral.programa_social_zona_marginada: '',
    programa_social_condicion_social: programaintegral.programa_social_condicion_social !== null && programaintegral.programa_social_condicion_social !== undefined ? programaintegral.programa_social_condicion_social : '',
    programa_social_deficit_economico: programaintegral.programa_social_deficit_economico !== null && programaintegral.programa_social_deficit_economico !== undefined ? programaintegral.programa_social_deficit_economico : '',
    programa_social_migrante: programaintegral.programa_social_migrante !== null && programaintegral.programa_social_migrante !== undefined ? programaintegral.programa_social_migrante : '',
    programa_social_abandono_social: programaintegral.programa_social_abandono_social !== null && programaintegral.programa_social_abandono_social !== undefined ? programaintegral.programa_social_abandono_social : '',
    programa_social_situacion_calle: programaintegral.programa_social_situacion_calle !== null && programaintegral.programa_social_situacion_calle !== undefined ? programaintegral.programa_social_situacion_calle : '',
    programa_social_red_apoyo: programaintegral.programa_social_red_apoyo !== null && programaintegral.programa_social_red_apoyo !== undefined ? programaintegral.programa_social_red_apoyo : '',
    programa_social_tipo_familia: programaintegral.programa_social_tipo_familia !== null && programaintegral.programa_social_tipo_familia !== undefined ? programaintegral.programa_social_tipo_familia : '',
    programa_social_idioma: programaintegral.programa_social_idioma !== null && programaintegral.programa_social_idioma !== undefined ? programaintegral.programa_social_idioma : 'Español',
    programa_social_lengua_indigena: programaintegral.programa_social_lengua_indigena !== null && programaintegral.programa_social_lengua_indigena !== undefined ? programaintegral.programa_social_lengua_indigena : 'No',
    programa_social_discapacidad_cdpd: programaintegral.programa_social_discapacidad_cdpd !== null && programaintegral.programa_social_discapacidad_cdpd !== undefined ? programaintegral.programa_social_discapacidad_cdpd : 'Ninguna',
    programa_social_escolaridad: programaintegral.programa_social_escolaridad !== null && programaintegral.programa_social_escolaridad !== undefined ? programaintegral.programa_social_escolaridad : '',
    programa_social_ocupacion: programaintegral.programa_social_ocupacion !== null && programaintegral.programa_social_ocupacion !== undefined ? programaintegral.programa_social_ocupacion : '',
    programa_social_derechohabiencia: programaintegral.programa_social_derechohabiencia !== null && programaintegral.programa_social_derechohabiencia !== undefined ? programaintegral.programa_social_derechohabiencia : '',
    programa_social_religion: programaintegral.programa_social_religion !== null && programaintegral.programa_social_religion !== undefined ? programaintegral.programa_social_religion : 'Católica',
    programa_social_limitada: programaintegral.programa_social_limitada !== null && programaintegral.programa_social_limitada !== undefined ? programaintegral.programa_social_limitada : 'No',
    programa_social_violencia: programaintegral.programa_social_violencia !== null && programaintegral.programa_social_violencia !== undefined ? programaintegral.programa_social_violencia : '',
    programa_social_caso_medicolegal: programaintegral.programa_social_caso_medicolegal !== null && programaintegral.programa_social_caso_medicolegal !== undefined ? programaintegral.programa_social_caso_medicolegal : '',
    programa_social_mater: programaintegral.programa_social_mater !== null && programaintegral.programa_social_mater !== undefined ? programaintegral.programa_social_mater : '',
    programa_social_riesgos_vivienda: programaintegral.programa_social_riesgos_vivienda !== null && programaintegral.programa_social_riesgos_vivienda !== undefined ? programaintegral.programa_social_riesgos_vivienda : '',
    programa_social_vivienda_tipo: programaintegral.programa_social_vivienda_tipo !== null && programaintegral.programa_social_vivienda_tipo !== undefined ? programaintegral.programa_social_vivienda_tipo : '',
    programa_social_vivienda_material: programaintegral.programa_social_vivienda_material !== null && programaintegral.programa_social_vivienda_material !== undefined ? programaintegral.programa_social_vivienda_material : '',
    programa_social_vivienda_servicios: programaintegral.programa_social_vivienda_servicios !== null && programaintegral.programa_social_vivienda_servicios !== undefined ? programaintegral.programa_social_vivienda_servicios : '',
    programa_social_vivienda_cuartos: programaintegral.programa_social_vivienda_cuartos !== null && programaintegral.programa_social_vivienda_cuartos !== undefined ? programaintegral.programa_social_vivienda_cuartos : '',
    programa_social_vivienda_personas: programaintegral.programa_social_vivienda_personas !== null && programaintegral.programa_social_vivienda_personas !== undefined ? programaintegral.programa_social_vivienda_personas : '',
    programa_social_vivienda_hacinamiento: programaintegral.programa_social_vivienda_hacinamiento !== null && programaintegral.programa_social_vivienda_hacinamiento !== undefined ? programaintegral.programa_social_vivienda_hacinamiento : '',
    programa_social_vivienda_atencion_alarma: programaintegral.programa_social_vivienda_atencion_alarma !== null && programaintegral.programa_social_vivienda_atencion_alarma !== undefined ? programaintegral.programa_social_vivienda_atencion_alarma : '',
    programa_social_dispositivo_medicos: programaintegral.programa_social_dispositivo_medicos !== null && programaintegral.programa_social_dispositivo_medicos !== undefined ? programaintegral.programa_social_dispositivo_medicos : '',
    programa_social_animales: programaintegral.programa_social_animales !== null && programaintegral.programa_social_animales !== undefined ? programaintegral.programa_social_animales : '',
    programa_social_animales_tipo: programaintegral.programa_social_animales_tipo !== null && programaintegral.programa_social_animales_tipo !== undefined ? programaintegral.programa_social_animales_tipo : '',
    programa_social_lenia: programaintegral.programa_social_lenia !== null && programaintegral.programa_social_lenia !== undefined ? programaintegral.programa_social_lenia : '',
    programa_social_trabajo_riesgos: programaintegral.programa_social_trabajo_riesgos !== null && programaintegral.programa_social_trabajo_riesgos !== undefined ? programaintegral.programa_social_trabajo_riesgos : '',
    programa_social_barreras_aprendizaje: programaintegral.programa_social_barreras_aprendizaje !== null && programaintegral.programa_social_barreras_aprendizaje !== undefined ? programaintegral.programa_social_barreras_aprendizaje : '',
    programa_social_exposicion_sustancias: programaintegral.programa_social_exposicion_sustancias !== null && programaintegral.programa_social_exposicion_sustancias !== undefined ? programaintegral.programa_social_exposicion_sustancias : 'Ninguna',
    programa_social_exposicion_sustancias_anios: programaintegral.programa_social_exposicion_sustancias_anios !== null && programaintegral.programa_social_exposicion_sustancias_anios !== undefined ? programaintegral.programa_social_exposicion_sustancias_anios : '',
    programa_social_exposicion_sustancias_horas: programaintegral.programa_social_exposicion_sustancias_horas !== null && programaintegral.programa_social_exposicion_sustancias_horas !== undefined ? programaintegral.programa_social_exposicion_sustancias_horas : '',

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
                    <FormProgramaIntegralSocialEdit
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
