import  React, { useReducer } from 'react';
import PacienteContext from './PacienteContext';
import PacienteReducer from './PacienteReducer';

import {
    SELECCIONAR_PACIENTE,
    SELECCIONAR_DIAGNOSTICO,
    SELECCIONAR_CAMA,
    SELECCIONAR_MICROORGANISMO
} from '../../types'

const PacienteState = ({children}) => {

    // State de Pedidos
    const initialState = {
        paciente: {},
        diagnostico: {},
        cama: {},
        microorganismo:{}
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
    const agregarDiagnostico = diagnostico => {
        //console.log(cama);
        dispatch({
            type: SELECCIONAR_DIAGNOSTICO,
            payload: diagnostico
        })
    }
    const agregarMicroorganismo = microorganismo => {
        //console.log(cama);
        dispatch({
            type: SELECCIONAR_MICROORGANISMO,
            payload: microorganismo
        })
    }
    
    return (
        <PacienteContext.Provider
            value={{
                paciente: state.paciente,
                diagnostico: state.diagnostico,
                cama: state.cama,
                microorganismo: state.microorganismo,
                agregarCama,
                agregarDiagnostico,
                agregarMicroorganismo
            }}
        > {children}
        </PacienteContext.Provider>
    )
}

export default PacienteState;