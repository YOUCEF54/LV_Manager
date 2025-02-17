import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import newContratReducer from './newContratSlice'
import newLocalisationSliceReducer from './newLocalisationSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    newContrat:newContratReducer,
    newLocalisation:newLocalisationSliceReducer
  }
})
