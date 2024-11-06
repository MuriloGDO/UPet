import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userInfo {
  id: number | null
  name: string
  telephone: string
  email: string
  date_of_birth: string
  address: string
  cpf: string
  photo: string | null | undefined
  description: string
  cluster: number | null
}

const initialState: userInfo = {
    name: '',
    telephone: '',
    email: '',
    date_of_birth: '',
    address: '',
    cpf: '',
    photo: '',
    description: '',
    cluster: null,
    id: null
}

const UserInfoSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
        state.telephone = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
        state.email = action.payload
    },
    setBirth(state, action: PayloadAction<string>) {
        state.date_of_birth = action.payload
    },
    setaddress(state, action: PayloadAction<string>) {
        state.address = action.payload
    },
    setCpf(state, action: PayloadAction<string>) {
        state.cpf = action.payload
    },
    setPhoto(state, action: PayloadAction<string | undefined | null>) {
        state.photo = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
        state.description = action.payload
    },
    setUserId(state, action: PayloadAction<number>) {
        state.id = action.payload
    },
    setUserCluster(state, action: PayloadAction<number>) {
        state.cluster = action.payload
    },
  },
})

export const { setName, setaddress, setPhone, setEmail, setBirth, setCpf, setPhoto, setDescription, setUserCluster, setUserId } = UserInfoSlice.actions
export default UserInfoSlice.reducer
