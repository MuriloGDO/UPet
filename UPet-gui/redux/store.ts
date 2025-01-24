import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from  './slices/registerUserSlice'
import registerInstituteSlice from './slices/registerInstituteSlice'
import userInfoSlice from './slices/userInfoSlice'
import InstitutionInfoSlice from './slices/institutionInfoSlice'
import registerPetSlice from './slices/registerPetSlice'
import userEditSlice from './slices/editUserSlice'
import UiSlice from './slices/uiSlice'
import PetsSlice from './slices/petsResponseSlice'

export const store = configureStore({
    reducer: {
        registerUser: registerUserSlice,
        registerInstitute: registerInstituteSlice,
        userInfo: userInfoSlice,
        institutionInfo: InstitutionInfoSlice,
        registerPet: registerPetSlice,
        userEdit: userEditSlice,
        UiSlice: UiSlice,
        petsSlice: PetsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
