import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from  './slices/registerUserSlice'
import registerInstituteSlice from './slices/registerInstituteSlice'
import userInfoSlice from './slices/userInfoSlice'
import registerPetSlice from './slices/registerPetSlice'
import userEditSlice from './slices/editUserSlice'
import UiSlice from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        registerUser: registerUserSlice,
        registerInstitute: registerInstituteSlice,
        userInfo: userInfoSlice,
        registerPet: registerPetSlice,
        userEdit: userEditSlice,
        UiSlice: UiSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
