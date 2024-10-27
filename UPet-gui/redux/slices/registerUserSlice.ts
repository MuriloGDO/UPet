import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userForm {
  name: string
  phone: string
  email: string
  birth: string
  adress: string
  cpf: string
  photo: File | null
  description: string
  password: string
}

const initialState: userForm = {
    name: '',
    phone: '',
    email: '',
    birth: '',
    adress: '',
    cpf: '',
    photo: null,
    description: '',
    password:''
}

const registerUserSlice = createSlice({
  name: 'registerUser',
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
    setBirth(state, action: PayloadAction<string>) {
        state.birth = action.payload
    },
    setAdress(state, action: PayloadAction<string>) {
        state.adress = action.payload
    },
    setCpf(state, action: PayloadAction<string>) {
        state.cpf = action.payload
    },
    setPhoto(state, action: PayloadAction<File>) {
        state.photo = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
        state.description = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
  },
  },
})

export const { setName, setAdress, setPhone, setEmail, setBirth, setCpf, setPhoto, setDescription, setPassword } = registerUserSlice.actions
export default registerUserSlice.reducer
