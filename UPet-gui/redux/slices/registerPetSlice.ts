import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface petForm {
    name: string
    species: string
    date_of_birth: string
    description: string
    photo: string | undefined | null
}

const initialState: petForm = {
    name: '',
    species: '',
    date_of_birth: '',
    description: '',
    photo: '',
}

const registerPetSlice = createSlice({
    name: 'registerPet',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setSpecies(state, action: PayloadAction<string>) {
            state.species = action.payload
        },
        setDateOfBirth(state, action: PayloadAction<string>) {
            state.date_of_birth = action.payload
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload
        },
        setPhoto(state, action: PayloadAction<string | undefined | null>) {
            state.photo = action.payload
        },
    },
})

export const { setName, setSpecies, setDateOfBirth, setDescription, setPhoto } = registerPetSlice.actions
export default registerPetSlice.reducer