import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InstitutionInfo {
  id: number | null
  name: string
  telephone: string
  email: string
  address: string
  cnpj: string
  user_type: string
}

const initialState: InstitutionInfo = {
    name: '',
    telephone: '',
    email: '',
    address: '',
    cnpj: '',
    id: null,
    user_type: ''
}

const InstitutionInfoSlice = createSlice({
  name: 'InstitutionInfo',
  initialState,
  reducers: {
    setInstName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setInstPhone(state, action: PayloadAction<string>) {
        state.telephone = action.payload
    },
    setInstEmail(state, action: PayloadAction<string>) {
        state.email = action.payload
    },
    setInstAddress(state, action: PayloadAction<string>) {
        state.address = action.payload
    },
    setInstCnpj(state, action: PayloadAction<string>) {
        state.cnpj = action.payload
    },
    setInstId(state, action: PayloadAction<number>) {
        state.id = action.payload
    },
    setInstType(state, action: PayloadAction<string>) {
        state.user_type = action.payload
    },
  },
})

export const { setInstAddress, setInstEmail, setInstId, setInstName, setInstPhone, setInstType, setInstCnpj } = InstitutionInfoSlice.actions
export default InstitutionInfoSlice.reducer
