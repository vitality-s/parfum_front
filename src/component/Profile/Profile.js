import React from "react";
import s from './Profile.module.css'
import {NavLink, withRouter} from "react-router-dom";

class Profile extends React.Component {
    componentWillMount() {
        this.props.getProfile(this.props.match.params.id)
        debugger
    }

    render() {
        if (!this.props.profileProduct) return null
        return (
            <div className={s.profile}>
                <div className={s.navigation}>
                    <div className={s.title}>
                        {this.props.profileProduct.model}
                    </div>
                    <div className={s.back}>
                        <NavLink to = '/catalog'>Назад</NavLink>
                    </div>
                </div>

                <div className={s.imageBar}>
                    <div className={s.imageItem}>
                        <img src={"http://localhost:3012/" + this.props.profileProduct.image} alt=""/>
                    </div>
                    <div className={s.descriptItem}>
                        {this.props.profileProduct.descript}
                    </div>
                </div>
                <div className={s.charactBox}>
                    <div>
                        Характеристики
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Производитель</div>
                        <div>{this.props.profileProduct.model}</div>
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Страна</div>
                        <div>{this.props.profileProduct.country}</div>
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Пол</div>
                        <div>{this.props.profileProduct.gender}</div>
                    </div>
                    <div className={s.characterItem}>
                    <div className={s.overview}>Тип аромата</div>
                    <div>{"восточные, цветочные"}</div>
                </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Классификация</div>
                        <div>{this.props.profileProduct.classific}</div>
                    </div>
                    <div className={s.characterItem}>
                    <div className={s.overview}>Начальная нота</div>
                    <div>{"Груша, Лакричник, Мандарин"}</div>
                </div>
                    <div className={s.characterItem}>
                    <div className={s.overview}>Конечная нота</div>
                    <div>{"Груша, Лакричник, Мандарин"}</div>
                </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Цена</div>
                        <div>{this.props.profileProduct.price}</div>
                    </div>
                </div>
            </div>
        )
    }


}

const WithRouterProfile = withRouter(Profile)
export default WithRouterProfile