import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';

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
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Image style={styles.logoStyle} source={require('../assets/logo.png')} />
      <View style={styles.textContainer}>
        <Text style={[styles.uPetText, { fontFamily: 'Lobster_400Regular' }]}>
          U-Pet
        </Text>
        <Text style={[styles.descriptionText, { fontFamily: 'Roboto_400Regular' }]}>
          União Perfeita para Você e Seu Novo Melhor Amigo
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui seu email"
        value={text}
        onChangeText={setText}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite aqui sua senha"
        value={text}
        onChangeText={setText}
        secureTextEntry={true}  // para esconder a senha
      />
      <TouchableOpacity style={styles.buttonStyle}><Text style={{color:'white'}}>Login</Text></TouchableOpacity>
      <Text>Ainda nao possui uma conta?<Text style={{color:'blue'}} onPress={()=>console.log("oi")}> Cadastre-se</Text></Text>
      <StatusBar style="auto" />

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius:30,
    marginTop:30,
    marginBottom:30,
    height:30,
    width:90,
    backgroundColor:'#02778E',
    color:'white',
    justifyContent:'center',
    alignItems:'center',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Sombra para Android
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  logoStyle: {
    marginTop: 110,
  },
  uPetText: {
    fontSize: 42,
    color: 'white',
  },
  descriptionText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 0.7,
    marginTop: 16,
    borderRadius: 50,
    textAlign: 'center',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Sombra para Android
    elevation: 5,
  },
});
