import  React, { useReducer } from 'react';
import PacienteContext from './PacienteContext';
import PacienteReducer from './PacienteReducer';

import {
    SELECCIONAR_PACIENTE,
    SELECCIONAR_CAMA,
} from '../../types'

const PacienteState = ({children}) => {

    // State de Pedidos
    const initialState = {
        paciente: {},
        cama: {},
    }

    const [ state, dispatch ] = useReducer(PacienteReducer, initialState);


    // Modifica el Paciente
    const agregarCama = cama => {
        //console.log(cama);

        dispatch({
            type: SELECCIONAR_CAMA,
            payload: cama
        })
    }
    
    return (
        <PacienteContext.Provider
            value={{
                paciente: state.paciente,
                cama: state.cama,
                agregarCama,
            }}
        > {children}
        </PacienteContext.Provider>
    )
}

export default PacienteState;