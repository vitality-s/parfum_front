import React from 'react'
import s from './Login.module.css'
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import WithFormikContainer from "../MyForm/withFormik";

const Login = (props) => {
    const onSubmit = (value) => {
        alert(value.name)
    }
    return (
        <div className={s.container}>
            <div className={s.authPage}>
                <div className={s.title}>
                    <h3>Войти в аккаунт</h3>
                </div>
                <WithFormikContainer/>
                <div className={s.register}>
                    <NavLink to = '/auth'>
                        Зарегистрироваться
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export  default Login