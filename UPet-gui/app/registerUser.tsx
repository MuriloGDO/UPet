import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { registerStyles } from './styles/register';
import { RegisterUserInput } from '../components/registerUserInputs/registerUserInputs';
import { useRouter } from 'expo-router';
import { sharedStyles } from './styles/sharedStyle';


export default function App() {

  const router = useRouter();

  const handleBack = () => {
    router.push('/options'); // Replace with your screen path
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
        <RegisterUserInput/>
      </View>
      <View style={registerStyles.buttonsContainer}>
          <TouchableOpacity onPress={()=>handleBack()} style={[sharedStyles.buttonStyle, sharedStyles.red, registerStyles.buttonsMargin]}>
            <Text style={{color:'white'}}>Voltar</Text>
          </TouchableOpacity>
        <TouchableOpacity style={[sharedStyles.buttonStyle, sharedStyles.blue, registerStyles.buttonsMargin]}>
          <Text style={{color:'white'}}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}


