import {withFormik} from 'formik'
import CheckoutForm from "./CheckoutForm";
import store from '../../redux/store'
import {setAuthDataThunkCreater} from "../../redux/redusers/auth";
import {setCheckDataThunkCreater} from "../../redux/redusers/basket";


const WithCheckoutFormik = withFormik({
    mapPropsToValues: () => ({email: '',}),

    // Custom sync validation
    validate: values => {
        let errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.surname) {
            errors.surname = 'Required';
        }
        if (!values.number) {
            errors.number = 'Required';
        }
        if (!values.attachment) {
            errors.attachment = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
            )
        ) {
            errors.email = 'Invalid email address';
        }
        return errors;
    },

    handleSubmit: async (values, {setSubmitting}) => {
        let promise = await store.dispatch(setCheckDataThunkCreater({
            name: values.name, surname: values.surname,
            email: values.email, number: values.number, attachment: values.attachment,
            items: store.getState().basket.basketItem, price: store.getState().basket.totalPrice
        }))
        Promise.all([promise]).then(() => {
            if (global.confirm('Спасибо за заказ! Ми вам позвоним в течении 30 мин!')) {

            }
        })

    },

    displayName: 'BasicForm', // helps with React DevTools
})(CheckoutForm);
export default WithCheckoutFormik