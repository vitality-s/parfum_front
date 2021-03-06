import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import cardReducer from "./redusers/card";
import basketReducer from "./redusers/basket";
import authReducer from "./redusers/auth";
import profileProductReducer from "./redusers/profile";

let rootReducer = combineReducers({
    card: cardReducer,
    basket: basketReducer,
    auth: authReducer,
    profileProduct: profileProductReducer
});
let store  = createStore(rootReducer, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;
