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
                <div className={s.content}>
                    <div className={s.title}>
                        <h3>Войти в аккаунт</h3>
                    </div>
                    <WithFormikContainer/>
                </div>

                <div className={s.register}>
                    <div><NavLink to = '/auth'>
                        Зарегистрироваться
                    </NavLink></div>
                    <div><NavLink to = '/catalog'>
                        Назад
                    </NavLink></div>
                </div>
            </div>
        </div>
    )
}
export  default Login