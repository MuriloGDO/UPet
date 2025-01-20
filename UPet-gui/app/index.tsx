import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { loginStyles } from './styles/login';
import { Link, useRouter } from 'expo-router';
import { sharedStyles } from './styles/sharedStyle';
import { systemApiService } from '../api/api';
import { useDispatch } from 'react-redux';
import { setBirth, setCpf, setaddress, setDescription, 
      setEmail, setName, setPhone, setPhoto, setUserCluster, setUserId, 
      setUserType} from '../redux/slices/userInfoSlice';
import { setInstAddress, setInstCnpj, setInstEmail, setInstId, setInstName, setInstPhone, setInstType } from '../redux/slices/institutionInfoSlice';
import { setLoading } from '../redux/slices/uiSlice';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const dispatch = useDispatch()

  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null; 
  } else {
    SplashScreen.hideAsync(); 
  }

  const handleLogin = async () =>{
    dispatch(setLoading(true))
    const response = await systemApiService.login(email, password)
    if (response.institution) {
      const {
        data: {
          adress, cnpj, email, id, name,
          telephone
        }
      } = response;
      dispatch(setInstAddress(adress))
      dispatch(setInstCnpj(cnpj))
      dispatch(setInstEmail(email))
      dispatch(setInstId(id))
      dispatch(setInstName(name))
      dispatch(setInstPhone(telephone))
      dispatch(setInstType('institution'))
      router.push('/institutionPage')
    } else {
      const {
        data: {
          name, date_of_birth, cpf, address, description,
          email, telephone, photo, cluster, id
        }
      } = response;
    
      dispatch(setName(name));
      dispatch(setBirth(date_of_birth));
      dispatch(setCpf(cpf));
      dispatch(setaddress(address));
      dispatch(setDescription(description));
      dispatch(setEmail(email));
      dispatch(setPhone(telephone));
      dispatch(setPhoto(photo));
      dispatch(setUserCluster(cluster));
      dispatch(setUserId(id));
      dispatch(setUserType('user'));
      router.push('/home')
    }
    dispatch(setLoading(false))
  }

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={sharedStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Image style={loginStyles.logoStyle} source={require('../assets/logo.png')} />
      <View style={sharedStyles.textContainer}>
        <Text style={[sharedStyles.uPetText, { fontFamily: 'Lobster_400Regular' }]}>
          U-Pet
        </Text>
        <Text style={[sharedStyles.descriptionText, { fontFamily: 'Roboto_400Regular' }]}>
          União Perfeita para Você e Seu Novo Melhor Amigo
        </Text>
      </View>
      <TextInput
        style={sharedStyles.input}
        placeholder="Digite aqui seu email"
        value={email}
        onChangeText={setMail}
      />
      <TextInput
        style={sharedStyles.input}
        placeholder="Digite aqui sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}  
      />
      <TouchableOpacity onPress={handleLogin} style={sharedStyles.buttonStyle}><Text style={{color:'white'}}>Login</Text></TouchableOpacity>
      <Text>Ainda nao possui uma conta?<Link style={{color:'blue'}} href={'/options'}> Cadastre-se</Link></Text>
      <StatusBar style="auto" />

    </LinearGradient>
  );
}


