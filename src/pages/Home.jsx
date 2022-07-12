/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import qs from "qs"
import { useNavigate } from "react-router-dom"

import Categories from "../components/Home/Categories"
import Sort, { sortTypes } from "../components/Home/Sort"
import PizzaBlock from "../components/Home/PizzaBlock"
import Loader from "../components/Home/Loader"
import Pagination from "../components/Home/Pagination/Pagination"

import { categories } from "../assets/categories"
import { PENDING } from "../assets/fetchStatus"

import {
    selectFilters,
    setCategoryId,
    setFilters
} from "../redux/slices/filterSlice"

import {
    selectPagination,
    setCurrentPage
} from "../redux/slices/paginationSlice"

import { fetchPizzas, selectPizzas } from "../redux/slices/pizzaSlice"

const Home = () => {
    const navigate = useNavigate()
    const { categoryId, sortType, searchValue } = useSelector(selectFilters)
    const { currentPage } = useSelector(selectPagination)
    const { items, status } = useSelector(selectPizzas)
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const dispatch = useDispatch()

    const onClickCategory = (id) => dispatch(setCategoryId(id))

    const getPizzas = async () => {
        const sortBy = sortType.sortProperty.replace("-", "")
        const order = sortType.sortProperty.includes("-") ? "desc" : "asc"

        const categoryAttrs = categoryId > 0 ? `category=${categoryId}` : ""
        const searchAttrs = searchValue ? `&search=${searchValue}` : ""
        const sortAttrs =
            categoryId > 0
                ? `&sortBy=${sortBy}&order=${order}`
                : `sortBy=${sortBy}&order=${order}`

        dispatch(
            fetchPizzas({
                currentPage,
                categoryAttrs,
                sortAttrs,
                searchAttrs
            })
        )
    }

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    // Парсим параметры при первом рендере
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortTypes.find(
                (obj) => obj.sortProperty === params.sortProperty
            )
            dispatch(
                setFilters({
                    sortType: sort,
                    categoryId: params.categoryId
                })
            )
            dispatch(setCurrentPage(params.currentPage))
            isSearch.current = true
        }
    }, [])

    //
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, currentPage])

    const pizzas = items.map((pizza) => (
        <PizzaBlock {...pizza} key={pizza.id} />
    ))
    const loaders = [...Array(8)].map((item, i) => <Loader key={i} />)

    return (
        <>
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort />
            </div>
            <h2 className="content__title">{categories[categoryId]} пиццы</h2>
            <div className="content__items">
                {status === PENDING ? loaders : pizzas}
            </div>
            <Pagination />
        </>
    )
}

export default Home
