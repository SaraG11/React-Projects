import { useMemo } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  placeOlder: () => void
}

export default function OrderTotals({ order, tip, placeOlder } : OrderTotalsProps) {

  const subtotalAmount = useMemo(() => order.reduce( ( total, item) =>
    total + (item.quantity * item.price), 0
  ), [order])

  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
  const totalPagar = useMemo(() => subtotalAmount + tipAmount, [tip, order])


  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina:</h2>
            <p>Subtotal a pagar: {''}
            <span className="font-bold">{ formatCurrency(subtotalAmount)}</span>
            </p>
            <p>Propina: {''}
            <span className="font-bold">{ formatCurrency(tipAmount)}</span>
            </p>

            <p>Total a pagar: {''}
            <span className="font-bold">{ formatCurrency(totalPagar)}</span>
            </p>

            
        </div>

        <button className="w-full bg-indigo-400 p-3 uppercase text-black font-bold mt-10 disabled:opacity-10" disabled={totalPagar===0}
          onClick={placeOlder}  >
            Guardar Orden
        </button>
    </>
  )
}
