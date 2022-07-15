import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import logoSvg from "assets/img/pizza-logo.svg"
// @ts-ignore
import { CartImg } from "assets/images"
import Search from "../../Home/Search"
import { selectCart } from "../../../redux/cart/selectors"

const Header: React.FC = () => {
    const { items, totalPrice, totalItems } = useSelector(selectCart)
    const isMounted = useRef(false)
    const location = useLocation()

    React.useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items)
            localStorage.setItem("cart", json)
        }
        isMounted.current = true
    }, [items])

    return (
        <div className="header">
            <div className="container">
                <div className="header__logo">
                    <img width="38" src={logoSvg} alt="Pizza logo" />
                    <Link to={"/"}>
                        <h1>React Pizza</h1>
                        <p>самая вкусная пицца во вселенной</p>
                    </Link>
                </div>
                {location.pathname !== "/cart" && <Search />}
                {location.pathname !== "/cart" && (
                    <div className="header__cart">
                        <Link to={"/cart"} className="button button--cart">
                            <span>{totalPrice} ₽</span>
                            <div className="button__delimiter" />
                            <div>
                                <CartImg />
                                <span>{totalItems}</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
