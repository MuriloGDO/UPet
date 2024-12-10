import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiSlice {
  loading: boolean 
}

const initialState: UiSlice = {
    loading: false
}

const UiSlice = createSlice({
  name: 'UiSlice',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = UiSlice.actions
export default UiSlice.reducer
