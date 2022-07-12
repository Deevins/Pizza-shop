import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categoryId: 0,
    sortType: {
        title: "популярности (ASC)",
        sortProperty: "rating"
    },
    searchValue: ""
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sortType = action.payload
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId)
            state.sortType = action.payload.sortType
        },
        setSearch(state, action) {
            state.searchValue = action.payload
        }
    }
})

export const selectFilters = (state) => state.filter

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setFilters, setSearch } =
    filterSlice.actions

export default filterSlice.reducer
