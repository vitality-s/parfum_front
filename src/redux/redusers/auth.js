import {api} from "../../api/api";
import { setBasketDataAC} from "./basket";
let setAuthData = 'SET-AUTH-DATA'
let login = 'LOGIN'
let logout = 'LOGOUT'
let setProfile = 'SET-PROFILE'

let initiallState = {
    authData: null,
    profile: null
}

const authReducer = (state = initiallState, action) => {
    switch (action.type) {

        case setAuthData:
            return {
                ...state,
                authData: action.payload
            }
        case login:
            return {
                ...state,
                authData: action.payload
            }
        case logout:
            return {
                ...state,
                authData: null
            }
        case setProfile:
            return {
                ...state,
                profile: action.payload
            }

        default:
            return state;
    }
}


export const setAuthDataAC = (data) =>
    ({
        type: setAuthData, payload: data
    });
export const loginAC = (data) =>
    ({
        type: login, payload: data
    });
export const setProfileDataAC = (data) =>
    ({
        type: setProfile, payload: data
    });

export const setAuthDataThunkCreater = (data) => {
    debugger
    return (dispatch) => {
        return api.setAuthData(data)
            .then(async response => {
                if(response.status === 200) {
                    localStorage.setItem('token', response.data.token)
                    await dispatch(setAuthDataAC(response.data.userData))
                    dispatch(setBasketDataAC(response.data.userData.basket))
                }
            })
    }
}
export const loginThunkCreater = (data) => {
    debugger
    return (dispatch) => {
        return api.loginData(data)
            .then(response => {
                debugger
                if(response.status === 200) {
                    localStorage.setItem('token', response.data.token)
                    dispatch(setAuthDataAC(response.data.userData))
                    /*dispatch(setBasketDataAC(response.data.userData.basket))*/
                }
            })
    }
}
export const getProfileFetchThunkCreater = () => {
    return (dispatch) => {
        const token = localStorage.token
        if(token) {
            return api.fetch(token)
                .then(response => {
                    if(response.data.messange) {
                        localStorage.removeItem("token")
                    } else if (response.status === 200) {
                        dispatch(setAuthDataAC(response.data.userData))
                        dispatch(setBasketDataAC(response.data.userData.basket))
                    }

                })
        }
    }
}
export const getProfileThunkCreater = (id) => {
    return (dispatch) => {
        debugger
        return api.getProfile(id)
            .then(response => {
                debugger
                if(response.status === 200) {
                    dispatch(setProfileDataAC(response.data))
                }
            })
    }
}


export default authReducer;
