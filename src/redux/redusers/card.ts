import {api} from "../../api/api";

let setCardData = 'SET-CARD-DATA'
let addBasketItem = 'ADD-BASKET-ITEM'
let removeBasketItem = 'REMOVE-BASKET-ITEM'
let filterBy = 'FILTER-BY'
let setSearchValue = 'SET-SEARCH-VALUE'
let removeCatalogItem = 'REMOVE-CATALOG-ITEM'
let addCardData = 'ADD-CARD-DATA'

export type CardDataType = {
    _id: string
    title: string
    price: number
    model: string
        image: string | any
        emblem: string
        gender: string
        descript: string
        country: string
        type: string
        classific: string
    start_note: string
    end_node: string
    isAdd?: boolean
}
type InitiallStateType = {
    cardData: Array<CardDataType>
    filterBy: string | null
    searchQuery: string | null
}
let initiallState: InitiallStateType = {
    cardData: [],
    filterBy: "",
    searchQuery: ""
}

const cardReducer = (state = initiallState, action: any): InitiallStateType => {
    switch (action.type) {
        case addCardData:
            return {
                ...state,
                cardData: [
                    ...state.cardData,
                    action.payload
                ]
            }
        case setCardData:
            return {
                ...state,
                cardData: [
                    ...state.cardData,
                    ...action.payload
                ]
            }
        case filterBy:
            return {
                ...state,
                filterBy: action.payload
            }
        case setSearchValue:
            return {
                ...state,
                filterBy: action.payload.type,
                searchQuery: action.payload.value
            }
        case addBasketItem:
            return {
                ...state,
                cardData: state.cardData.map( i => {
                    if (i._id === action.payload) {
                        return {...i,  isAdd: true}
                    }
                    return i;
                })
            }
        case removeBasketItem:
            return {
                ...state,
                cardData: state.cardData.map( i => {
                    if (i._id === action.payload) {
                        return {...i,  isAdd: false}
                    }
                    return i;
                })
            }
        case removeCatalogItem:
            return {
                ...state,
                cardData: state.cardData.filter(i => i._id !== action.payload)
            }
        default:
            return state;
    }
}
type addCardDataType = {
    type: typeof addCardData
    payload: any
}
export const addCardDataAC = (payload: any): addCardDataType =>
    ({
        type: addCardData, payload: payload
    });
type SetCardDataType = {
    type: typeof setCardData
    payload: Array<CardDataType>
}
export const setCardDataAC = (response: Array<CardDataType>): SetCardDataType =>
    ({
        type: setCardData, payload: response
    });

type AddBasketItemType = {
    type: typeof addBasketItem
    payload: string
}
export const addBasketItemAC = (id: string): AddBasketItemType =>
    ({
        type: addBasketItem, payload: id
    });

type RemoveBasketItemType = {
    type: typeof removeBasketItem
    payload: string
}
export const removeBasketItemAC = (id: string): RemoveBasketItemType =>
    ({
        type: removeBasketItem, payload: id
    });

type FilterByType = {
    type: typeof filterBy
    payload: string | Array<string>
}
export const filterByAC = (filterValue: string |  Array<string>): FilterByType =>
    ({
        type: filterBy, payload: filterValue
    });

type SetSearchValueType = {
    type: typeof setSearchValue
    payload: {value: string | Array<string>, type: string}
}
export const setSearchValueAC = (value: string | Array<string>, type: string): SetSearchValueType =>
    ({
        type: setSearchValue, payload: {value, type}
    });

type RemoveCatalogItemType = {
    type: typeof removeCatalogItem
    payload: string
}
export const removeCatalogItemAC = (id:string): RemoveCatalogItemType =>
    ({
        type: removeCatalogItem, payload: id
    });

export const setCardThunkCreater = (start = 0) => {
    debugger
    return async (dispatch: any) => {
        debugger
        let response = await api.cardData(start)
        debugger
        if (response.status === 200 && response.data.length > 0) {
            dispatch(setCardDataAC(response.data))
        }
    }
}
export const removeCatalogItemThunkCreater = (id: string) => {
    return async (dispatch: any) => {
        let response = await api.removeCatalogItem(id)
        if (response.status === 200) {
            dispatch(removeCatalogItemAC(id))
        }
    }
}
export const addOwnCardThunkCreater = (data: any) => {
    debugger

    const payload = {
        title: data.title,
        price: data.price,
        model: data.model,
        image: data.file,
        emblem: data.emblem,
        gender: data.gender,
        descript: data.descript,
        country: data.country,
        type: [
            {isType_flowers: data.isType_flowers},
            {isType_fruit: data.isType_fruit},
            {isType_myskysnie: data.isType_myskysnie},
            {isType_fygernie: data.isType_fygernie},
            {isType_citrys: data.isType_citrys},
            {isType_vostochnie: data.isType_vostochnie},
        ],
        classific: data.classific,
        start_note: [
            {is_Mondarin: data.is_Mondarin},
            {is_Grusha: data.is_Grusha},
            {is_Persik: data.is_Persik},
        ],
        end_node: [
            {isMondarin: data.isMondarin},
            {isGrusha: data.isGrusha},
            {isPersik: data.isPersik},
        ]

    }
    return async (dispatch: any) => {
        let response = await api.sendDataCard(payload)
        if (response.status === 200) {
            debugger
            alert("Товар добавлен")
            dispatch(addCardDataAC(response.data))
        }
    }
}

/*export const addBasketItemThunkCreater = (id) => {
    return (dispatch) => {
        dispatch(addBasketItemAC(id))
    }
}
export const removeBasketItemThunkCreater = (id) => {
    return (dispatch) => {
        dispatch(removeBasketItemAC(id))
    }
}*/


export default cardReducer;
