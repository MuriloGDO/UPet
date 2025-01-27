import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { router } from "expo-router"; // Ou use "next/router" para Next.js
import { systemApiService } from "../../api/api";

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
      const data = await systemApiService.searchInstitutions(searchTerm);
      setResults(data);
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
        <div style={styles.cardsContainer}>
          {results.map((institution) => (
            <div
              key={institution.id}
              style={styles.card}
              onClick={() => handleInstitutionClick(institution)}
            >
              <p style={styles.cardDetail}>{institution.name}</p>
              <p style={styles.cardDetail}>CNPJ: {institution.cnpj}</p>
            </div>
          ))}
        </div>
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
  } as React.CSSProperties,
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  } as React.CSSProperties,
  iconButton: {
    padding: "10px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  } as React.CSSProperties,
  cardsContainer: {
    display: "flex",
    flexDirection: "column" as "column", // Valor explícito esperado
    gap: "12px",
    marginTop: "16px",
  } as React.CSSProperties,
  card: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    backgroundColor: "#fff",
    transition: "transform 0.2s, box-shadow 0.2s",
  } as React.CSSProperties,
  cardDetail: {
    fontSize: "14px",
    marginBottom: "4px",
    color: "#555",
  } as React.CSSProperties,
};


export default SearchBar;
