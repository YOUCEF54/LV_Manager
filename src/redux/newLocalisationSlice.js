import { createSlice } from '@reduxjs/toolkit'
import PropTypes from 'prop-types';

const initialState = {
  value: {
    "depart":"",
    "date":null,
    "nombreJours":0,
    "arrive":""
  },
}

export const newLocalisationSlice = createSlice({
  name: 'newLocalisation',
  initialState,
  reducers: {
    setLocalisation: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLocalisation } = newLocalisationSlice.actions

export default newLocalisationSlice.reducer

newLocalisationSlice.PropTypes = {
    newContrat : PropTypes.object
}
