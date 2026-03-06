import { useReducer, createContext } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: React.ActionDispatch<[action: BudgetActions]>
}

type BudgetProviderProps = {
    children: React.ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}>
            {children}
        </BudgetContext.Provider>
    )
}