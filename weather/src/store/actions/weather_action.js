import * as actionType from './actionTypes'
import axios from 'axios'

const API_KEY = '2d61e029b2ceb5e6ee95965c1c1d3bd2'

export const getCurrentLocation = (cord) => {
    return {
        type: actionType.GET_CURRENT_LOCATION,
        location_cord: cord
    }
}

export const getCurrentLocationStart = (error) => {
    return {
        type: actionType.GET_CURRENT_LOCATION_START,
        error: error
    }
}

export const getCurrentLocationFail = (error) => {
    return {
        type: actionType.GET_CURRENT_LOCATION_FAIL,
        error: error
    }
}

export const getWeather = (weather) => {
    return {
        type: actionType.GET_WEATHER,
        weather: weather
    }
}

export const loadingStart = () => {
    return {
        type: actionType.LOADING
    }
}
export const loadingEnd = () => {
    return {
        type: actionType.LOADING_END
    }
}
export const fetchWeather = (data) => {
    return async dispatch => {
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lng}&cnt=10&appid=${API_KEY}&units=metric`)
            .then(res => {
                dispatch(getWeather(res.data))
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const search = (data) => {
    return {
        type: actionType.SEARCH,
        data: data
    }
}
export const searchError = () => {
    return {
        type: actionType.SEARCH_ERROR
    }
}
export const clearSearch = () => {
    return {
        type: actionType.CLEARSEARCH
    }
}

export const addToSave = (data) => {
    return {
        type: actionType.ADD_TO_SAVE,
        data: data
    }
}
export const saveSearch = (id) => {
    return dispatch => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`)
            .then(response => {
                console.log(response.data)
                dispatch(addToSave(response.data))
            })
            .catch(err => {

            })
    }
}
export const submitSearch = (data) => {
    return async (dispatch) => {
        dispatch(loadingStart())
        setTimeout(async () => {
            await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${data}&cnt=20&appid=${API_KEY}&units=metric`)
                .then(response => {
                    if (!response.data.list) {
                        dispatch(searchError())
                    } else {
                        dispatch(search(response.data))
                        dispatch(loadingEnd())
                    }
                })
                .catch(err => {
                    dispatch(searchError())
                    dispatch(loadingEnd())
                })
        }, 2000)
    }
}