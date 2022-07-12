import React, { useCallback, useRef, useState } from "react"
import debounce from "lodash.debounce"

import styles from "./Search.module.scss"
import { ReactComponent as SearchImage } from "../../../assets/img/search.svg"
import { ReactComponent as CloseImage } from "../../../assets/img/close.svg"
import { selectFilters, setSearch } from "../../../redux/slices/filterSlice"
import { useDispatch, useSelector } from "react-redux"

const Search = () => {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const searchRef = useRef(null)
    const { searchValue } = useSelector(selectFilters)

    const onClickClear = () => {
        setValue("")
        dispatch(setSearch(""))
        searchRef.current.focus()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateSearchValue = useCallback(
        debounce((string) => {
            dispatch(setSearch(string))
        }, 600),
        []
    )

    const onInputChange = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }
    return (
        <div className={styles.root}>
            <SearchImage className={styles.icon} />
            <input
                className={styles.input}
                placeholder={"Поиск пицц...."}
                value={value}
                ref={searchRef}
                onChange={onInputChange}
            />
            {searchValue && (
                <CloseImage
                    className={styles.clearIcon}
                    onClick={onClickClear}
                />
            )}
        </div>
    )
}

export default Search
