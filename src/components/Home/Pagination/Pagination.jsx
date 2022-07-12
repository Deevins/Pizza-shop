import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"
import { useDispatch } from "react-redux"

import { setCurrentPage } from "../../../redux/slices/paginationSlice"

const Pagination = () => {
    const dispatch = useDispatch()

    const updateCurrentPage = (e) => dispatch(setCurrentPage(e.selected + 1))

    return (
        <div>
            <ReactPaginate
                breakLabel="<"
                nextLabel=">"
                onPageChange={updateCurrentPage}
                pageRangeDisplayed={2}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className={styles.root}
            />
        </div>
    )
}

export default Pagination
