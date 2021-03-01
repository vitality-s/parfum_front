import React, {useEffect} from "react";
import s from './Basket.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Empty} from "antd";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import WithCheckoutFormik from "../Checkout/withCheckoutFormik";
import {checkParamsAC, removeBasketAC,} from "../../redux/redusers/basket";
import {getBasketData, getTotalPrice} from "../../selectors/basketSelector";

const BasketPage = () => {
    const dispatch = useDispatch()
    const basketData = useSelector(getBasketData)
    const totalPrice = useSelector(getTotalPrice)

    const basketItem = basketData.reduce((arr, item) => {
        arr.push(item.id)
        return arr
    }, [])
    const totalPriceCount = basketData.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        dispatch(checkParamsAC(basketItem, totalPriceCount))
    }, [basketData])

    const removeBasketItem = (id) => {
        dispatch(removeBasketAC(id))
    }
    return (
        <section className={s.container}>
            <div className={s.header}>
                <div className={s.icon}>
                    <NavLink to='/catalog'>
                        Назад
                    </NavLink>
                </div>
                <div>Корзина</div>
                {totalPrice ? (<div className={s.total}>
                    <div>Итого:</div>
                    <div>{totalPrice} грн</div>
                </div>) : <div></div>}
            </div>
            <div className={s.box}>
                {!basketData || basketData.length === 0 ?
                    <div className={s.empty}>
                        <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                               imageStyle={{
                                   height: 60
                               }}/>
                    </div> :
                    <div className={s.basketContent}>
                        {basketData.map((item) => {
                            return (
                                <div key={item._id} className={s.basketBox}>
                                    <div>
                                        <img src={"http://localhost:3012/" + item.image} alt=""/>
                                    </div>
                                    <div className={s.title}>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className={s.delete}>
                                        <button onClick={() => {
                                            removeBasketItem(item._id)
                                        }}>
                                            <DeleteOutlined/>
                                        </button>
                                        <div>{item.price} грн</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={s.checkout}>
                            <div className={s.checkout_title}>
                                <h3>Оформить заказ</h3>
                            </div>
                            <WithCheckoutFormik totalPrice={totalPrice}/>
                        </div>
                    </div>}
            </div>

        </section>
    )
}


export default BasketPage

