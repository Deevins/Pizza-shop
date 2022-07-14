import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, selectCart } from "../redux/slices/cartSlice"
import PizzaItem from "../components/Cart/PizzaItem"
import CartEmpty from "../components/Cart/CartEmpty"
// @ts-ignore
import { CartTrash, LeftArrow, CartImg } from "../assets/images"

const Cart: React.FC = () => {
    const { items, totalPrice, totalItems } = useSelector(selectCart)
    const dispatch = useDispatch()

    const onClickClear = () => {
        if (window.confirm("Вы уверены, что хотите очистить корзину?")) {
            dispatch(clearCart())
        }
    }

    if (!totalPrice) return <CartEmpty />

    return (
        <div className="cart">
            <div className="cart__top">
                <h2 className="content__title">
                    <CartImg />
                    Корзина
                </h2>
                <div className="cart__clear">
                    <CartTrash />
                    <span onClick={onClickClear}>Очистить корзину</span>
                </div>
            </div>
            {
                <div className="content__items">
                    {items.map((el: any, idx: number) => (
                        <PizzaItem key={idx} {...el} />
                    ))}
                </div>
            }
            <div className="cart__bottom">
                <div className="cart__bottom-details">
                    <span>
                        Всего пицц: <b>{totalItems} шт.</b>
                    </span>
                    <span>
                        Сумма заказа: <b>{totalPrice ? totalPrice : 0} ₽</b>
                    </span>
                </div>
                <div className="cart__bottom-buttons">
                    <a
                        href="/"
                        className="button button--outline button--add go-back-btn"
                    >
                        <LeftArrow />
                        <span>Вернуться назад</span>
                    </a>
                    <div className="button pay-btn">
                        <span>Оплатить сейчас</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
