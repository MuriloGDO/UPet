import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface editUserInfo {
  name: string
  telephone: string
  email: string
  address: string
  photo: string | null | undefined
  description: string
}

const initialState: editUserInfo = {
    name: '',
    telephone: '',
    email: '',
    address: '',
    photo: '',
    description: ''
}

const EditUserSlice = createSlice({
  name: 'EditUserSlice',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
        state.name = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
        state.email = action.payload
    },
    setaddress(state, action: PayloadAction<string>) {
        state.address = action.payload
    },
    setPhoto(state, action: PayloadAction<string | undefined | null>) {
        state.photo = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
        state.description = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
        state.telephone = action.payload
    },
  },
})

export const { setName, setaddress, setPhone, setEmail, setPhoto, setDescription } = EditUserSlice.actions
export default EditUserSlice.reducer
