import React from 'react'
import s from './Auth.module.css'
import {BrowserRouter, NavLink, Redirect, Route} from "react-router-dom";
import WithAuthFormik from "../AuthForm/withAuthFormik";

const Auth = (props) => {
    if (props.authData) return <Redirect to ='/catalog'/>
    const onSubmit = (value) => {
        alert(value.name)
    }
    return (
        <div className={s.container}>
            <div className={s.authPage}>
                <div className={s.title}>
                    <h3>Регистрация</h3>
                </div>
                <WithAuthFormik/>
                <div className={s.register}>
                    <NavLink to = '/login'>
                        Войти
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export  default Auth