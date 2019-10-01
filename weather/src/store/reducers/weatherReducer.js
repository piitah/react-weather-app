import * as actionTypes from '../actions/actionTypes'

const initialState = {
    currentLocationInfo: null,
    searchList: [],
    saved: [],
    loading: false,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_WEATHER:
            return {
                ...state,
                currentLocationInfo: {
                    ...state.currentLocationInfo,
                    ...action.weather
                }
            }
        case actionTypes.CLEARSEARCH: {
            return {
                ...state,
                searchList: []
            }
        }
        case (actionTypes.SEARCH): {
            return {
                ...state,
                error: false,
                searchList: action.data.list
            }
        }
        case actionTypes.LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.LOADING_END: {
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.SEARCH_ERROR: {
            return {
                ...state,
                error: true
            }
        }
        default:
            return state
    }
}

export default reducer