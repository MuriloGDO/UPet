import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { router } from "expo-router"; // Ou use "next/router" para Next.js
import { systemApiService } from '../../api/api';

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

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    try {
      // Chama o método da API para buscar instituições
      const data = await systemApiService.searchInstitutions(searchTerm);
      setResults(data); // Atualiza os resultados
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
    }
  };

  const handleInstitutionClick = (institution: Institution) => {
    router.push({
      pathname: "/viewInstitution",
      params: {
        id: institution.id,
        name: institution.name,
        cnpj: institution.cnpj,
        telephone: institution.telephone,
        email: institution.email,
        address: institution.address,
      },
    });
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome da instituição..."
          style={styles.input}
        />
        <button type="submit" style={styles.iconButton}>
          <FaSearch size={16} />
        </button>
      </form>

      {/* Renderiza os resultados */}
      {results.length > 0 && (
        <ul style={styles.results}>
          {results.map((institution) => (
            <li
              key={institution.id}
              style={styles.resultItem}
              onClick={() => handleInstitutionClick(institution)}
            >
              <strong>{institution.name}</strong>
              <p>{institution.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "16px 0",
    width: "100%",
    maxWidth: "600px",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  iconButton: {
    padding: "10px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
  results: {
    listStyle: "none",
    padding: 0,
    marginTop: "16px",
  },
  resultItem: {
    padding: "12px",
    borderBottom: "1px solid #ccc",
    cursor: "pointer",
  },
};

export default SearchBar;
