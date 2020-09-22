import React from "react";
import s from './Checkout-form.module.css'
import {Formik} from 'formik'
import * as classnames from "classnames";

const CheckoutForm = (props) => {
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
                    <input id="name"
                           placeholder="Enter your name"
                           type="text"
                           value={values.name}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={
                               errors.name && touched.name && s.error
                           }/>
                    {errors.name &&
                    touched.name && (
                        <div className={s.feedback}>{errors.name}</div>
                    )}
                    <label><div className={s.fieldTrue}>*</div>Введите свою фамилию</label>
                    <input id="surname"
                           placeholder="Enter your surname"
                           type="text"
                           value={values.surname}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={
                               errors.surname && touched.surname && s.error
                           }/>
                    {errors.surname &&
                    touched.surname && (
                        <div className={s.feedback}>{errors.surname}</div>
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
                    <label><div className={s.fieldTrue}>*</div>Номер телефона</label>
                    <input id="number"
                           placeholder="Enter your phone number"
                           type="number"
                           value={values.number}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={
                               errors.number && touched.number && s.error
                           }/>
                    {errors.number &&
                    touched.number && (
                        <div className={s.feedback}>{errors.number}</div>
                    )}
                    <label id="overview">Уточнения к заказу</label>
                    <input id="attachment"
                           type="text"
                           value={values.attachment}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           />
                    <button id={s.buttonId} onClick={handleSubmit} type="submit">
                        Подтвердить заказ
                    </button>
                </form>
            </Formik>
        </div>

    )
}
export default CheckoutForm