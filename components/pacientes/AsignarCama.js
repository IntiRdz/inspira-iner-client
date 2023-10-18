import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client';
import PacienteContext from '../../context/pacientes/PacienteContext';

  const OBTENER_CAMAS_DISPONIBLES = gql`
    query obtenerCamasDisponibles {
        obtenerCamasDisponibles {
                _id
                cama_numero
                cama_disponible
                cama_ocupada
        }
    }
`;

export const AsignarCama = () => {
  

    const[cama, setCama] =useState({});

    //Context de cama
    const { agregarCama } = useContext(PacienteContext);
   
    console.log("Cama ID",cama._id)

    const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES)
    
    useEffect(() => {
         agregarCama (cama._id);
     }, [cama._id])
   
    const seleccionarCama = camas => {
        setCama(camas);
      }

    if(loading) return 'cargando...';

    const { obtenerCamasDisponibles } = data;
    
   
    return ( 

        <>
          <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">Asignar cama a paciente</p>
            <Select
                className="mt-3"
                options={ obtenerCamasDisponibles }
                onChange={ opcion => seleccionarCama(opcion) }
                getOptionValue={ opciones => opciones._id }
                getOptionLabel={ opciones => opciones.cama_numero }
                placeholder="Busque o Seleccione la Cama"
                noOptionsMessage={() => "No se encuentra esa cama disponible"}
            />
              {cama._id && (
                <p className="text-sm text-gray-600">Cama seleccionada: {cama._id}</p>
            )}
        </>
     );
}
 