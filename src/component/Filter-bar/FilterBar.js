import s from "./Filter-bar.module.css"
import React from "react";
import { Input } from 'antd';

const FilterBar = (props) => {
    const { Search } = Input;
    const onSearch = (value) => {
        console.log(value)
    }
    const maxLenght = (value) => {
        if (value > 15) {
            console.log("Error")
            return false
        }
    }
    const filterBy = (filterValue) => {
        props.filterBy(filterValue)
    }
    const setSearchValue = (searchValue) => {
        props.setSearchValue(searchValue, "Марка")
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