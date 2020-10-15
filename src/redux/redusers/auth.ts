import {api} from "../../api/api";
import {setBasketDataAC} from "./basket";
import {CardDataType} from "./card";

let setAuthData = 'SET-AUTH-DATA'
let login = 'LOGIN'
let logout = 'LOGOUT'
let setProfile = 'SET-PROFILE'

type AuthDataType = {
    _id: string
    fullname: string
    email: string
    password: string
    basket: Array<CardDataType>
    own: boolean
}

type InitiallStateType = {
    authData: AuthDataType | null
}
type DataType = {
    fullname?: string
    email: string
    password: string
}
let initiallState: InitiallStateType = {
    authData: null,
    /*profile: null*/
}

const authReducer = (state = initiallState, action: any): InitiallStateType => {
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
        /*case setProfile:
            return {
                ...state,
                profile: action.payload
            }*/

        default:
            return state;
    }
}

type SetAuthDataType = {
    type: typeof setAuthData
    payload: DataType
}
export const setAuthDataAC = (data: DataType): SetAuthDataType =>
    ({
        type: setAuthData, payload: data
    });

type LoginType = {
    type: typeof login
    payload: DataType
}
export const loginAC = (data: DataType): LoginType =>
    ({
        type: login, payload: data
    });
/*export const setProfileDataAC = (data) =>
    ({
        type: setProfile, payload: data
    });*/

export const setAuthDataThunkCreater = (data: DataType) => {
    debugger
    return async (dispatch: any) => {
        let response = await api.setAuthData(data)
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            await dispatch(setAuthDataAC(response.data.userData))
            dispatch(setBasketDataAC(response.data.userData.basket))
        }
    }
}
export const loginThunkCreater = (data: DataType) => {
    debugger
    return async (dispatch: any) => {
        let response = await api.loginData(data)
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            dispatch(setAuthDataAC(response.data.userData))
            /*dispatch(setBasketDataAC(response.data.userData.basket))*/
        }
    }
}
export const getProfileFetchThunkCreater = () => {
    return async (dispatch: any) => {
        const token = localStorage.token
        if (token) {
            let response = await api.fetch(token)
            if (response.data.messange) {
                localStorage.removeItem("token")
            } else if (response.status === 200) {
                dispatch(setAuthDataAC(response.data.userData))
                dispatch(setBasketDataAC(response.data.userData.basket))
            }

        }
    }
}
/*export const getProfileThunkCreater = (id: string) => {
    return async (dispatch: any) => {
        let response = await api.getProfile(id)
                if(response.status === 200) {
                    dispatch(setProfileDataAC(response.data))
                }

    }
}*/


export default authReducer;
