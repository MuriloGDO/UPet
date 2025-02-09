import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MatchingPet } from '../../app/utils/ResponsesInterface'

interface UiSlice {
  pets: MatchingPet[] 
  petsByInstitution: MatchingPet[] 
}

const initialState: UiSlice = {
    pets: [],
    petsByInstitution: []
}

const PetsResponse = createSlice({
  name: 'PetsSlice',
  initialState,
  reducers: {
    setPetsResponse(state, action: PayloadAction<MatchingPet[]>) {
      state.pets = action.payload
    },
    setPetsByInstitution(state, action: PayloadAction<MatchingPet[]>) {
      state.petsByInstitution = action.payload
    },
  },
})

export const { setPetsResponse, setPetsByInstitution } = PetsResponse.actions
export default PetsResponse.reducer
