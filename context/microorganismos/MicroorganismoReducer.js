import {
    SELECCIONAR_MICROORGANISMO
} from '../../types'


export default ( state, action ) => {
    switch(action.type) {
        case SELECCIONAR_MICROORGANISMO: 
            return {
                ...state,
                microorganismo: action.payload
            }
        default: 
            return state
    }
}