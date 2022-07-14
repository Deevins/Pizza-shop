import { categories } from "../../assets/categories"
import React from "react"

type Props = {
    categoryId: number
    onClickCategory: (i: number) => void
}

const Categories: React.FC<Props> = ({ categoryId, onClickCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((el, i) => (
                    <li
                        onClick={() => onClickCategory(i)}
                        className={categoryId === i ? "active" : ""}
                        key={i}
                    >
                        {el}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
