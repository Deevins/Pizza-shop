import React from "react"

import { categories } from "assets/categories"

type Props = {
    categoryId: number
    onClickCategory: (i: number) => void
}

const Categories: React.FC<Props> = React.memo(
    ({ categoryId, onClickCategory }) => {
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
)

export default Categories
