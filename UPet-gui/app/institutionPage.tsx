import React, { useEffect, useState } from 'react';
import { Text, View, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { institutionStyles } from './styles/institution';
import { InstitutionPetCard } from '../components/institutionPetCard';
import { Footer } from '../components/footer';
import { systemApiService } from '../api/api';
import { MatchingPet } from './utils/ResponsesInterface';
import { setLoading } from '../redux/slices/uiSlice';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [pets, setPets] = useState<MatchingPet[]>([])
  const id = useSelector((state: RootState) => state.institutionInfo.id);
  const userType = useSelector((state: RootState) => state.institutionInfo.user_type);

  const router = useRouter();
  const dispatch = useDispatch();

  const getPets = async ()=>{
    dispatch(setLoading(true))
    const response = await systemApiService.listPetByInstitution(id)
    setPets(response)
    dispatch(setLoading(false))
  }

  useEffect(() => {
    if (userType !== 'institution') {
      router.replace('/');
      Alert.alert("Você não tem acesso à área de instituição.");
    }
    else{
      getPets()
    }
  }, [userType, router]);

  if (userType !== 'institution') {
    return (
      <View>
        <Text>Redirecionando...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ marginTop: 80 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 30, maxWidth: 250 }}>Olá, Instituição</Text>
          <TouchableOpacity onPress={()=>{router.push('registerPet')}} style={[{ alignSelf: 'center' }, institutionStyles.SelectButtonStyles]}>
            <Text style={{ color: 'black' }}>Adicionar pet</Text>
          </TouchableOpacity>
        </View>

        <View style={institutionStyles.hr} />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333',}}>Pets para adoção</Text>
        <ScrollView style={styles.scrollContainer}>
        {pets ?.filter((pet) => pet.status == "Available") // Filtra apenas os adotados
                .map((pet) => (
                  <InstitutionPetCard
                    key={pet.id}
                    name={pet.name}
                    image={pet.photos[0] ? pet.photos[0].photo : undefined}
                    adotado={false} 
                    />
                ))}
        </ScrollView>

        <View style={{height: 1, // Altura da linha
                      backgroundColor: '#ccc', // Cor do separador (cinza claro)
                      marginVertical: 10, // Espaçamento acima e abaixo da linha
                      width: '100%', // Largura total da tela}} /> {/* Separador */}
                    }}/>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333',}}>Pets já adotados</Text>
        <ScrollView style={styles.scrollContainer}>
          {pets ?.filter((pet) => pet.status !== "Available") // Filtra apenas os adotados
                .map((pet) => (
                  <InstitutionPetCard
                    key={pet.id}
                    name={pet.name}
                    image={pet.photos[0] ? pet.photos[0].photo : undefined}
                    adotado={true} // Sempre true porque já filtramos os adotados
                    />
                ))}
          </ScrollView>

      </View>
      <Footer></Footer>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    maxHeight: 700,
    marginHorizontal: 10, 
  },
});

