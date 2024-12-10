import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from  './slices/registerUserSlice'
import registerInstituteSlice from './slices/registerInstituteSlice'
import userInfoSlice from './slices/userInfoSlice'
import registerPetSlice from './slices/registerPetSlice'
import userEditSlice from './slices/editUserSlice'

export const store = configureStore({
    reducer: {
        registerUser: registerUserSlice,
        registerInstitute: registerInstituteSlice,
        userInfo: userInfoSlice,
        registerPet: registerPetSlice,
        userEdit: userEditSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
