import React, { useCallback, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import qs from "qs"
import { useNavigate } from "react-router-dom"

import { categories } from "assets/categories"

import Sort from "components/Home/Sort"
import PizzaBlock from "components/Home/PizzaBlock"
import Loader from "components/Home/Loader"
import Categories from "components/Home/Categories"
import Pagination from "components/Home/Pagination"

import { FetchStatusEnum } from "../@types/enums/FetchStatusEnum"

import { fetchPizzas } from "redux/pizza/slice"
import { useAppDispatch } from "redux/store"
import { selectFilters } from "../redux/filter/selectors"
import { selectPagination } from "../redux/pagination/selectors"
import { setCategoryId } from "../redux/filter/slice"
import { selectPizzas } from "../redux/pizza/selectors"

type SearchPizzaParams = {
    sortBy: string
    order: string
    categoryId: string
    search: string
    currentPage: number
}

const Home: React.FC = () => {
    const navigate = useNavigate()

    const { categoryId, sortType, searchValue } = useSelector(selectFilters)
    const { currentPage } = useSelector(selectPagination)
    const { items, status } = useSelector(selectPizzas)

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const dispatch = useAppDispatch()

    const onClickCategory = useCallback(
        (id: number) => dispatch(setCategoryId(id)),
        []
    )

    const getPizzas = async () => {
        const sortBy = sortType.sortProperty.replace("-", "")
        const order = sortType.sortProperty.includes("-") ? "desc" : "asc"

        const categoryAttrs = categoryId > 0 ? `category=${categoryId}` : ""
        const searchAttrs = searchValue ? `&search=${searchValue}` : ""
        const sortAttrs =
            categoryId > 0
                ? `&sortBy=${sortBy}&order=${order}`
                : `sortBy=${sortBy}&order=${order}`
        console.log("wtf")
        dispatch(
            fetchPizzas({
                currentPage,
                categoryAttrs,
                sortAttrs,
                searchAttrs
            })
        )
    }
    // TODO: fix useEffect
    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId: Number(categoryId),
                currentPage: Number(currentPage)
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    // Парсим параметры при первом рендере
    // useEffect(() => {
    //     if (window.location.search) {
    //         console.log(window.location.search)
    //         const params = qs.parse(
    //             window.location.search.substring(1)
    //         ) as unknown as SearchPizzaParams
    //         console.log(params)
    //         const sort = sortTypes.find(
    //             (obj) => obj.sortProperty === params.sortBy
    //         )
    //
    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId: Number(params.categoryId),
    //                 // @ts-ignore
    //                 sortType: sort.sortProperty
    //             })
    //         )
    //         dispatch(setCurrentPage(Number(params.currentPage)))
    //         isSearch.current = true
    //     }
    // }, [sortType])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, currentPage, searchValue])

    const pizzas = items.map((pizza: any) => (
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
                <Sort sortType={sortType} />
            </div>
            <h2 className="content__title">{categories[categoryId]} пиццы</h2>
            <div className="content__items">
                {status === FetchStatusEnum.PENDING ? loaders : pizzas}
            </div>
            <Pagination />
        </>
    )
}

export default Home
