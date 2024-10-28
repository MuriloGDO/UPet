import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { registerOptionsStyle } from './styles/registerOptions';
import {  Image, Text, TouchableOpacity, View } from 'react-native';
import { sharedStyles } from './styles/sharedStyle';

export default function () {
  const router = useRouter();

  const handleInstituicao = () => {
    router.push('/registerInstitute'); 
  };

  const handleUser = () => {
    router.push('/registerUser'); 
  };

  const handleLogin = () => {
    router.push('/'); 
  };

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={registerOptionsStyle.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Image style={registerOptionsStyle.logoStyle} source={require('../assets/logo.png')} />  
      <View style={sharedStyles.textContainer}>
        <Text style={[sharedStyles.uPetText, { fontFamily: 'Lobster_400Regular' }]}>
          U-Pet
        </Text>
        <Text style={[sharedStyles.descriptionText, { fontFamily: 'Roboto_400Regular' }]}>
          União Perfeita para Você e Seu Novo Melhor Amigo
        </Text>
      </View>
      <Text style={{marginTop:20, color:'white', fontSize:20}}>Você deseja se cadastrar como?</Text> 
      <TouchableOpacity onPress={handleInstituicao}
       style={[sharedStyles.buttonStyle, {marginTop:100}, sharedStyles.blue, registerOptionsStyle.buttonsSize]}>
        <Text style={{color:'white'}}>Instituição</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUser}
       style={[sharedStyles.buttonStyle,{marginTop:0}, sharedStyles.blue, registerOptionsStyle.buttonsSize]}>
        <Text style={{color:'white'}}>Adotante</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}
       style={[sharedStyles.buttonStyle, sharedStyles.red]}>
        <Text style={{color:'white'}}>Voltar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}


