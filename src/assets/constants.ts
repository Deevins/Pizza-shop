import { SortTypeItem } from "../@types/SortTypeItem"
import { SortPropertyEnum } from "../@types/enums/SortPropertyEnum"

export const ITEMS_PER_PAGE = 4
export const ITEMS_FETCH_URL =
    "https://62b371bba36f3a973d223580.mockapi.io/items"
export const TYPE_NAMES = ["Тонкое", "Традиционное"]
export const SIZE_TYPES = [26, 30, 40]
export const sortTypes: SortTypeItem[] = [
    {
        title: "популярности (ASC)",
        sortProperty: SortPropertyEnum.RATING_ASC
    },
    {
        title: "популярности (DESC)",
        sortProperty: SortPropertyEnum.RATING_DESC
    },

    {
        title: "цене (ASC)",
        sortProperty: SortPropertyEnum.PRICE_ASC
    },
    {
        title: "цене (DESC)",
        sortProperty: SortPropertyEnum.PRICE_DESC
    },

    {
        title: "алфавиту (ASC)",
        sortProperty: SortPropertyEnum.TITLE_ASC
    },
    {
        title: "алфавиту (DESC)",
        sortProperty: SortPropertyEnum.TITLE_DESC
    }
]
