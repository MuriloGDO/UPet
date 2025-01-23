import React, { useEffect } from 'react';
import { Text, View, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { institutionStyles } from './styles/institution';
import { InstitutionPetCard } from '../components/institutionPetCard';
import { Footer } from '../components/footer';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const name = useSelector((state: RootState) => state.institutionInfo.name);
  const userType = useSelector((state: RootState) => state.institutionInfo.user_type);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userType !== 'institution') {
      router.replace('/');
      Alert.alert("Você não tem acesso à área de instituição.");
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

        <ScrollView style={styles.scrollContainer}>
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
          <InstitutionPetCard />
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
