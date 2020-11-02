import s from "./Menu-slider.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import UserInfo from "../../UserInfo/UserInfo";

const MenuSlider = ({isOpen, basketData, authData, logoutUser}) => {
    const handleClick = () => {
        localStorage.removeItem('token')
        logoutUser()
    }

    return (
        <div className={isOpen ? s.active : s.menu_drop }>
            <div>
                <nav className={s.nav}>
                    <div>
                        { authData ? <UserInfo authData = {authData}/> : ""}
                    </div>
                    <div>
                        <NavLink to = '/' >Главная</NavLink>
                    </div>
                    <div className={s.basket}>
                        <NavLink to = '/basket' >Моя корзина</NavLink>
                        {basketData.length ? (
                            <div className={s.basketStatus}>{basketData.length}</div>
                        ) : ""}
                    </div>
                    <div>
                        <NavLink to = '/own' >Управление[Demo]</NavLink>
                    </div>
                    <div>
                        {authData ? <button className={s.exitButton} onClick={handleClick}>
                            Выйти
                        </button> : <NavLink to = '/login'>Войти</NavLink> }

                    </div>
                </nav>
            </div>
        </div>
    )
}
export default MenuSlider