import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { homeStyles } from './styles/home';
import { PetSlider } from '../components/petSlider';
import { Footer } from '../components/footer';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const name = useSelector((state: RootState) => state.userInfo.name)
  const photo = useSelector((state: RootState) => state.userInfo.photo)

  const selectedButton = ['gray', 'white']
  const notSelectedButton = ['white', 'black']

  const [buttonMaisCombinam, setButtonMaisCombinam] = useState<string[]>(selectedButton)
  const [buttonMaisProximos, setButtonMaisProximos] = useState<string[]>(notSelectedButton)

  const handleMaisCombinam = () =>{
    setButtonMaisCombinam(selectedButton)
    setButtonMaisProximos(notSelectedButton)
  }

  const handleMaisProximos= () =>{
    setButtonMaisCombinam(notSelectedButton)
    setButtonMaisProximos(selectedButton)
  }

  return (
    <>
    <View style={{marginTop:80}}>
        <View style={{display:'flex', flexDirection:'row' ,alignContent:'center' , marginBottom:30, justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
            <View style={{display:'flex', flexDirection:'column'}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={{fontSize:30, maxWidth:250}}>Olá, {name ? name : "Usuário"}</Text>
                  <Image style={{width:30, height:30, marginLeft:9}} source={require('../assets/patas.png')} />
                </View>
                <Text style={{fontSize:20, fontWeight:300}}>Encontre o seu parceiro</Text>
            </View>
            <Image style={{width:50, height:50, borderWidth: 1, borderColor: 'black', borderRadius:100}} source={photo ? { uri: `data:image/jpeg;base64,${photo}` } : require('../assets/user_not_found.jpeg')} />
        </View>
        <View style={{alignContent:'center' , marginBottom:30, justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
          <Text style={{fontSize:19}}>Perfeitos para voce:</Text>
          <View style={{display:'flex', flexDirection:'row', marginTop:20}}>
            <TouchableOpacity onPress={() => handleMaisCombinam()} style={[homeStyles.SelectButtonStyles, {backgroundColor:buttonMaisCombinam[0]}]}><Text style={{color:buttonMaisCombinam[1]}}>Mais combinam</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleMaisProximos()} style={[homeStyles.SelectButtonStyles, {backgroundColor:buttonMaisProximos[0]}]}><Text style={{color:buttonMaisProximos[1]}}>Mais próximos</Text></TouchableOpacity>
          </View>
        </View>
        <PetSlider></PetSlider>
        
    </View>
    <Footer></Footer>
    </>
  );
}