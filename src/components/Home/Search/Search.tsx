import React from "react"
import debounce from "lodash.debounce"
import { useDispatch, useSelector } from "react-redux"

import styles from "./Search.module.scss"

// @ts-ignore
import { CloseImage, SearchImage } from "assets/images"
import { selectFilters } from "../../../redux/filter/selectors"
import { setSearch } from "../../../redux/filter/slice"

const Search = () => {
    const [value, setValue] = React.useState("")
    const dispatch = useDispatch()
    const searchRef = React.useRef<HTMLInputElement>(null)
    const { searchValue } = useSelector(selectFilters)

    const onClickClear = () => {
        setValue("")
        dispatch(setSearch(""))
        searchRef.current?.focus()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearch(str))
        }, 300),
        []
    )

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
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
