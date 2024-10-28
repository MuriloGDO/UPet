import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from  './slices/registerUserSlice'
import registerInstituteSlice from './slices/registerInstituteSlice'

export const store = configureStore({
    reducer: {
        registerUser: registerUserSlice,
        registerInstitute: registerInstituteSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
