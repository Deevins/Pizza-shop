import { IPizza } from "../@types/IPizza"

export const calcTotalPrice = (items: IPizza[]) => {
    if (items) {
        return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
    } else {
        return 0
    }
}
