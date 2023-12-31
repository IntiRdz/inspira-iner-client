import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client';
import PacienteContext from '../../context/pacientes/PacienteContext';

import { OBTENER_CAMAS } from '../../graphql/queries'; 


export const AsignarCamaTodas = () => {
  

    const[cama, setCama] =useState({});

    //Context de cama
    const { agregarCama } = useContext(PacienteContext);
   
    console.log("Cama ID",cama.id)

    const { data, loading, error } = useQuery(OBTENER_CAMAS)
    
    useEffect(() => {
         agregarCama (cama.id);
     }, [cama.id])
   
    const seleccionarCama = camas => {
        setCama(camas);
      }

    if(loading) return 'cargando...';

    const { obtenerCamas } = data;
    
   
    return ( 

        <>
          <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">Cama actual</p>
            <Select
                className="mt-3"
                options={ obtenerCamas }
                onChange={ opcion => seleccionarCama(opcion) }
                getOptionValue={ opciones => opciones.id }
                getOptionLabel={ opciones => opciones.cama_numero }
                placeholder="Busque o Seleccione la Cama"
                noOptionsMessage={() => "No se encuentra ese número de cama"}
            />
              {cama.id && (
                <p className="text-sm text-gray-600">Cama seleccionada: {cama.id}</p>
            )}
        </>
     );
}
 