import React from 'react';
import s from './Own.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Empty} from "antd";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {removeCatalogItemThunkCreater} from "../../redux/redusers/card";
import Photo from "../PhotoUser/Photo";
import {removeOrderItemThunkCreater} from "../../redux/redusers/basket";
import SignupForm from "../Add-item/AddFormWithFormik";
import {getCardData} from "../../selectors/catalogSelector";
import {getOrders} from "../../selectors/basketSelector";

const OwnPage = () => {
    const dispatch = useDispatch()
    const cardData = useSelector(getCardData)
    const orders = useSelector(getOrders)

    const removeCatalogItem = (id) => {
        if (global.confirm('Ви действительно хотите удалить елемент из каталого?')) {
            dispatch(removeCatalogItemThunkCreater(id))
        }
    }
    const removeOrderItem = (id) => {
        dispatch(removeOrderItemThunkCreater(id))
    }


        return (
            <div className={s.container}>
                <div className={s.menu_wrapper}>
                    <div>Kudin Vitaliy</div>
                    <div className={s.menu_wrapper_item}>La Parfumerie</div>
                    <div><NavLink to='/catalog'>Назад</NavLink></div>
                </div>
                <div className={s.content}>
                    <div className={s.content_item}>
                        <div className={s.content_item_title}>Добавить</div>
                        <div className={s.addBox}>
                            <div className={s.formBox}>
                                <SignupForm/>
                            </div>
                        </div>
                    </div>
                    <div className={s.content_item}>
                        <div className={s.content_item_title}>Товари</div>
                        <div className={s.catalogBox}>
                            {cardData && cardData.length !== 0 ?
                                cardData.map((item) => {
                                    return (
                                        <div key={item._id} className={s.itemBox}>
                                            <div>
                                                <img src={"http://localhost:3012/" + item.image} alt=""/>
                                            </div>
                                            <div className={s.itemBox_title}>
                                                <p>{item.title}</p>
                                            </div>
                                            <div className={s.itemBox_delete}>
                                                <button onClick={() => {
                                                    removeCatalogItem(item._id)
                                                }}>
                                                    <DeleteOutlined/>
                                                </button>
                                                <div>{item.price} грн</div>
                                            </div>
                                        </div>
                                    )
                                }) : (<div className={s.empty}>
                                    <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"/>
                                </div>)}
                        </div>
                    </div>
                    <div className={s.content_item}>
                        <div className={s.content_item_title}>Закази</div>
                        <div className={s.orderbox}>
                            {!orders || orders.length === 0 ? <div className={s.empty}>
                                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"/>
                            </div> : orders.map((item) => {
                                return (
                                    <div key={item._id} className={s.itemBox}>
                                        <div>
                                            <Photo hash = {item.email} char = {item.name}/>
                                        </div>
                                        <div className={s.itemBox_title}>
                                            <div className={s.limit}>{"Покупатель: " + item.name + " " + item.surname}</div>
                                            <div className={s.limit}>{"Телефон: " + item.number}</div>
                                            <div className={s.limit}>{"Email: " + item.email}</div>
                                            <div className={s.limit}>{"Сумма заказа: " + item.price}</div>
                                        </div>
                                        <div>
                                            <button onClick={() => {removeOrderItem(item._id)}}>
                                                <DeleteOutlined/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        )
}


export default OwnPage
