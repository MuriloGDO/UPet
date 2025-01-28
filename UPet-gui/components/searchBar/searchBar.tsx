import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

import { useRouter } from "expo-router"; // ou next/router para Next.js
import { systemApiService } from "../../api/api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/uiSlice";

interface Institution {
  id: number;
  name: string;
  cnpj: string;
  telephone: string;
  email: string;
  address: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Texto de busca
  const [results, setResults] = useState<Institution[]>([]); // Armazena os resultados
  const router = useRouter();
  const dispatch = useDispatch()

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;

    try {
      dispatch(setLoading(true))
      const data = await systemApiService.searchInstitutions(searchTerm);
      setResults(data);
      dispatch(setLoading(false))
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      dispatch(setLoading(false))
    }
  };

  const handleInstitutionClick = (institution: Institution) => {
    router.push({
      pathname: "/viewInstitution",
      params: {
        id: institution.id,
        name: institution.name,
        telephone: institution.telephone,
        email: institution.email,
        address: institution.address,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Digite o nome da instituição..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
          <Text>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza os resultados */}
      {results.length > 0 && (
        <View style={styles.cardsContainer}>
          {results.map((institution) => (
            <TouchableOpacity
              key={institution.id}
              style={styles.card}
              onPress={() => handleInstitutionClick(institution)}
            >
              <Text style={styles.cardDetail}>{institution.name}</Text>
              <Text style={styles.cardDetail}>CNPJ: {institution.cnpj}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 600,
    marginHorizontal: "auto",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
    width: "100%",
    maxWidth: 600,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#fff",
    transform: [{ scale: 1 }],
  },
  cardDetail: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },
});

export default SearchBar;
