import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { registerStyles } from '../src/styles/register';
import { RegisterUserInput } from '../src/components/registerUserInputs/registerUserInputs';
import { Link, useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null; 
  } else {
    SplashScreen.hideAsync(); 
  }

  const router = useRouter();

  const handlePress = () => {
    router.push('/'); // Replace with your screen path
  };

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={registerStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >

      <Image style={registerStyles.logoStyle} source={require('../assets/logo.png')} />
      <View style={registerStyles.textContainer}>
        <RegisterUserInput/>
      </View>
      <View style={registerStyles.buttonsContainer}>
          <TouchableOpacity onPress={()=>handlePress()} style={[registerStyles.buttonStyle, registerStyles.red]}>
            <Text style={{color:'white'}}>Voltar</Text>
          </TouchableOpacity>
        <TouchableOpacity style={[registerStyles.buttonStyle, registerStyles.blue]}><Text style={{color:'white'}}>Cadastrar</Text></TouchableOpacity>
      </View>
      <Text>É uma conta instituição?<Link style={{color:'blue'}} href={'/register'}> Cadastre aqui</Link></Text>
    </LinearGradient>
  );
}


