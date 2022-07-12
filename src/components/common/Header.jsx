import logoSvg from "../../assets/img/pizza-logo.svg"
import { ReactComponent as CartSvg } from "../../assets/img/cart.svg"
import { Link } from "react-router-dom"
import Search from "../Home/Search/Search"
import { useSelector } from "react-redux"
import { selectCart } from "../../redux/slices/cartSlice"

const Header = () => {
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
                            <CartSvg />
                            <span>{totalItems}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
