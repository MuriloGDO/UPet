import React, { useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { registerStyles } from './styles/register';
import { RegisterUserInput1, RegisterUserInput2 } from '../components/registerUserInputs/registerUserInputs';
import { useRouter } from 'expo-router';
import { sharedStyles } from './styles/sharedStyle';
import { systemApiService } from '../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


export default function App() {
  const[step, setStep] = useState<number>(1)

  const router = useRouter();

  const name = useSelector((state: RootState) => state.registerUser.name)
  const email = useSelector((state: RootState) => state.registerUser.email)
  const phone = useSelector((state: RootState) => state.registerUser.phone)
  const birth = useSelector((state: RootState) => state.registerUser.birth)
  const address = useSelector((state: RootState) => state.registerUser.address)
  const cpf = useSelector((state: RootState) => state.registerUser.cpf)
  const description = useSelector((state: RootState) => state.registerUser.description)
  const password = useSelector((state: RootState) => state.registerUser.password)
  const photo = useSelector((state: RootState) => state.registerUser.photo)

  const handleBack = () => {
    router.push('/options'); 
  };

  const handleRegisterUser = async () =>{
    await systemApiService.registerUser(name, phone, email, birth, address, cpf, photo, description, password).then(()=>router.push('/'))
  }

  return (
    <LinearGradient
      colors={['#02778E', '#90F9F3']}
      style={sharedStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >

      
      <View style={sharedStyles.textContainer}>
        {step == 1 ?
          <>
          <Image style={registerStyles.logoStyle} source={require('../assets/logo.png')} />
          <RegisterUserInput1/>
          </>
          :
          <RegisterUserInput2/>
        }
        
      </View>
      <View style={registerStyles.buttonsContainer}>
          {step == 1 ? 
          <>
            <TouchableOpacity onPress={()=>handleBack()} style={[sharedStyles.buttonStyle, sharedStyles.red, registerStyles.buttonsMargin]}>
            <Text style={{color:'white'}}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setStep(2)} style={[sharedStyles.buttonStyle, sharedStyles.blue, registerStyles.buttonsMargin]}>
            <Text style={{color:'white'}}>Próximo</Text>
            </TouchableOpacity>
          </>
          :
          <>
            <TouchableOpacity onPress={()=>setStep(1)} style={[sharedStyles.buttonStyle, sharedStyles.red, registerStyles.buttonsMargin]}>
            <Text style={{color:'white'}}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegisterUser} style={[sharedStyles.buttonStyle, sharedStyles.blue, registerStyles.buttonsMargin]}>
              <Text style={{color:'white'}}>Cadastrar</Text>
            </TouchableOpacity>
          </>
         }
      </View>
    </LinearGradient>
  );
}


