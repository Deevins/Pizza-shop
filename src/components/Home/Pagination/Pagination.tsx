import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"
import { useDispatch } from "react-redux"
import { setCurrentPage } from "redux/pagination/slice"

const Pagination = () => {
    const dispatch = useDispatch()

    const updateCurrentPage = (e: any) =>
        dispatch(setCurrentPage(e.selected + 1))

    return (
        <div>
            <ReactPaginate
                breakLabel="<"
                nextLabel=">"
                onPageChange={updateCurrentPage}
                pageRangeDisplayed={2}
                pageCount={4}
                previousLabel="<"
                className={styles.root}
            />
        </div>
    )
}

export default Pagination
