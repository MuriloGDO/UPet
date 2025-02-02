import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface editInstInfo {
  name: string
  telephone: string
  email: string
  address: string
}

const initialState: editInstInfo = {
    name: '',
    telephone: '',
    email: '',
    address: ''
}

const EditInstSlice = createSlice({
  name: 'EditInstSlice',
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
    setEditPhone(state, action: PayloadAction<string>) {
        state.telephone = action.payload
    },
  },
})

export const { setEditName, setEditaddress, setEditPhone, setEditEmail} = EditInstSlice.actions
export default EditInstSlice.reducer
