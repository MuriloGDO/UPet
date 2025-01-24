import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importa o ícone de lupa

interface SearchBarProps {
  placeholder?: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Digite para pesquisar...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={styles.input}
      />
      <button type="submit" style={styles.iconButton}>
        <FaSearch size={16} /> {/* Ícone de busca */}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "16px 0",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    border: "none",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SearchBar;
