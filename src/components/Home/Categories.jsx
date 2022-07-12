import { categories } from "../../assets/categories"

const Categories = ({ categoryId, onClickCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((el, i) => (
                    <li
                        onClick={() => onClickCategory(i)}
                        className={categoryId === i ? "active" : null}
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
