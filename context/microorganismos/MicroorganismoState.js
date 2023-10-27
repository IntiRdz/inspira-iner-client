import  React, { useReducer } from 'react';
import MicroorganismoContext from './MicroorganismoContext';
import MicroorganismoReducer from './MicroorganismoReducer';

import {
    SELECCIONAR_MICROORGANISMO,
} from '../../types'

const MicroorganismoState = ({children}) => {

    // State de Pedidos
    const initialState = {
        microorganismo: [],
    }

    const [ state, dispatch ] = useReducer(MicroorganismoReducer, initialState);


    // Modifica al microorganismo
    const agregarMicroorganismo = microorganismo => {
        //console.log(cama);

        dispatch({
            type: SELECCIONAR_MICROORGANISMO,
            payload: microorganismo
        })
    }
    
    return (
        <MicroorganismoContext.Provider
            value={{
                microorganismo: state.microorganismo,
                agregarMicroorganismo,
            }}
        > {children}
        </MicroorganismoContext.Provider>
    )
}

export default MicroorganismoState;