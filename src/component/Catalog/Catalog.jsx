import React from 'react'
import s from './Catalog.module.css'
import FilterBar from "../Filter-bar/FilterBar";
import MenuButton from "../Menu/Menu-button/MenuButton";
import CardBox from "../Card-box/CardBox";
import {connect} from "react-redux";
import {
    filterByAC,
    setCardThunkCreater, setSearchValueAC
} from "../../redux/redusers/card";
import {BrowserRouter, Route} from "react-router-dom";
import {
    addBasketItemThunkCreater,
    removeBasketItemThunkCreater,
} from "../../redux/redusers/basket";
import WithRouterProfile from "../Profile/Profile";
import {setAuthDataAC} from "../../redux/redusers/auth";
import {getProfileThunkCreater} from "../../redux/redusers/profile";

const filterBy = (card, filterValue, searchQuery) => {
    switch (filterValue) {
        case "Мужские":
            return card.filter((i) => i.gender === filterValue)
        case "Женские":
            return card.filter((i) => i.gender === filterValue)
        case "Общие":
            return card.filter((i) => i.gender === filterValue)
        case "Марка":
            return card.filter((i) => i.model.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0)
        default:
            return card;
    }
}

class Catalog extends React.Component {
    componentDidMount() {
        /*this.props.setCardData()*/
        /*this.props.setBasketData()*/

    }
    render() {
        return (
            <section className = {s.container}>
                <div>
                    <MenuButton {...this.props} />
                </div>

                {/*<div>
                    <FilterBar {...this.props}/>
                </div>*/}

                <div className={s.wrapper}>
                    <BrowserRouter>
                        <Route exact path= '/catalog' render={() =>
                            <div className={s.wrapper__card}>
                                <FilterBar {...this.props}/>
                                <CardBox {...this.props}/>
                            </div>}/>
                        <Route exact path='/catalog/:id' render={() =>
                            <WithRouterProfile {...this.props}/>}/>
                    </BrowserRouter>
                </div>
            </section>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        cardData: state.card.cardData && filterBy(state.card.cardData, state.card.filterBy, state.card.searchQuery),
        basketData: state.basket.basketData,
        isAddBasket: state.card.isAddBasket,
        filterBy: state.card.filterBy,
        searchQuery: state.card.searchQuery,
        authData: state.auth.authData,
        profileProduct: state.profileProduct.profileProduct,
        orders: state.basket.orders
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        /*setCardData: () => {
            dispatch(setCardThunkCreater())
        },*/
        /*setBasketData: () => {
            dispatch(setBasketThunkCreater())
        }*/
        addBasketItem: (item) => {
            dispatch(addBasketItemThunkCreater(item))
        },
        removeBasketItem: (item) => {
            dispatch(removeBasketItemThunkCreater(item))
        },
        setFilterBy: (filterValue) => {
            dispatch(filterByAC(filterValue))
        },
        setSearchValue: (value, type) => {
            dispatch(setSearchValueAC(value, type))
        },
        logoutUser: () => {
            dispatch(setAuthDataAC(null))
        },
        getProfile: (id) => {
            dispatch(getProfileThunkCreater(id))
        },
        setCardData: (start) => {
            dispatch(setCardThunkCreater(start))
        }

    }
}
const CatalogContainer = connect(mapStateToProps, mapDispatchToProps)(Catalog)

export default CatalogContainer

