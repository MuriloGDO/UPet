import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MatchingPet } from '../../app/utils/petsResponseInterface'

interface UiSlice {
  pets: MatchingPet[] 
}

const initialState: UiSlice = {
    pets: []
}

const PetsResponse = createSlice({
  name: 'PetsSlice',
  initialState,
  reducers: {
    setPetsResponse(state, action: PayloadAction<MatchingPet[]>) {
      state.pets = action.payload
    },
  },
})

export const { setPetsResponse } = PetsResponse.actions
export default PetsResponse.reducer
