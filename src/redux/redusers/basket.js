import {api} from "../../api/api";

let setBasketData = 'SET-BASKET-DATA'
let addBasketItem = 'ADD-BASKET-ITEM'
let removeBasketItem = 'REMOVE-BASKET-ITEM'
let addBasket = 'ADD-BASKET'
let removeBasket = 'REMOVE-BASKET'
let checkParams = 'CHECK-PARAMS'
let ordersData = 'ORDERS-DATA'

let initiallState = {
    basketData: [],
    totalPrice: 0,
    basketItem: [],
    orders: null
}

const basketReducer = (state = initiallState, action) => {
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
                basketData: state.basketData.filter((i) => i._id!==action.payload )
            }
        case addBasketItem:
            return {
                ...state,
                basketData: state.basketData.map( i => {
                    if (i._id === action.payload) {
                        return {...i,  isAdd: true}
                    }
                    return i;
                })
            }
        case removeBasketItem:
            return {
                ...state,
                basketData: state.basketData.map( i => {
                    if (i._id === action.payload) {
                        return {...i,  isAdd: false}
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

export const setBasketDataAC = (data) =>
    ({
        type: setBasketData, payload: data
    });
export const addBasketAC = (item) =>
    ({
        type: addBasket, payload: item
    });
export const removeBasketAC = (id) =>
    ({
        type: removeBasket, payload: id
    });

export const addBasketItemAC = (id) =>
    ({
        type: addBasketItem, payload: id
    });
export const removeBasketItemAC = (id) =>
    ({
        type: removeBasketItem, payload: id
    });
export const checkParamsAC = (item, price) =>
    ({
        type: checkParams, payload: {item, price}
    });
export const ordersDataAC = (data) =>
    ({
        type: ordersData, payload: data
    });
export const setBasketThunkCreater = () => {
    return (dispatch) => {
        return api.basketData()
            .then(response => {
                dispatch(setBasketDataAC(response.data))
            })
    }
}
export const addBasketItemThunkCreater = (item) => {
    debugger
    return (dispatch) => {
        dispatch(addBasketAC(item))
        dispatch(addBasketItemAC(item._id))
    }
}
export const removeBasketItemThunkCreater = (item) => {
    return (dispatch) => {
        dispatch(removeBasketAC(item._id))
        dispatch(removeBasketItemAC(item._id))
    }
}
export const setOrdersDataThunkCreater = () => {
    return (dispatch) => {
        return api.getOrderData()
            .then(response => {
                debugger
                if(response.status === 200 && response.data.length > 0) {
                    dispatch(ordersDataAC(response.data))
                }
            })
    }
}
export const setCheckDataThunkCreater = (value) => {
    return (dispatch) => {
        return api.orderData(value)
            .then(response => {
                debugger
                if(response.status === 200) {
                    dispatch(setOrdersDataThunkCreater())
                }
            })
    }
}
export const removeOrderItemThunkCreater = (id) => {
    return (dispatch) => {
        return api.removeOrdersItem(id)
            .then(response => {
                debugger
                if(response.status === 200) {
                    dispatch(setOrdersDataThunkCreater())
                }
            })
    }
}

export default basketReducer;
