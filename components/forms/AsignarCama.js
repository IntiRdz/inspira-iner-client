import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import { useQuery } from '@apollo/client';
import PacienteContext from '../../context/pacientes/PacienteContext';

import { OBTENER_CAMAS_DISPONIBLES } from '../../graphql/queries'; 


export const AsignarCama = () => {
  

    const[cama, setCama] =useState({});

    //Context de cama
    const { agregarCama } = useContext(PacienteContext);
   
    //console.log("Cama ID subida al contexto",cama.id)

    const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES)
    
    
    useEffect(() => {
      agregarCama(cama.id);
  }, [cama.id]);
   
    const seleccionarCama = camas => {
        setCama(camas);
      }
      
    if(loading) return 'cargando...';

    const { obtenerCamasDisponibles } = data;
    
   
    return ( 

        <>
            <Select
                className="mt-3"
                options={ obtenerCamasDisponibles }
                onChange={ opcion => seleccionarCama(opcion) }
                getOptionValue={ opciones => opciones.id }
                getOptionLabel={ opciones => opciones.cama_numero }
                placeholder="Busque o Seleccione la Cama"
                /* isClearable={true} */ // Esto permite que la opción sea opcional
                noOptionsMessage={() => "No se encuentra esa cama disponible"}
            />
{/*               {cama.id && (
                <p className="text-sm text-gray-600">Cama seleccionada: {cama.id}</p>
            )} */}
        </>
     );
}
 