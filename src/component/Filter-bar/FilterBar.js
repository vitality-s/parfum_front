import s from "./Filter-bar.module.css"
import React, {useEffect} from "react";
import { Input } from 'antd';
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'
import {useDispatch} from "react-redux";
import {filterByAC, setSearchValueAC} from "../../redux/redusers/card";

const FilterBar = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    /*const {Search} = Input;
    const onSearch = (value) => {
        console.log(value)
    }
    const maxLenght = (value) => {
        if (value > 15) {
            console.log("Error")
            return false
        }
    }*/


    useEffect(()=> {
        history.push({
            pathname: '/catalog',
            search: `?gender=${props.filterBy}`
        })
    }, [props.filterBy])

    useEffect(()=> {
        history.push({
            pathname: '/catalog',
            search: `?search=${props.searchQuery}`
        })
    }, [props.searchQuery])


    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))
        if(parsed.search && parsed.search !== "") {
            dispatch(setSearchValueAC(parsed.search, "Марка"))
        }
        if(parsed.gender && parsed.gender !== "") {
            dispatch(filterByAC(parsed.gender))
        }
        debugger
    }, [])


    const filterBy = (filterValue) => {
        dispatch(filterByAC(filterValue))

debugger
    }
    const setSearchValue = (searchValue) => {
        dispatch(setSearchValueAC(searchValue, "Марка"))
    }

    return (
        <div className={s.filterBar}>
            <div className={s.filterBox}>
                <button onClick={filterBy.bind(this, "Все")} className={s.filterItem}>
                    Все
                </button>

                <button onClick={filterBy.bind(this, "Мужские")} className={s.filterItem}>
                    Мужские
                </button>

                <button onClick={filterBy.bind(this, "Женские")} className={s.filterItem}>
                    Женские
                </button>

                <button onClick={filterBy.bind(this, "Общие")} className={s.filterItem}>
                    Общие
                </button>

                <div className={s.search}>
                    <input autoFocus placeholder="Введите названия..."
                           value={props.searchQuery}
                           onChange={(e) => {setSearchValue(e.target.value)}}/>
                </div>

            </div>
        </div>
    )
}
export  default  FilterBar