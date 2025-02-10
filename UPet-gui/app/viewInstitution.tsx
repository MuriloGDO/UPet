import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeInstitutionsStyle } from './styles/viewInstitution';
import { Footer } from '../components/footer';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { systemApiService } from "../api/api";
import { PetSlider } from '../components/petSlider';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function InstitutionProfile() {
  const router = useRouter();
  const { id, name, telephone, email, address, petsData } = useLocalSearchParams();

  const petsResponse = useSelector((state: RootState) => state.petsSlice.petsByInstitution)


  const [petCounter, setPetCounter] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const institutionId = Array.isArray(id) ? id[0] : id;

  // Função para buscar a quantidade de pets
  const PetCount = async () => {
    try {
      const data = await systemApiService.fetchPetCount(institutionId);
      setPetCounter(data.pet_counter);
    } catch (err) {
      setError('Erro ao carregar a quantidade de pets.');
    }
  };

  useEffect(() => {
    if (institutionId) {
      PetCount();
    }
  }, [institutionId]);

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <View style={homeInstitutionsStyle.container}>
      <View style={homeInstitutionsStyle.headerArrow}>
        <Icon name="arrow-back" size={24} onPress={handleBack} />
      </View>
      <View style={homeInstitutionsStyle.header}>
        <Text style={homeInstitutionsStyle.headerText}>{name}</Text>
      </View>

      <ScrollView style={homeInstitutionsStyle.content}>
        {error ? (
          <Text style={homeInstitutionsStyle.text}>{error}</Text>
        ) : (
          <>
            {/* Quantidade de pets */}
            <Text style={homeInstitutionsStyle.sectionTitle}>Quantidade de pets para adoção:</Text>
            <Text style={homeInstitutionsStyle.text}>{petCounter}</Text>

            {/* Contato */}
            <Text style={homeInstitutionsStyle.sectionTitle}>Contato:</Text>
            <Text style={homeInstitutionsStyle.text}>Email: {email}</Text>
            <Text style={homeInstitutionsStyle.text}>Telefone: {telephone}</Text>
            <Text style={homeInstitutionsStyle.text}>Endereço: {address}</Text>

            {/* Pets da Instituição */}
            <Text style={homeInstitutionsStyle.sectionTitle}>Pets da {name}:</Text>
            <PetSlider pets={petsResponse} marginBottom={70}></PetSlider>
          </>
        )}
      </ScrollView>
      
      <Footer />
    </View>
  );
}
