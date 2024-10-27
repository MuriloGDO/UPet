import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { registerStyles } from '../src/styles/register';

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

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={registerStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    > 
      
      <Image style={registerStyles.logoStyle} source={require('../assets/logo.png')} />
      <View style={registerStyles.textContainer}>
        <Text style={[registerStyles.uPetText, { fontFamily: 'Lobster_400Regular' }]}>
          U-Pet
        </Text>
      </View>
    </LinearGradient>
  );
}


