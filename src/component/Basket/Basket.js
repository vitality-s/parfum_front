import React from "react";
import s from './Basket.module.css'
import {NavLink} from "react-router-dom";
import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined";
import {connect} from "react-redux";
import {Empty} from "antd";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import WithCheckoutFormik from "../Checkout/withCheckoutFormik";
import {checkParamsAC, removeBasketAC,} from "../../redux/redusers/basket";

class Basket extends React.Component {
    componentDidMount() {
        this.props.checkParams(this.props.basketItem, this.props.totalPrice)
    }

    removeBasketItem = (id) => {
        this.props.removeBasketItem(id)
    }
    render() {
        return (
            <section className={s.container}>
                <div className={s.header}>
                    <div className={s.icon}>
                        <NavLink to = '/catalog'>
                            Назад
                        </NavLink>
                    </div>
                    <div>Корзина</div>
                    {this.props.totalPrice ? (<div className={s.total}>
                        <div>Итого:</div>
                        <div>{this.props.totalPrice} грн</div>
                    </div>) : <div></div> }
                </div>
                    <div className={s.box}>
                        {!this.props.basketData || this.props.basketData.length === 0 ?
                            <div className={s.empty}>
                                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                       imageStyle={{
                                           height: 60}} />
                            </div> :
                        <div className={s.basketContent}>
                            {this.props.basketData.map((item) => {
                                return (
                                    <div className={s.basketBox}>
                                        <div>
                                            <img src={"http://localhost:3012/" + item.image} alt=""/>
                                        </div>
                                        <div className={s.title}>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className={s.delete}>
                                            <button onClick={() => {this.removeBasketItem(item._id)}}>
                                                <DeleteOutlined />
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
                                <WithCheckoutFormik totalPrice = {this.props.totalPrice}/>
                            </div>
                        </div>}
                    </div>

            </section>
        )
    }
}

const mapStateToProps = ({basket}) => {
    return {
        basketData: basket.basketData,
        totalPrice: basket.basketData.reduce((total,item ) => total + item.price, 0),
        basketItem: basket.basketData.reduce((arr, item) => {
            arr.push(item.id)
        return arr}, [])
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeBasketItem: (id) => {
            dispatch(removeBasketAC(id))
        },
        checkParams: (item, price) => {
            dispatch(checkParamsAC(item, price))
        }
    }
}
const BasketContainer = connect(mapStateToProps, mapDispatchToProps)(Basket)
export default BasketContainer

