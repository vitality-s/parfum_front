import React from "react";
import s from './Profile.module.css'
import {withRouter} from "react-router-dom";

class Profile extends React.Component {
    componentWillMount() {
        debugger
        this.props.getProfile(this.props.match.params.id)
    }

    render() {
        if (!this.props.profile) return null
        return (
            <div className={s.profile}>
                <div className={s.title}>
                    {this.props.profile.model}
                </div>
                <div className={s.imageBar}>
                    <div className={s.imageItem}>
                        <img src={"http://localhost:3012/" + this.props.profile.image} alt=""/>
                    </div>
                    <div className={s.descriptItem}>
                        {this.props.profile.descript}
                    </div>
                </div>
                <div className={s.charactBox}>
                    <div>
                        Характеристики
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Производитель</div>
                        <div>{this.props.profile.model}</div>
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Страна</div>
                        <div>{this.props.profile.country}</div>
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Пол</div>
                        <div>{this.props.profile.gender}</div>
                    </div>
                    <div className={s.characterItem}>
                    <div className={s.overview}>Тип аромата</div>
                    <div>{"восточные, цветочные"}</div>
                </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Классификация</div>
                        <div>{this.props.profile.classific}</div>
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
                        <div>{this.props.profile.price}</div>
                    </div>
                </div>
            </div>
        )
    }


}

const WithRouterProfile = withRouter(Profile)
export default WithRouterProfile