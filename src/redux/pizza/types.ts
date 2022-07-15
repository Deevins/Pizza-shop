import { IPizza } from "../../@types/IPizza"
import { FetchStatusEnum } from "../../@types/enums/FetchStatusEnum"

export interface IPizzaSliceState {
    items: IPizza[]
    status: FetchStatusEnum
}

export type FetchPizzaArgs = {
    currentPage: number
    categoryAttrs: string
    sortAttrs: string
    searchAttrs: string
}
