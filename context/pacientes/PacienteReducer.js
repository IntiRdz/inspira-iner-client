import {
    SELECCIONAR_CAMA,
} from '../../types'


export default ( state, action ) => {
    switch(action.type) {
        case SELECCIONAR_CAMA: 
            return {
                ...state,
                cama: action.payload
            }
        default: 
            return state
    }
}