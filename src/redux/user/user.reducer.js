const INICIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INICIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURREN_USER':
            return {
                ...state, 
                currentUser: action.payload 
            }

        default:
            return state

    }
}

export default userReducer;