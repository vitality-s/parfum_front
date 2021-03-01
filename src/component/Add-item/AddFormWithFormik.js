import React, {createRef, useEffect, useRef, useState} from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import s from './Add-Item.module.css'
import {useDispatch} from "react-redux";
import {addOwnCardThunkCreater} from "../../redux/redusers/card";



const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <div className={s.form_item}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={s.errorFormLabel}>{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyImageInput = ({ label, ...props }) => {
    
    let onFileChanged = (e) => {

    }
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <div className={s.form_item}>
            <label >{label}</label>
            <input className="" type= 'file' name={"file"} {...field}{...props} />
            {meta.touched && meta.error ? (
                <div className={s.errorFormLabel}>{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className={s.form_item}>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className={s.errorFormLabel}>{meta.error}</div>
            ) : null}
        </div>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={s.form_item}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={s.errorFormLabel}>{meta.error}</div>
            ) : null}
        </div>
    );
};

// And now we can use these
const SignupForm = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState(null)
    const divRef = createRef()
    let error = true
debugger

    let onFileChange = (e) => {
        const { files} = e.target
        if(files.length> 0) {
            setState(files[0])
        }
    }


    let onSubmitForm = (data) => {
        let payload = {...data, file: state}
        dispatch(addOwnCardThunkCreater(payload))
        debugger

    }
    return (
        <>
            <Formik
                initialValues={{
                    productName: '',
                    model: '',
                    floral: false, // added for our checkbox
                    fruit: false, // added for our checkbox
                    musky: false, // added for our checkbox
                    fougere: false, // added for our checkbox
                    citrus: false, // added for our checkbox
                    oriental: false, // added for our checkbox
                    description: "", // added for our checkbox
                    countryOrigin: "", // added for our checkbox
                    сlassificationType: "", // added for our checkbox
                    mandarinLeaf_1: false, // added for our checkbox
                    isType_flowers: false,
                    isType_fruit: false,
                    isType_myskysnie: false,
                    isType_fygernie: false,
                    isType_citrys: false,
                    isType_vostochnie: false,
                    pear_1: false, // added for our checkbox
                    peach_1: false, // added for our checkbox
                    mandarinLeaf_2: false, // added for our checkbox
                    pear_2: false, // added for our checkbox
                    peach_2: false, // added for our checkbox
                    genderType: '', // added for our checkbox
                    emblemType: '', // added for our select
                    price: null, // added for our select,
                }}
                validationSchema={Yup.object({
                    productName: Yup.string()
                        .max(25, 'Must be 25 characters or less')
                        .required('Required'),
                    model: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    price: Yup.number()
                        .required('Required'),

                    fruit: Yup.boolean(),
                    musky: Yup.boolean(),
                    fougere: Yup.boolean(),
                    citrus: Yup.boolean(),
                    oriental: Yup.boolean(),
                    floral: Yup.boolean(),
                    description: Yup.string()
                        .max(500, 'Must be 500 characters or less')
                        .required('Required'),
                    countryOrigin: Yup.string()
                        .max(50, 'Must be 500 characters or less')
                        .required('Required'),
                    сlassificationType: Yup.string()
                        .oneOf(
                            ['elite', 'luxury'],
                            'Invalid Type'
                        )
                        .required('Required'),
                    mandarinLeaf_1: Yup.boolean(),
                    pear_1: Yup.boolean(),
                    peach_1: Yup.boolean(),
                    mandarinLeaf_2: Yup.boolean(),
                    pear_2: Yup.boolean(),
                    peach_2: Yup.boolean(),
                    genderType: Yup.string()
                        .oneOf(
                            ['men', 'woman', 'total'],
                            'Invalid Type'
                        )
                        .required('Required'),
                    emblemType: Yup.string()
                        .oneOf(
                            ['new', 'hit', 'discount'],
                            'Invalid Type'
                        )
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    const data = {
                        title: values.productName,
                        model: values.model,
                        descript: values.description,
                        country: values.countryOrigin,
                        price:values.price,
                        gender: values.genderType,
                        classific: values.сlassificationType,
                        emblem: values.emblemType,
                        type: [
                            {isType: values.floral},
                            {isType: values.fruit},
                            {isType: values.musky},
                            {isType: values.fougere},
                            {isType: values.citrus},
                            {isType: values.oriental,}
                        ],
                        isType_flowers: values.floral,
                        isType_fruit: values.fruit,
                        isType_myskysnie: values.musky,
                        isType_fygernie: values.fougere,
                        isType_citrys: values.citrus,
                        isType_vostochnie: values.oriental,
                        is_Mondarin: values.mandarinLeaf_1,
                        is_Grusha: values.pear_1,
                        is_Persik: values.peach_1,
                        isMondarin: values.mandarinLeaf_1,
                        isGrusha: values.pear_1,
                        isPersik: values.peach_1}
                    onSubmitForm(data)
                }}
            >
                <Form>
                    <MyTextInput
                        label="Название продукта"
                        name="productName"
                        type="text"
                        placeholder="Название продукта"
                    />

                    <MyTextInput
                        label="Модель"
                        name="model"
                        type="text"
                        placeholder="Название модели..."
                    />

                    <div data-id = "parent" ref={divRef} >
                        <div className={s.field}><span className={s.fieldTrue}>*</span>Тип</div>
                        <MyCheckbox data-id = "elem" name="floral">
                            Цветочные
                        </MyCheckbox>

                        <MyCheckbox data-id = "elem" name="fruit">
                            Фруктовые
                        </MyCheckbox>

                        <MyCheckbox data-id = "elem" name="musky">
                            Мускусные
                        </MyCheckbox>

                        <MyCheckbox data-id = "elem" name="fougere">
                            Фужерные
                        </MyCheckbox>

                        <MyCheckbox data-id = "elem" name="citrus">
                            Цитрусовые
                        </MyCheckbox>

                        <MyCheckbox data-id = "elem" name="oriental">
                            Восточные
                        </MyCheckbox>

                    </div>

                    <MyTextInput
                        label="Описание"
                        name="description"
                        type="text"
                        placeholder="Введите описание"
                    />

                    <MyTextInput
                        label="Страна производства"
                        name="countryOrigin"
                        type="text"
                        placeholder="Страна производства"
                    />

                    <MySelect label="Классификация" name="сlassificationType">
                        <option value="">Выберите тип!</option>
                        <option value="elite">Елитные</option>
                        <option value="luxury">Люкс</option>
                    </MySelect>

                    <div className={s.field}>
                        <div><span className={s.fieldTrue}>*</span>Стартовая нота</div>
                        <MyCheckbox name="mandarinLeaf_1">
                            Листя мандарина
                        </MyCheckbox>

                        <MyCheckbox name="pear_1">
                            Груша
                        </MyCheckbox>

                        <MyCheckbox name="peach_1">
                            Персик
                        </MyCheckbox>
                    </div>

                    <div className={s.field}>
                        <div><span className={s.fieldTrue}>*</span>Конечная нота</div>
                        <MyCheckbox name="mandarinLeaf_2">
                            Листя мандарина
                        </MyCheckbox>

                        <MyCheckbox name="pear_2">
                            Груша
                        </MyCheckbox>

                        <MyCheckbox name="peach_2">
                            Персик
                        </MyCheckbox>
                    </div>

                    <MySelect label="Пол" name="genderType">
                        <option value="">Выберите тип!</option>
                        <option value="men">Мужские</option>
                        <option value="woman">Женские</option>
                        <option value="total">Общие</option>
                    </MySelect>

                    <MySelect label="Специальный значек" name="emblemType">
                        <option value="">Выберите тип!</option>
                        <option value="new">Новинка</option>
                        <option value="hit">Hit</option>
                        <option value="discount">Акция</option>
                    </MySelect>

                    <MyTextInput
                        label="Цена"
                        name="price"
                        type="number"
                        placeholder="Цена..."
                    />

                    <input type="file" name="file" onChange={onFileChange}/>

                    <div className={s.form_item}>
                        <button className={s.button} type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
};
export default SignupForm