import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { addProduct } from "redux/cart/slice"
import { TYPE_NAMES } from "assets/constants"
// @ts-ignore
import { PlusImage } from "assets/images"
import { Link } from "react-router-dom"
import { selectItemFromCartByProps } from "../../../redux/cart/selectors"

type Props = {
    title: string
    id: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    count: number
}

const PizzaBlock: React.FC<Props> = (pizza) => {
    const { title, id, price, imageUrl, sizes, types } = pizza
    const [activeSize, setSize] = React.useState<number>(0)
    const [activeType, setActiveType] = React.useState<number>(0)

    const dispatch = useDispatch()
    const currentItem = useSelector(
        selectItemFromCartByProps(id, activeType, activeSize)
    )

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: activeType,
            size: activeSize,
            count: 0
        }
        dispatch(addProduct(item))
    }

    return (
        <div className={"pizza-block-wrapper"}>
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </Link>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((typeId) => (
                            <li
                                className={
                                    activeType === typeId ? "active" : ""
                                }
                                onClick={() => setActiveType(typeId)}
                                key={typeId}
                            >
                                {TYPE_NAMES[typeId]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size, i) => (
                            <li
                                className={activeSize === i ? "active" : ""}
                                onClick={() => setSize(i)}
                                key={i}
                            >
                                {size} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button
                        onClick={onClickAdd}
                        className="button button--outline button--add"
                    >
                        <PlusImage />
                        <span>Добавить</span>
                        {currentItem && currentItem.count > 0 && (
                            <i>{currentItem.count}</i>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock
