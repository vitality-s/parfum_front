import React from "react";
import s from './My-form.module.css'
import {Formik} from 'formik'

const MyForm = (props) => {
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
        <div className={s.formBox}>
            <Formik>
                <form onSubmit={handleSubmit}>
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
                    <button id={s.buttonId} type="submit" disabled={isSubmitting}>
                        ВОЙТИ
                    </button>
                </form>
            </Formik>
        </div>

    )
}
export default MyForm