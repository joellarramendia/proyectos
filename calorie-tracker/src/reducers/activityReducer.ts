import type { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } }

type ActivityState = {
    activities: Activity[]
}

export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {
        if (action.type === 'save-activity') {
            //ESTE CODIGO MANEJA LA LOGICA PARA ACTUALIZAR EL STATE
            return {
                ...state,
                activities: [...state.activities, action.payload.newActivity]
            }
        }

        return state
}