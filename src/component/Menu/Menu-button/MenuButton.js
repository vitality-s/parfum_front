import s from "./Menu-button.module.css";
import React, {useState} from "react";
import MenuSlider from "../Menu-slider/MenuSlider";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import UnlockOutlined from "@ant-design/icons/lib/icons/UnlockOutlined";

const MenuButton = (props) => {
    const [isOpen, toggleMenu] = useState(false)
    const showMenu = () => {
        toggleMenu(!isOpen)
    }
    return (
        <div className={s.menu_content}>
            <div onClick={showMenu} className={s.menu_burger}>
                <button>
                    <span className={isOpen && s.one}/>
                    <span className={isOpen && s.two}/>
                    <span className={isOpen && s.three}/>
                </button>
            </div>

            <div className={s.menu_title}>
                <h3>La Parfumeria</h3>
            </div>
            <div className={s.unlockBox}>
                {props.authData && props.authData.own === true ? <div className={s.unlock}>
                    <NavLink to = {"/own"}>
                        <UnlockOutlined />
                    </NavLink>
                    {props.orders.length && props.orders.length > 0 ? (
                        <div className={s.basketStatus}>{props.orders.length}</div>
                    ): ""}
                </div> : "" }
            </div>
            <div className={s.menu_basket}>
                <NavLink to = '/basket'><ShoppingCartOutlined/></NavLink>
                {props.basketData.length && props.basketData.length > 0 ? (
                    <div className={s.basketStatus}>{props.basketData.length}</div>
                ): ""}
            </div>
            <MenuSlider basketData = {props.basketData} logoutUser = {props.logoutUser}
                        authData = {props.authData} isOpen={isOpen}/>
        </div>

    )
}
export default MenuButton