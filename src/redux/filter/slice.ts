import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SortTypeItem } from "../../@types/SortTypeItem"
import { SortPropertyEnum } from "../../@types/enums/SortPropertyEnum"
import { IFilterSliceState } from "./types"

const initialState: IFilterSliceState = {
    categoryId: 0,
    sortType: {
        title: "популярности (DESC)",
        sortProperty: SortPropertyEnum.RATING_DESC
    },
    searchValue: ""
}

export const slice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<SortTypeItem>) {
            state.sortType = action.payload
        },
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setFilters(state, action: PayloadAction<IFilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId)
                state.sortType = action.payload.sortType
                state.searchValue = action.payload.searchValue
            } else {
                state.categoryId = 0
                state.sortType = {
                    title: "популярности",
                    sortProperty: SortPropertyEnum.RATING_DESC
                }
            }
        }
    }
})

export const { setCategoryId, setSort, setFilters, setSearch } = slice.actions

export default slice.reducer
