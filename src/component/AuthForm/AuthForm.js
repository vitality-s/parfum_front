import React from "react";
import s from './Auth-form.module.css'
import {Formik} from 'formik'
import * as classnames from "classnames";

const AuthForm = (props) => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
    } = props;
    return (
        <div className={classnames(s.formBox, errors && s.box)}>
            <Formik>
                <form onSubmit={handleSubmit}>
                    <label><div className={s.fieldTrue}>*</div>Введите свое имя</label>
                    <input id="fullname"
                           placeholder="Enter your name"
                           type="text"
                           value={values.fullname}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={
                               errors.fullname && touched.fullname && s.error
                           }/>
                    {errors.fullname &&
                    touched.fullname && (
                        <div className={s.feedback}>{errors.fullname}</div>
                    )}
                    <label><div className={s.fieldTrue}>*</div>Введите свое email</label>
                    <input id="email"
                           placeholder="Enter your email"
                           type="text"
                           value={values.email}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={
                               errors.email && touched.email && s.error
                           }/>
                    {errors.email &&
                    touched.email && (
                        <div className={s.feedback}>{errors.email}</div>
                    )}
                    <label><div className={s.fieldTrue}>*</div>Придумайте пароль</label>
                    <input id="password"
                           placeholder="Enter your password"
                           type="password"
                           value={values.password}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={
                               errors.password && touched.password && s.error
                           }/>
                    {errors.password &&
                    touched.password && (
                        <div className={s.feedback}>{errors.password}</div>
                    )}
                    <label><div className={s.fieldTrue}>*</div>Подтвердите пароль</label>
                    <input id="passwordConfirm"
                           placeholder="Enter your password"
                           type="password"
                           value={values.passwordConfirm}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={
                               errors.passwordConfirm && touched.passwordConfirm && s.error
                           }/>
                    {errors.passwordConfirm &&
                    touched.passwordConfirm && (
                        <div className={s.feedback}>{errors.passwordConfirm}</div>
                    )}
                    <button id={s.buttonId} type="submit" disabled={isSubmitting}>
                        ВОЙТИ
                    </button>
                </form>
            </Formik>
        </div>

    )
}
export default AuthForm