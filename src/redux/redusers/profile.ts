import {api} from "../../api/api";

let setProfile = 'SET-PROFILE'

type ProfileProductType = {
    _id: string
    title: string
    price: number
    model: string
    image: string
    emblem: string
    gender: string
    descript: string
    country: string
    type?: any
    classific?: any
    start_note?: any
    end_node?: any

}
type InitiallStateType = {
    profileProduct: ProfileProductType | null
}
let initiallState: InitiallStateType = {
    profileProduct: null
}
const profileProductReducer = (state = initiallState, action: any) => {
    switch (action.type) {

        case setProfile:
            return {
                ...state,
                profileProduct: action.payload
            }

        default:
            return state;
    }
}

type setProfileDataType = {
    type: typeof setProfile
    payload: ProfileProductType
}
export const setProfileDataAC = (profileProduct: ProfileProductType): setProfileDataType =>
    ({
        type: setProfile, payload: profileProduct
    });

export const getProfileThunkCreater = (id: string) => {
    return async (dispatch: any) => {
        let response = await api.getProfile(id)
        if(response.status === 200) {
            dispatch(setProfileDataAC(response.data))
            debugger
        }

    }
}
export default profileProductReducer