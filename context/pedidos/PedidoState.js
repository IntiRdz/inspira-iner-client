import  React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_PACIENTE,
    SELECCIONAR_CAMA,
    CANTIDAD_CAMAS,
    ACTUALIZAR_TOTAL
} from '../../types'

const PedidoState = ({children}) => {

    // State de Pedidos
    const initialState = {
        paciente: {},
        camas: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    // Modifica el Paciente
    const agregarPaciente = paciente => {
        // console.log(paciente);

        dispatch({
            type: SELECCIONAR_PACIENTE,
            payload: paciente
        })
    }

    // Modifica los camas
    const agregarCama = camasSeleccionadas => {

        let nuevoState;
        if(state.camas.length > 0 ) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = camasSeleccionadas.map( cama => {
                const nuevoObjeto = state.camas.find( camaState => camaState.id === cama.id  );
                return {...cama, ...nuevoObjeto }
            } )
        } else {
            nuevoState = camasSeleccionadas;
        }
       
        dispatch({
            type: SELECCIONAR_CAMA,
            payload: nuevoState
        })
    }

    // Modifica las cantidades de los camas
    const cantidadCamas = nuevoCama => {
        dispatch({
            type: CANTIDAD_CAMAS,
            payload: nuevoCama
        })
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }


    return (
        <PedidoContext.Provider
            value={{
                paciente: state.paciente,
                camas: state.camas,
                total: state.total,
                agregarPaciente,
                agregarCama,
                cantidadCamas,
                actualizarTotal
            }}
        > {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;