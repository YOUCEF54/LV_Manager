import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import newContratReducer from './newContratSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    newContrat:newContratReducer
  }
})
