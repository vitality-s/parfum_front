import React, {useRef, useState} from 'react'
import s from './Card-box.module.css'
import {Empty} from 'antd';
import {ShoppingCartOutlined} from "@ant-design/icons"
import {DownOutlined} from "@ant-design/icons"
import * as classnames from "classnames";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCardData, getFilterBy, getSearchQuery} from "../../selectors/catalogSelector";
import {filterByHelper} from "../../helpers/filterByHelper";
import {addBasketItemThunkCreater, removeBasketItemThunkCreater} from "../../redux/redusers/basket";
import {setCardThunkCreater} from "../../redux/redusers/card";

const CardBox = (props) => {
    const dispatch = useDispatch()

    let cardData = useSelector(getCardData)
    const filterBy = useSelector(getFilterBy)
    const searchQuery = useSelector(getSearchQuery)


    if (cardData) cardData = filterByHelper(cardData, filterBy, searchQuery)

    const boxRef = useRef()
    const [count, setCount] = useState(false)
    const priceOld = 1000;
    const addBasketItem = (item) => {
        dispatch(addBasketItemThunkCreater(item))
        setInterval(() => {
            setCount(true)
        }, 2000)
    }
    const removeBasketItem = (item) => {
        dispatch(removeBasketItemThunkCreater(item))
        setInterval(() => {
            setCount(false)
        }, 2000)
    }

       const onScroll = (e) => {
               const elem = e.target;
               const condition = Math.ceil(elem.scrollTop) + elem.offsetHeight === elem.scrollHeight
           debugger
               if(condition) {
                   dispatch(setCardThunkCreater(cardData.length + 1))
               }
               debugger
           }

    return (
        <div className={s.CardBox} onScroll={(e) => {onScroll(e)}}>
            {!cardData || cardData.length === 0 ? (<div className={s.empty}>
                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"/>
            </div>) : (cardData.map(card => {
                return (
                    <div key={card._id} className={s.cardItem}>
                        <div className={s.cardImage}>
                            <img src={"http://localhost:3012/" + card.image} alt=""/>
                        </div>
                        <div className={s.notes_bar}>
                            <div className={classnames(s.emblem, card.emblem === "Акция" && s.stock)}>
                                {card.emblem}
                            </div>
                            <div className={s.gender}>{card.gender}</div>
                        </div>
                        <div className={s.title}>
                            <NavLink to = {'/catalog/'+card._id}>{card.title}</NavLink>
                        </div>
                        <div className={s.shopBox}>
                            <div className={s.priceInfo}>
                                <div className={s.priceNow}>
                                    {card.price + " грн"}
                                </div>
                                {priceOld && <div className={s.priceOld}>
                                    {priceOld + " грн"}
                                </div>}
                            </div>
                            <div className={s.basketBuy}>
                                {card.isAdd ?
                                    <button onClick={() => {removeBasketItem(card)}} className={s.active}>
                                        <DownOutlined/>
                                    </button> :
                                    <button onClick={() => {addBasketItem(card)}} className={s.active}>
                                        <ShoppingCartOutlined/>
                                    </button>

                                }
                            </div>
                        </div>
                    </div>
                )
            }))}
        </div>
    )
}
export default CardBox