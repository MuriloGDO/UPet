import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeInstitutionsStyle } from './styles/viewInstitution';
import { Footer } from '../components/footer';
import { useSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function InstitutionProfile() {
  // const { institutionId } = useSearchParams();
  const router = useRouter();

  const institutionId = 1

  const [institutionData, setInstitutionData] = useState({
    name: '',
    address: '',
    telephone: '',
    email: '',
  });
  const [petCounter, setPetCounter] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // // Função para buscar informações da instituição
  // const fetchInstitutionDetails = async () => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/institution_information/', {
  //       id: institutionId,
  //     });
  //     setInstitutionData(response.data);
  //   } catch (err) {
  //     setError('Erro ao carregar os dados da instituição.');
  //   }
  // };

  // Função para buscar a quantidade de pets
  const fetchPetCount = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/institution_count_pets/', {
        id: institutionId,
      });
      setPetCounter(response.data.pet_counter);
    } catch (err) {
      setError('Erro ao carregar a quantidade de pets.');
    }
  };

  useEffect(() => {
    if (institutionId) {
      // fetchInstitutionDetails();
      fetchPetCount();
    }
  }, [institutionId]);

  const handleBack = () => {
    router.push('/home');
  };

  return (
    <View style={homeInstitutionsStyle.container}>
      <View style={homeInstitutionsStyle.headerArrow}>
        <Icon name="arrow-back" size={24} onPress={handleBack} />
      </View>
      <View style={homeInstitutionsStyle.header}>
        <Text style={homeInstitutionsStyle.headerText}>{institutionData.name}</Text>
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
            <Text style={homeInstitutionsStyle.text}>Email: {institutionData.email}</Text>
            <Text style={homeInstitutionsStyle.text}>Telefone: {institutionData.telephone}</Text>
            <Text style={homeInstitutionsStyle.text}>Endereço: {institutionData.address}</Text>

            {/* Pets da Instituição */}
            <Text style={homeInstitutionsStyle.sectionTitle}>Pets da {institutionData.name}:</Text>
            <Text style={homeInstitutionsStyle.text}>...</Text>
          </>
        )}
      </ScrollView>

      <Footer />
    </View>
  );
}
