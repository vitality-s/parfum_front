import s from "./Menu-button.module.css";
import React, {useState} from "react";
import MenuSlider from "../Menu-slider/MenuSlider";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import UnlockOutlined from "@ant-design/icons/lib/icons/UnlockOutlined";
import {useDispatch, useSelector} from "react-redux";
import {getAuthData} from "../../../selectors/usersSelector";
import {getBasketData, getOrders} from "../../../selectors/basketSelector";
import {setAuthDataAC} from "../../../redux/redusers/auth";

const MenuButton = (props) => {
    const dispatch = useDispatch()

    const authData = useSelector(getAuthData)
    const orders = useSelector(getOrders)
    const basketData = useSelector(getBasketData)

    const [isOpen, toggleMenu] = useState(false)
    const showMenu = () => {
        toggleMenu(!isOpen)
    }
    const logoutUser = () => {
        dispatch(setAuthDataAC(null))
    }
    return (
        <div className={s.menu}>
            <div onClick={showMenu} className={s.menu__burger}>
                <button>
                    <span className={isOpen && s.one}/>
                    <span className={isOpen && s.two}/>
                    <span className={isOpen && s.three}/>
                </button>
            </div>

            <div className={s.menu__title}>
                <h3>La Parfumeria</h3>
            </div>
            <div className={s.unlockBox}>
                {authData && authData.own === true ? <div className={s.unlock}>
                    <NavLink to = {"/own"}>
                        <UnlockOutlined />
                    </NavLink>
                    {orders.length && props.orders.length > 0 ? (
                        <div className={s.basketStatus}>{orders.length}</div>
                    ): ""}
                </div> : "" }
            </div>
            <div className={s.menu__basket}>
                <NavLink to = '/basket'><ShoppingCartOutlined/></NavLink>
                {basketData.length && basketData.length > 0 ? (
                    <div className={s.basketStatus}>{basketData.length}</div>
                ): ""}
            </div>
            <MenuSlider basketData = {basketData} logoutUser = {logoutUser}
                        authData = {authData} isOpen={isOpen}/>
        </div>

    )
}
export default MenuButton