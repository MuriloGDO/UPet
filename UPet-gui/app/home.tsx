import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PetSlider } from '../components/petSlider';
import { Footer } from '../components/footer';
import { useRouter } from 'expo-router';
import { systemApiService } from '../api/api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/uiSlice';
import SearchBar from '../components/searchBar/searchBar';
import { setPetsResponse } from '../redux/slices/petsResponseSlice';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const name = useSelector((state: RootState) => state.userInfo.name)
  const photo = useSelector((state: RootState) => state.userInfo.photo)
  const userType = useSelector((state: RootState) => state.userInfo.user_type)
  const user_id = useSelector((state: RootState) => state.userInfo.id)
  const petsResponse = useSelector((state: RootState) => state.petsSlice.pets)

  const router = useRouter()
  const dispatch = useDispatch()

  const [selectedValue, setSelectedValue] = useState("-");
  const [filteredPets, setFilteredPets] = useState(petsResponse); // Estado para pets filtrados
  const [isPickerVisible, setIsPickerVisible] = useState(false);  // Estado para controlar a visibilidade do Picker

  const getPetMatches = async () =>{
    dispatch(setLoading(true))
    const response =  await systemApiService.getMatchingPets(user_id)
    dispatch(setPetsResponse(response.matching_pets.filter(pet => pet.status === "Available")));
    dispatch(setLoading(false))
  }

  useEffect(() => {
    if (userType !== 'user') {
      router.replace('/');
      Alert.alert("Você não tem acesso a área de usuários.")
    }
    else if(petsResponse.length === 0){
      getPetMatches()
    }
  }, []);

  useEffect(() => {
    setFilteredPets(petsResponse); // Atualiza o estado de pets filtrados sempre que petsResponse mudar
  }, [petsResponse]);

  const handleFilterChange = (address: string) => {
    setSelectedValue(address);
    if(address != "-"){
      setFilteredPets(petsResponse.filter(pet => pet.institution?.address === address));
    }
  };

  const clearFilter = () => {
    setSelectedValue("1");
    setFilteredPets(petsResponse); // Restaura os pets ao estado original
  };

  // Filtra os endereços para garantir que não haja repetidos
  const uniqueAddresses = Array.from(new Set(petsResponse
    .map((pet) => pet.institution?.address)
    .filter((address) => address !== undefined)
  ));

  if(userType !== 'user'){
    return (
      <View>
        <Text>Redirecionando...</Text>
      </View>
    )
  }

  return (
    <>
    <View style={{marginTop:80, marginBottom:100}}>
        <View style={{display:'flex', flexDirection:'row' ,alignContent:'center' , marginBottom:30, justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
            <View style={{display:'flex', flexDirection:'column'}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={{fontSize:30, maxWidth:250}}>Olá, {name ? name : "Usuário"}</Text>
                  <Image style={{width:30, height:30, marginLeft:9}} source={require('../assets/patas.png')} />
                </View>
                <Text style={{fontSize:20, fontWeight:300}}>Encontre o seu parceiro</Text>
                <SearchBar />
            </View>
            <TouchableOpacity onPress={()=> router.push('/userProfile')}>
            <Image style={{width:50, height:50, borderWidth: 1, borderColor: 'black', borderRadius:100}} source={photo ? { uri: `data:image/jpeg;base64,${photo}` } : require('../assets/user_not_found.jpeg')} />
            </TouchableOpacity>
        </View>
        <View style={{alignContent:'center' , marginBottom:30, justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
          <Text style={{fontSize:19}}>Perfeitos para você:</Text>
          
          <TouchableOpacity onPress={() => setIsPickerVisible(!isPickerVisible)}>
            <Text style={{fontSize: 18, color: 'blue'}}>Filtrar por localizaçao</Text>
          </TouchableOpacity>
          {isPickerVisible && (
            <View style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: 10}}>
              <Picker  
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleFilterChange(itemValue)} 
                style={{width: '100%', height: 150 }}>
                  <Picker.Item 
                    value={"-"} 
                    label={"-"} 
                  />
                {uniqueAddresses.map((address, index) => (
                  <Picker.Item 
                    key={index}
                    value={address} 
                    label={address} 
                  />
                ))}
              </Picker>
              <TouchableOpacity onPress={clearFilter} style={{marginTop: 10, padding: 5, backgroundColor: 'gray', borderRadius: 5}}>
                <Text style={{color: 'white', fontSize: 14}}>Limpar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <PetSlider pets={filteredPets}></PetSlider>
    </View>
    <Footer></Footer>
    </>
  );
}
