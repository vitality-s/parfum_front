import React, {useEffect} from 'react';
import './App.css'
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Login from "./component/Login/Login";
import Auth from "./component/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersDataThunkCreater} from "./redux/redusers/basket";
import {setCardThunkCreater} from "./redux/redusers/card";
import {getProfileFetchThunkCreater} from "./redux/redusers/auth";
import {getAuthData} from "./selectors/usersSelector";
import CatalogPage from "./component/Catalog/CatalogPage";
import OwnPage from "./component/Own/OwnPage";
import BasketPage from "./component/Basket/BasketPage";

const App = () => {
    const dispatch = useDispatch()
    const authData = useSelector(getAuthData)

    useEffect(() => {
        dispatch(setCardThunkCreater())
        dispatch(getProfileFetchThunkCreater())
        dispatch(setOrdersDataThunkCreater())

    }, [])
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Route exact path='/' render={() =>
                    <Redirect to='/catalog'/>}/>
                <Route path='/catalog' render={() =>
                    <CatalogPage/>}/>
                <Route exact path='/login' render={() =>
                    <Login/>}/>
                <Route exact path='/auth' render={() =>
                    <Auth authData={authData}/>}/>
                <Route exact path='/basket' render={() =>
                    <BasketPage/>}/>
                <Route exact path='/own' render={() =>
                    <OwnPage/>}/>
            </BrowserRouter>
        </div>
    );


}

export default App;
