import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { selectSortFilter, setSort } from "../../redux/slices/filterSlice"
import { sortTypes } from "../../assets/constants"
import { SortTypeItem } from "../../@types/SortTypeItem"

type PopupClickType = {
    path: Node[]
}

const Sort: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const sortType = useSelector(selectSortFilter)
    const sortRef = useRef<HTMLDivElement>(null)

    const onSortClick = (obj: SortTypeItem) => {
        setIsOpen(false)
        dispatch(setSort(obj))
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as MouseEvent & PopupClickType
            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setIsOpen(false)
            }
        }

        document.body.addEventListener("click", handleClickOutside)

        return () =>
            document.body.removeEventListener("click", handleClickOutside)
    }, [])

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label" onClick={() => setIsOpen(!isOpen)}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isOpen ? "transform" : ""}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span>{sortType?.title}</span>
            </div>
            {isOpen && (
                <div className="sort__popup">
                    <ul>
                        {sortTypes.map((obj, i) => (
                            <li
                                key={i}
                                onClick={() => onSortClick(obj)}
                                className={
                                    sortType.sortProperty === obj.sortProperty
                                        ? "active"
                                        : ""
                                }
                            >
                                {obj.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Sort
