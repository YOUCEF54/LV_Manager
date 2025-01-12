import { createSlice } from '@reduxjs/toolkit'
import PropTypes from 'prop-types';

const initialState = {
  value: {"isOpen":false},
}

export const newContratSlice = createSlice({
  name: 'newContrat',
  initialState,
  reducers: {
    setIsOpenNewContrat: (state,action) => {
      state.value.isOpen = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsOpenNewContrat } = newContratSlice.actions

export default newContratSlice.reducer

newContratSlice.PropTypes = {
    newContrat : PropTypes.object
}
