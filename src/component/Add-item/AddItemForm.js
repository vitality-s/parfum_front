import React, {useState} from "react";
import s from './Add-Item.module.css'
import {connect} from "react-redux";
import {addOwnCardThunkCreater} from "../../redux/redusers/card";

class AddItemForm extends React.Component{
    constructor() {
        super();
        this.state = {
            title: "",
            model: "",
            descript: "",
            country: "",
            price: 0,
            gender: "",
            classific: "",
            emblem: "",
            isType_flowers: false,
            isType_fruit: false,
            isType_myskysnie: false,
            isType_fygernie: false,
            isType_citrys: false,
            isType_vostochnie: false,
            is_Mondarin: false,
            is_Grusha: false,
            is_Persik: false,
            isMondarin: false,
            isGrusha: false,
            isPersik: false,
            file: null}
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(e) {
        debugger
            e.preventDefault()
            this.props.addOwnCard(this.state)

    }

    handleChange(e) {
        const {name, value, type, checked, files} = e.target
        if (type === "checkbox") {
            this.setState({
                [name]: checked
            })
        }
        if (type === 'text') {
            this.setState({
                [name]: value
            })
        }
        if (type === 'number') {
            this.setState({
                price: value
            })
        }
        if (type === 'file' && files.length) {
            this.setState({
                file: files[0]
            })
        }
        if (name === 'gender') {
            this.setState({
                gender: value
            })
        }
        if (name === 'emblem') {
            this.setState({
                emblem: value
            })
        }
        if (name === 'classific') {
            this.setState({
                classific: value
            })
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className={s.form_item}>
                        <label>Название продукта</label>
                        <input type="text" name= 'title' placeholder={"Название продукта..."}
                               value = {this.state.title} onChange={this.handleChange}/>
                    </div>
                    <div className={s.form_item}>
                        <label>Модель</label>
                        <input type="text" name= 'model' placeholder={"Название модели..."}
                               value = {this.state.model} onChange={this.handleChange}/>
                    </div>
                    <div className={s.form_item}>
                        <div><label>Тип</label></div>
                        <div>
                            <div>
                                <input type="checkbox" name='isType_flowers' onChange={this.handleChange}/>
                                <label>Цветочные</label>
                            </div>
                            <div>
                                <input type="checkbox" name = 'isType_fruit' onChange={this.handleChange}/>
                                <label>Фруктовые</label>
                            </div>
                            <div>
                                <input type="checkbox" name = 'isType_myskysnie' onChange={this.handleChange}/>
                                <label>Мускусные</label>
                            </div>
                            <div>
                                <input type="checkbox" name = 'isType_fygernie' onChange={this.handleChange}/>
                                <label>Фужерные</label>
                            </div>
                            <div>
                                <input type="checkbox" name = 'isType_citrys' onChange={this.handleChange}/>
                                <label>Цитрусовые</label>
                            </div>
                            <div>
                                <input type="checkbox" name = 'isType_vostochnie' onChange={this.handleChange}/>
                                <label>Восточные</label>
                            </div>
                        </div>
                    </div>
                    <div className={s.form_item}>
                        <label>Описание</label>
                        <input type = "text" placeholder="Введите описание..." name="descript"
                               value = {this.state.descript} onChange={this.handleChange}/>
                    </div>
                    <div className={s.form_item}>
                        <label>Страна производства</label>
                        <input type="text" name = 'country' placeholder={"Страна производства..."}
                               value = {this.state.country} onChange={this.handleChange}
                        />
                    </div>
                    <div className={s.form_item}>
                        <label>Классификация</label>
                        <select value={this.state.classific} name='classific' onChange={this.handleChange}>
                            <option value="Элитние">Элитние</option>
                            <option value="Люкс">Люкс</option>
                        </select>
                    </div>
                    <div className={s.form_item}>
                        <div><label>Стартовая нота</label></div>
                        <div>
                            <div>
                                <input type="checkbox" name={"is_Mondarin"} onChange={this.handleChange}/>
                                <label>Листя мандарина</label>
                            </div>
                            <div>
                                <input type="checkbox" name={"is_Grusha"} onChange={this.handleChange}/>
                                <label>Груша</label>
                            </div>
                            <div>
                                <input type="checkbox" name={"is_Persik"} onChange={this.handleChange}/>
                                <label>Персик</label>
                            </div>
                        </div>
                    </div>
                    <div className={s.form_item}>
                        <div><label>Конечная нота</label></div>
                        <div>
                            <div>
                                <input type="checkbox" name={"isMondarin"} onChange={this.handleChange}/>
                                <label>Листя мандарина</label>
                            </div>
                            <div>
                                <input type="checkbox" name={"isGrusha"} onChange={this.handleChange}/>
                                <label>Груша</label>
                            </div>
                            <div>
                                <input type="checkbox" name={"isPersik"} onChange={this.handleChange}/>
                                <label>Персик</label>
                            </div>
                        </div>
                    </div>
                    <div className={s.form_item}>
                        <label>Пол</label>
                        <select value={this.state.gender} name='gender' onChange={this.handleChange}>
                            <option value="Мужские">Мужские</option>
                            <option value="Женские">Женские</option>
                            <option value="Общие">Общие</option>
                        </select>
                    </div>
                    <div className={s.form_item}>
                        <label>Специальний значек</label>
                        <select value={this.state.emblem} name='emblem' onChange={this.handleChange}>
                            <option value="Новинка">Новинка</option>
                            <option value="hit">hit</option>
                            <option value="Акция">Акция</option>
                        </select>
                    </div>
                    <div className={s.form_item}>
                        <label>Цена</label>
                        <input type="number" placeholder={"Цена..."} name={'price'}
                               value = {this.state.price} onChange={this.handleChange}/>
                    </div>
                    <div className={s.form_item}>
                        <label>Добавте изображение</label>
                        <input type="file" name = 'file' onChange={this.handleChange}/>
                    </div>
                    <div className={s.form_item}>
                        <button type='submit' disabled={this.state.error}>Добавить</button>
                    </div>
                </form>
                {this.state.message ? <div className={s.errorFormLabel}>
                    Ошибка! Все поля форми обязательные!!!
                </div> : ""}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authData: state.auth.authData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addOwnCard: (data) => {
            dispatch(addOwnCardThunkCreater(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm);