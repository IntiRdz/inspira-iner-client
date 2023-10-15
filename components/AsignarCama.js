import React, { useState } from 'react';
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client';

  
  const OBTENER_CAMAS_DISPONIBLES = gql`
    query obtenerCamasDisponibles {
        obtenerCamasDisponibles {
                id
                cama_numero
                cama_disponible
                cama_ocupada
        }
    }
`;

const AsignarCama = () => {
  const handleCamaSelection = (camaId) => {
    setSelectedCamaId(camaId);
  };

    const[cama, setCama] =useState([]);
    const [selectedCamaId, setSelectedCamaId] = useState(null);


    const { data, loading, error } = useQuery(OBTENER_CAMAS_DISPONIBLES)
    console.log(data)
    // console.log(loading)
    // console.log(error)
    
    
    const seleccionarCama = camas => {
        setCama(camas);
        setSelectedCamaId(camas.id);
      }
    
    if(loading) return 'cargando...';


    const { obtenerCamasDisponibles } = data;

    return ( 

        <>

            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asignar cama a paciente</p>
            <Select
                className="mt-3"
                options={ obtenerCamasDisponibles }
                onChange={ opcion => seleccionarCama(opcion) }
                getOptionValue={ opciones => opciones.id }
                getOptionLabel={ opciones => opciones.cama_numero }
                placeholder="Busque o Seleccione la Cama"
                noOptionsMessage={() => "No hay resultados"}
            />
              {selectedCamaId && (
                <p className="text-sm text-gray-600">Cama seleccionada: {selectedCamaId}</p>
            )}

        </>
     );
}
 
export default AsignarCama;