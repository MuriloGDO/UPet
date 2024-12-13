import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface instituteForm {
  cnpj: string
  name: string
  phone: string
  address: string
  email: string
  password: string
}

const initialState: instituteForm = {
    cnpj: '',
    name: '',
    phone: '',
    address: '',
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
    setaddress(state, action: PayloadAction<string>) {
        state.address = action.payload
    },
    setCnpj(state, action: PayloadAction<string>) {
        state.cnpj = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
  },
  },
})

export const { setName, setaddress, setPhone, setEmail, setPassword, setCnpj } = registerInstituteSlice.actions
export default registerInstituteSlice.reducer
