import React from 'react';
import { Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { registerStyles } from './styles/register';
import { RegisterInstituteInput } from '../components/registerInstituteInputs/registerInstituteInputs';
import { Link, useRouter } from 'expo-router';
import { sharedStyles } from './styles/sharedStyle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setLoading } from '../redux/slices/uiSlice';
import { systemApiService } from '../api/api';

export default function App() {
  const router = useRouter();
  
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.registerInstitute.name)
  const email = useSelector((state: RootState) => state.registerInstitute.email)
  const phone = useSelector((state: RootState) => state.registerInstitute.phone)
  const address = useSelector((state: RootState) => state.registerInstitute.address)
  const cnpj = useSelector((state: RootState) => state.registerInstitute.cnpj)
  const password = useSelector((state: RootState) => state.registerInstitute.password)

  const handleBack = () => {
    router.push('/options');
  };

  const handleRegisterInstitution = async () => {
    dispatch(setLoading(true));
    try {
      const response = await systemApiService.registerInstitute(
        name,
        email,
        phone,
        address,
        cnpj,
        password
      );

      const institutionId = response.id;
      router.push({
        pathname: '/registerPet',
        params: { institutionId },
      });
    } catch (error: any) {
      Alert.alert(error.response?.data?.error || 'Erro ao cadastrar a instituição.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={sharedStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >

      <Image style={registerStyles.logoStyle} source={require('../assets/logo.png')} />
      <View style={sharedStyles.textContainer}>
        <RegisterInstituteInput/>
      </View>
      <View style={registerStyles.buttonsContainer}>
          <TouchableOpacity onPress={()=>handleBack()} style={[sharedStyles.buttonStyle, sharedStyles.red, registerStyles.buttonsMargin]}>
            <Text style={{color:'white'}}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterInstitution} style={[sharedStyles.buttonStyle, sharedStyles.blue, registerStyles.buttonsMargin]}>
          <Text style={{ color: 'white' }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
