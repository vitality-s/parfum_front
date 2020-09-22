import {withFormik} from 'formik'
import AuthForm from "./AuthForm";
import {setAuthDataThunkCreater} from "../../redux/redusers/auth";
import store from '../../redux/store'


const WithAuthFormik = withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),

    // Custom sync validation
    validate: values => {
        let errors = {};
        if (!values.fullname) {
            errors.fullname = 'Required';
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
        if (!values.password) {
            errors.password = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.password
            )
        ) {
            errors.password = 'Invalid password';
        }
        if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.passwordConfirm
            )
        ) {
            errors.passwordConfirm = 'Invalid password';
        }
        return errors;
    },

    handleSubmit: async (values, { setSubmitting }) => {
        await store.dispatch(setAuthDataThunkCreater({fullname: values.fullname, email: values.email, password: values.password}))
        setSubmitting(false);
    },

    displayName: 'BasicForm', // helps with React DevTools
})(AuthForm);
export default WithAuthFormik