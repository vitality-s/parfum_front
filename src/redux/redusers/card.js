import {api} from "../../api/api";

let setCardData = 'SET-CARD-DATA'
let addBasketItem = 'ADD-BASKET-ITEM'
let removeBasketItem = 'REMOVE-BASKET-ITEM'
let filterBy = 'FILTER-BY'
let setSearchValue = 'SET-SEARCH-VALUE'
let removeCatalogItem = 'REMOVE-CATALOG-ITEM'

let initiallState = {
    cardData: null,
    filterBy: "",
    searchQuery: ""
}

const cardReducer = (state = initiallState, action) => {
    switch (action.type) {

        case setCardData:
            return {
                ...state,
                cardData: action.payload
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

export const setCardDataAC = (response) =>
    ({
        type: setCardData, payload: response
    });
export const addBasketItemAC = (id) =>
    ({
        type: addBasketItem, payload: id
    });
export const removeBasketItemAC = (id) =>
    ({
        type: removeBasketItem, payload: id
    });
export const filterByAC = (filterValue) =>
    ({
        type: filterBy, payload: filterValue
    });
export const setSearchValueAC = (value, type) =>
    ({
        type: setSearchValue, payload: {value, type}
    });
export const removeCatalogItemAC = (id) =>
    ({
        type: removeCatalogItem, payload: id
    });

export const setCardThunkCreater = () => {
    return (dispatch) => {
        return api.cardData()
            .then(response => {
                if(response.status === 200 && response.data.length > 0) {
                    dispatch(setCardDataAC(response.data))
                }

            })
    }
}
export const removeCatalogItemThunkCreater = (id) => {
    return (dispatch) => {
        return api.removeCatalogItem(id)
            .then(response => {
                if(response.status === 200) {
                    dispatch(removeCatalogItemAC(id))
                }
            })

    }
}
export const addOwnCardThunkCreater = (data) => {
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
    return (dispatch) => {
        return api.sendDataCard(payload)
            .then(response => {
                debugger
                if(response.status === 200){
                    alert("Товар добавлен")
                    dispatch(setCardThunkCreater())
                }
            })
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
