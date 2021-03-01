import React from 'react'
import s from './Catalog.module.css'
import FilterBar from "../Filter-bar/FilterBar";
import MenuButton from "../Menu/Menu-button/MenuButton";
import CardBox from "../Card-box/CardBox";
import {useSelector} from "react-redux";

import {BrowserRouter, Route} from "react-router-dom";
import WithRouterProfile from "../Profile/Profile";
import {getFilterBy, getSearchQuery} from "../../selectors/catalogSelector";



const CatalogPage = () => {

    const filterBy = useSelector(getFilterBy)
    const searchQuery = useSelector(getSearchQuery)

    return (
        <section className={s.container}>
            <div>
                <MenuButton/>
            </div>

            <div className={s.wrapper}>
                <BrowserRouter>
                    <Route exact path='/catalog' render={() =>
                        <div className={s.wrapper__card}>
                            <FilterBar filterBy = {filterBy}
                                       searchQuery = {searchQuery}/>
                            <CardBox/>
                        </div>}/>
                    <Route exact path='/catalog/:id' render={() =>
                        <WithRouterProfile/>}/>
                </BrowserRouter>
            </div>
        </section>
    )

}

export default CatalogPage

