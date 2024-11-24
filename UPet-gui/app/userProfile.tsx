import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Importação necessária
import { ImageLibraryOptions } from 'react-native-image-picker';


export default function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  
    const addPhoto = () => {
    const options: ImageLibraryOptions = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
    };

    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
        Alert.alert('Cancelado', 'Nenhuma foto foi selecionada.');
        } else if (response.errorMessage) {
        Alert.alert('Erro', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0]?.uri ?? null;
            setPhoto(uri);
        }
    });
    };

  return (
    <ScrollView style={styles.container}>
      {/* Foto do usuário */}
      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <TouchableOpacity onPress={addPhoto} style={styles.addPhotoButton}>
            <Text style={styles.addPhotoText}>Adicionar Foto</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Nome */}
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={setName}
        placeholder="Nome do usuário"
        placeholderTextColor="#999"
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      {/* Telefone */}
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Telefone"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      {/* Endereço */}
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Endereço"
        placeholderTextColor="#999"
      />

      {/* Descrição */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
        placeholderTextColor="#999"
        multiline
      />

      {/* Botão de salvar (opcional, pode fazer algo mais funcional) */}
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Salvo!', 'Dados atualizados!')}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  addPhotoButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  addPhotoText: {
    color: '#888',
    fontSize: 14,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    color: '#333',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
