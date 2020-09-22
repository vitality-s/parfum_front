import React from "react";
import MyForm from "./MyForm";
import {withFormik} from 'formik'
import store from "../../redux/store";
import {loginThunkCreater} from "../../redux/redusers/auth";
import {Redirect} from "react-router-dom";

const WithFormikContainer = withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),

    // Custom sync validation
    validate: values => {
        let errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
            )
        ) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.password
            )
        ) {
            errors.password = 'Invalid password';
        }
        return errors;
    },

    handleSubmit: async (values, { setSubmitting }) => {
        debugger
        await store.dispatch(loginThunkCreater({email: values.email, password: values.password}))
        setSubmitting(false);
        return <Redirect to= '/catalog'/>
    },

    displayName: 'BasicForm', // helps with React DevTools
})(MyForm);
export default WithFormikContainer