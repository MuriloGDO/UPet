import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../redux/store';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { sharedStyles } from './styles/sharedStyle';
import { systemApiService } from '../api/api';
import { registerStyles } from './styles/register';
import { RegisterPetInput } from '../components/registerPetInputs/registerPetinputs';
import { setLoading } from '../redux/slices/uiSlice';
import { useDispatch } from 'react-redux';

export default function DescriptionScreen() {
  const router = useRouter();

  const name = useSelector((state: RootState) => state.registerPet.name);
  const description = useSelector((state: RootState) => state.registerPet.description);
  const species = useSelector((state: RootState) => state.registerPet.species);
  const date_of_birth = useSelector((state: RootState) => state.registerPet.date_of_birth);
  const photo = useSelector((state: RootState) => state.registerPet.photo);

  const dispatch = useDispatch()

  const handleBack = () => {
    router.push('/options'); 
  };

  const handleRegisterPet = async () => {
    dispatch(setLoading(true))
    await systemApiService
      .registerPet(name, description, species, date_of_birth, photo)
      .then(() => router.push('/'));
    dispatch(setLoading(false))
    
  };

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={sharedStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={sharedStyles.textContainer}>
      <RegisterPetInput />
      </View>

      <View style={registerStyles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleBack}
          style={[sharedStyles.buttonStyle, sharedStyles.red, registerStyles.buttonsMargin]}
        >
          <Text style={{ color: 'white' }}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRegisterPet}
          style={[sharedStyles.buttonStyle, sharedStyles.blue, registerStyles.buttonsMargin]}
        >
          <Text style={{ color: 'white' }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
