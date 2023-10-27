import {
    SELECCIONAR_CAMA,
    SELECCIONAR_DIAGNOSTICO,
    SELECCIONAR_MICROORGANISMO
} from '../../types'


export default ( state, action ) => {
    switch(action.type) {
        case SELECCIONAR_CAMA: 
            return {
                ...state,
                cama: action.payload
            }
        case SELECCIONAR_DIAGNOSTICO: 
        return {
            ...state,
            diagnostico: action.payload
        }
        case SELECCIONAR_MICROORGANISMO: 
        return {
            ...state,
            diagnostico: action.payload
        }

        default: 
            return state
    }
}