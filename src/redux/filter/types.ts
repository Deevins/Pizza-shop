import { SortTypeItem } from "../../@types/SortTypeItem"

export interface IFilterSliceState {
    categoryId: number
    sortType: SortTypeItem
    searchValue: string
}
