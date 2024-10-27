import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { loginStyles } from '../styles/login';

SplashScreen.preventAutoHideAsync(); // Para manter a tela de splash até as fontes carregarem

export default function App() {
  const [text, setText] = useState('');

  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null; 
  } else {
    SplashScreen.hideAsync(); 
  }

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={loginStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Image style={loginStyles.logoStyle} source={require('../../assets/logo.png')} />
      <View style={loginStyles.textContainer}>
        <Text style={[loginStyles.uPetText, { fontFamily: 'Lobster_400Regular' }]}>
          U-Pet
        </Text>
        <Text style={[loginStyles.descriptionText, { fontFamily: 'Roboto_400Regular' }]}>
          União Perfeita para Você e Seu Novo Melhor Amigo
        </Text>
      </View>
      <TextInput
        style={loginStyles.input}
        placeholder="Digite aqui seu email"
        value={text}
        onChangeText={setText}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Digite aqui sua senha"
        value={text}
        onChangeText={setText}
        secureTextEntry={true}  // para esconder a senha
      />
      <TouchableOpacity style={loginStyles.buttonStyle}><Text style={{color:'white'}}>Login</Text></TouchableOpacity>
      <Text>Ainda nao possui uma conta?<Text style={{color:'blue'}} onPress={()=>console.log("oi")}> Cadastre-se</Text></Text>
      <StatusBar style="auto" />

    </LinearGradient>
  );
}


