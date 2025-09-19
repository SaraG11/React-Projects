import { useState, type Dispatch } from "react"
import { v7 as uuidv7 } from "uuid"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import type { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}
const initianState : Activity = {
    id: uuidv7(),
    category: 1,
    name: '',
    calories: 0
}
export default function Form({ dispatch} : FormProps) { 

    const [activity, setActivity] = useState<Activity>(initianState)

    const handleChange =  (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberFiel = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberFiel ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {

        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: {newActivity: activity}})
        setActivity({
            ...initianState,
            id: uuidv7()
        })
    }
     
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select name="" id="category" className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                 value={activity.category} onChange={handleChange}>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input type="text" id="name" value={activity.name} onChange={handleChange}
             className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Comida, Jugo de Naranja, Ejercicio, Pesa, Bicicleta" />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input type="number" value={activity.calories} onChange={handleChange} id="calories" className="border border-slate-300 p-2 rounded-lg" placeholder="Calorias. ej. 300 500" />
        </div>

        <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" 
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />

    </form>
   
  )
}
