import React from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { homeInstitutionsStyle } from "./styles/viewInstitution";
import { Footer } from "../components/footer";
import { useRouter, useLocalSearchParams } from "expo-router"; // Importação necessária

export default function App() {
  const router = useRouter();
  const { id, name, cnpj, telephone, email, address } = useLocalSearchParams(); // Captura os query params

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <View style={homeInstitutionsStyle.container}>
      {/* Header */}
      <View style={homeInstitutionsStyle.headerArrow}>
        <Icon name="arrow-back" size={24} onPress={() => {handleBack()}} />
      </View>
      <View style={homeInstitutionsStyle.header}>
        <Text style={homeInstitutionsStyle.headerText}>{name}</Text>
      </View>

      <ScrollView style={homeInstitutionsStyle.content}>
        {/* Avaliação */}
        {/* <Text style={homeInstitutionsStyle.sectionTitle}>Avaliação:</Text>
        <View style={homeInstitutionsStyle.header}>
          <Icon name="star" size={24} color="#FFD700" />
          <Text style={homeInstitutionsStyle.ratingText}>8,5</Text>
        </View> */}

        {/* Quantidade de pets */}
        <Text style={homeInstitutionsStyle.sectionTitle}>Quantidade de pets para adoção:</Text>
        <Text style={homeInstitutionsStyle.text}>13</Text>

        {/* Contato */}
        <Text style={homeInstitutionsStyle.sectionTitle}>Contato:</Text>
        <Text style={homeInstitutionsStyle.text}>Email: {email}</Text>
        <Text style={homeInstitutionsStyle.text}>Telefone: {telephone}</Text>
        <Text style={homeInstitutionsStyle.text}>Endereço: {address}</Text>

        {/* Descrição */}
        <Text style={homeInstitutionsStyle.sectionTitle}>Descrição:</Text>
        <Text style={homeInstitutionsStyle.text}>
        </Text>
      </ScrollView>

      <Footer></Footer>
    </View>
  );
}
