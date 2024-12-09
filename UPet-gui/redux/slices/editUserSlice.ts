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
    setEditName(state, action: PayloadAction<string>) {
        state.name = action.payload
    },
    setEditEmail(state, action: PayloadAction<string>) {
        state.email = action.payload
    },
    setEditaddress(state, action: PayloadAction<string>) {
        state.address = action.payload
    },
    setEditPhoto(state, action: PayloadAction<string | undefined | null>) {
        state.photo = action.payload
    },
    setEditDescription(state, action: PayloadAction<string>) {
        state.description = action.payload
    },
    setEditPhone(state, action: PayloadAction<string>) {
        state.telephone = action.payload
    },
  },
})

export const { setEditName, setEditaddress, setEditPhone, setEditEmail, setEditPhoto, setEditDescription } = EditUserSlice.actions
export default EditUserSlice.reducer
