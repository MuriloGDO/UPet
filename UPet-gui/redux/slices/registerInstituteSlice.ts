import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface instituteForm {
  cnpj: string
  name: string
  phone: string
  adress: string
  email: string
  password: string
}

const initialState: instituteForm = {
    cnpj: '',
    name: '',
    phone: '',
    adress: '',
    email: '',
    password: ''
}

const registerInstituteSlice = createSlice({
  name: 'registerInstitute',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
        state.phone = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
        state.email = action.payload
    },
    setAdress(state, action: PayloadAction<string>) {
        state.adress = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
  },
  },
})

export const { setName, setAdress, setPhone, setEmail, setPassword } = registerInstituteSlice.actions
export default registerInstituteSlice.reducer
