import { IPizza } from "../../@types/IPizza"

export interface ICartSliceState {
    items: IPizza[]
    totalPrice: number
    totalItems: number
}
