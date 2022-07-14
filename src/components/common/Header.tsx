import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import logoSvg from "../../assets/img/pizza-logo.svg"
// @ts-ignore
import { CartImg } from "../../assets/images"
import Search from "../Home/Search/Search"
import { selectCart } from "../../redux/slices/cartSlice"

const Header: React.FC = () => {
    const { totalPrice, totalItems } = useSelector(selectCart)

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
                <Search />
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
            </div>
        </div>
    )
}

export default Header
