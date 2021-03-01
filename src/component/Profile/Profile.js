import React, {useEffect} from "react";
import s from './Profile.module.css'
import {NavLink, withRouter} from "react-router-dom";
import {getProfileThunkCreater} from "../../redux/redusers/profile";
import {useDispatch, useSelector} from "react-redux";
import {getProfileProduct} from "../../selectors/catalogSelector";

const Profile = (props) => {
    const profileProduct = useSelector(getProfileProduct)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileThunkCreater(props.match.params.id))
    }, [])

        if (!profileProduct) return null
        return (
            <div className={s.profile}>
                <div className={s.navigation}>
                    <div className={s.title}>
                        {profileProduct.model}
                    </div>
                    <div className={s.back}>
                        <NavLink to = '/catalog'>Назад</NavLink>
                    </div>
                </div>

                <div className={s.imageBar}>
                    <div className={s.imageItem}>
                        <img src={"http://localhost:3012/" + profileProduct.image} alt=""/>
                    </div>
                    <div className={s.descriptItem}>
                        {profileProduct.descript}
                    </div>
                </div>
                <div className={s.charactBox}>
                    <div>
                        Характеристики
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Производитель</div>
                        <div>{profileProduct.model}</div>
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Страна</div>
                        <div>{profileProduct.country}</div>
                    </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Пол</div>
                        <div>{profileProduct.gender}</div>
                    </div>
                    <div className={s.characterItem}>
                    <div className={s.overview}>Тип аромата</div>
                    <div>{"восточные, цветочные"}</div>
                </div>
                    <div className={s.characterItem}>
                        <div className={s.overview}>Классификация</div>
                        <div>{profileProduct.classific}</div>
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
                        <div>{profileProduct.price}</div>
                    </div>
                </div>
            </div>
        )


}

const WithRouterProfile = withRouter(Profile)
export default WithRouterProfile