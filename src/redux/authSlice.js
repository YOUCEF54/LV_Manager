import { createSlice } from '@reduxjs/toolkit'
import PropTypes from 'prop-types';

const initialState = {
  value: JSON.parse(localStorage.getItem('token')) || null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer

authSlice.PropTypes = {
  auth : PropTypes.object
}
