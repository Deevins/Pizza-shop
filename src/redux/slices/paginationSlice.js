import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: 1,
    pageCount: 1
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = Number(action.payload)
        },
        setPageCount(state, action) {
            state.pageCount = action.payload
        }
    }
})

export const selectPagination = (state) => state.pagination

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPageCount } = paginationSlice.actions

export default paginationSlice.reducer
