import {useState} from "react"
import {v4 as uuidv4} from "uuid"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions } from "../reducers/activityReducer"

type FormProps = {
    dispatch: React.Dispatch<ActivityActions>
}

// Estado inicial para un nuevo activity. `uuidv4()` genera un id único.
const initialState : Activity = {
        id: uuidv4(),
        category: 1, // 1 representa comida por defecto
        name: '',
        calories: 0
    }

export default function Form({dispatch}: FormProps) {

    // Estado local del formulario que representa la actividad que se está creando
    const [activity, setActivity] = useState<Activity>(initialState)

    // Manejador genérico para inputs/selects. Convierte a número si el campo
    // es `category` o `calories`, que en el modelo son numéricos.
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    // Validación simple: nombre no vacío y calorías > 0
    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    // Envío del formulario: evita el reload, despacha la acción al reducer
    // y resetea el formulario con un nuevo id.
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'save-activity', payload: {newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

  return (
    // Formulario principal: contiene select para categoría, input para nombre
    // y input numérico para calorías. El botón de submit se desactiva si la
    // validación falla.
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            {/* Select de categorías: el valor viene de `categories` importado */}
            <select
                className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            {/* Input de texto para el nombre de la actividad */}
            <input 
                id="name" 
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            {/* Input numérico para calorías */}
            <input 
                id="calories" 
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Calorias. Ej. 300 o 500"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        {/* Botón de envío: texto cambia según categoría y se desactiva si inválido */}
        <input 
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}
