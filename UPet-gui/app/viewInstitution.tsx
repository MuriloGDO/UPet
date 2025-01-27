import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeInstitutionsStyle } from './styles/viewInstitution';
import { Footer } from '../components/footer';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function InstitutionProfile() {
  const router = useRouter();
  const { id, name, telephone, email, address } = useLocalSearchParams();

  const [petCounter, setPetCounter] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar a quantidade de pets
  const fetchPetCount = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/institution_count_pets/', {
        id: id,
      });
      setPetCounter(response.data.pet_counter);
    } catch (err) {
      setError('Erro ao carregar a quantidade de pets.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchPetCount();
    }
  }, [id]);

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
            <Text style={homeInstitutionsStyle.text}>...</Text>
          </>
        )}
      </ScrollView>

      <Footer />
    </View>
  );
}
