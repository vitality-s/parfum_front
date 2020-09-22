import React from 'react';
import './App.css'
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import CatalogContainer from "./component/Catalog/Catalog";
import Login from "./component/Login/Login";
import Auth from "./component/Auth/Auth";
import BasketContainer from "./component/Basket/Basket";
import {connect} from "react-redux";
import {setBasketThunkCreater, setOrdersDataThunkCreater} from "./redux/redusers/basket";
import OwnContainer from "./component/Own/Own";
import {setCardThunkCreater} from "./redux/redusers/card";
import {getProfileFetchThunkCreater} from "./redux/redusers/auth";

class App extends React.Component {
    componentDidMount() {
        /*this.props.setBasketData()*/
        this.props.setCardData()
        this.props.getProfileFetch()
        this.props.setOrdersData()
    }

    render() {
        return (
            <div className="wrapper">
                <BrowserRouter>
                    <Route exact path='/' render={() =>
                        <Redirect to = '/catalog'/>}/>
                    <Route path='/catalog' render={() =>
                        <CatalogContainer/>}/>
                    <Route exact path='/login' render={() =>
                        <Login/>}/>
                    <Route exact path='/auth' render={() =>
                        <Auth authData = {this.props.authData}/>}/>
                    <Route exact path='/basket' render={() =>
                        <BasketContainer/>}/>
                    <Route exact path='/own' render={() =>
                        <OwnContainer/>}/>
                </BrowserRouter>
            </div>
        );
    }


}
const mapStateToProps = (state) => {
    return {
        authData: state.auth.authData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        /*setBasketData: () => {
            dispatch(setBasketThunkCreater())
        }*/
        setCardData: () => {
            dispatch(setCardThunkCreater())
        },
        getProfileFetch: () => {
            dispatch(getProfileFetchThunkCreater())
        },
        setOrdersData: () => {
            dispatch(setOrdersDataThunkCreater())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
