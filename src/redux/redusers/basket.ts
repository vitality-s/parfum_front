import {api} from "../../api/api";
import {CardDataType} from "./card";

let setBasketData = 'SET-BASKET-DATA'
let addBasketItem = 'ADD-BASKET-ITEM'
let removeBasketItem = 'REMOVE-BASKET-ITEM'
let addBasket = 'ADD-BASKET'
let removeBasket = 'REMOVE-BASKET'
let checkParams = 'CHECK-PARAMS'
let ordersData = 'ORDERS-DATA'

type InitiallStateType = {
    basketData: Array<CardDataType>
    totalPrice: number,
    basketItem: Array<CardDataType>
    orders: any
}
let initiallState: InitiallStateType = {
    basketData: [],
    totalPrice: 0,
    basketItem: [],
    orders: null
}
type OrderType = {
    name: string
    surname: string
    email: string
    number: number
    attachment: string
    items: Array<CardDataType>
    price: number
}

const basketReducer = (state = initiallState, action: any): InitiallStateType => {
    switch (action.type) {

        case setBasketData:
            return {
                ...state,
                basketData: action.payload
            }
        case addBasket:
            return {
                ...state,
                basketData: [...state.basketData, action.payload]
            }
        case ordersData:
            return {
                ...state,
                orders: action.payload
            }
        case removeBasket:
            return {
                ...state,
                basketData: state.basketData.filter((i) => i._id !== action.payload)
            }
        case addBasketItem:
            return {
                ...state,
                basketData: state.basketData.map(i => {
                    if (i._id === action.payload) {
                        return {...i, isAdd: true}
                    }
                    return i;
                })
            }
        case removeBasketItem:
            return {
                ...state,
                basketData: state.basketData.map(i => {
                    if (i._id === action.payload) {
                        return {...i, isAdd: false}
                    }
                    return i;
                })
            }
        case checkParams:
            return {
                ...state,
                basketItem: action.payload.item,
                totalPrice: action.payload.price
            }

        default:
            return state;
    }
}

export const setBasketDataAC = (data: Array<CardDataType>) =>
    ({
        type: setBasketData, payload: data
    });
export const addBasketAC = (item: CardDataType) =>
    ({
        type: addBasket, payload: item
    });
export const removeBasketAC = (id: string) =>
    ({
        type: removeBasket, payload: id
    });

export const addBasketItemAC = (id: string) =>
    ({
        type: addBasketItem, payload: id
    });
export const removeBasketItemAC = (id: string) =>
    ({
        type: removeBasketItem, payload: id
    });
export const checkParamsAC = (item: CardDataType, price: number) =>
    ({
        type: checkParams, payload: {item, price}
    });
export const ordersDataAC = (data: any) =>
    ({
        type: ordersData, payload: data
    });
export const setBasketThunkCreater = () => {
    return async (dispatch: any) => {
        let response = await api.basketData()
        dispatch(setBasketDataAC(response.data))
    }
}
export const addBasketItemThunkCreater = (item: CardDataType) => {
    debugger
    return (dispatch: any) => {
        dispatch(addBasketAC(item))
        dispatch(addBasketItemAC(item._id))
    }
}
export const removeBasketItemThunkCreater = (item: CardDataType) => {
    return (dispatch: any) => {
        dispatch(removeBasketAC(item._id))
        dispatch(removeBasketItemAC(item._id))
    }
}
export const setOrdersDataThunkCreater = () => {
    return async (dispatch: any) => {
        let response = await api.getOrderData()
        if (response.status === 200 && response.data.length > 0) {
            dispatch(ordersDataAC(response.data))
        }
    }
}
export const setCheckDataThunkCreater = (order: OrderType) => {
    return async (dispatch: any) => {
        let response = await api.orderData(order)
        if (response.status === 200) {
            dispatch(setOrdersDataThunkCreater())
        }
    }
}
export const removeOrderItemThunkCreater = (id: string) => {
    return async (dispatch: any) => {
        let response = await api.removeOrdersItem(id)
        if (response.status === 200) {
            dispatch(setOrdersDataThunkCreater())
        }
    }
}

export default basketReducer;
