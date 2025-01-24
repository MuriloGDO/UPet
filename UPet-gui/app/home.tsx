import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { homeStyles } from './styles/home';
import { PetSlider } from '../components/petSlider';
import { Footer } from '../components/footer';
import { useRouter } from 'expo-router';
import { systemApiService } from '../api/api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/uiSlice';
import { MatchingPet } from './utils/petsResponseInterface';
import SearchBar from '../components/searchBar/searchBar';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const name = useSelector((state: RootState) => state.userInfo.name)
  const photo = useSelector((state: RootState) => state.userInfo.photo)
  const userType = useSelector((state: RootState) => state.userInfo.user_type)
  const user_id = useSelector((state: RootState) => state.userInfo.id)
  const petsResponse = useSelector((state: RootState) => state.petsSlice.pets)
  

  const router = useRouter()

  const dispatch = useDispatch()

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

  const getPetMatches = async () =>{
    dispatch(setLoading(true))
    const response =  await systemApiService.getMatchingPets(user_id)
    dispatch(setPetsResponse(response.matching_pets))
    dispatch(setLoading(false))
  }

  const handleSearch = (term: string) => {
    console.log("Termo pesquisado:", term);
  };

  useEffect(() => {
    if (userType !== 'user') {
      router.replace('/');
      Alert.alert("Voce nao tem acesso a área de usuários.")
    }
    else{
      getPetMatches()
    }
  }, [userType, router]);

  if(userType !== 'user'){
    return (
      <View>
        <Text>Redirecionando...</Text>
      </View>
    )
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
                <SearchBar onSearch={handleSearch} placeholder="Procure pelas instituições" />
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
        <PetSlider pets={petsResponse}></PetSlider>
        
    </View>
    <Footer></Footer>
    </>
  );
}