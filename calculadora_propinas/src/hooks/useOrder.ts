import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"


export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    const addItem = (item: MenuItem) => {
        const itemExist = order.find(orderItem => orderItem.id === item.id)
        if(itemExist){
            const updateOrder = order.map( orders => orders.id === item.id ? {...orders, quantity: orders.quantity + 1} : orders)
            setOrder(updateOrder)
        }else{
            const newItem : OrderItem = {...item, quantity: 1}
        setOrder([...order, newItem])
        }
        
    }

    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter( item => item.id !== id))
    }

    const placeOlder = () => {
        setOrder([])
        setTip(0)
    }

    return{
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOlder
    }
}