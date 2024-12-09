import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Footer } from '../components/footer';
import { pickImage } from './utils/getPhotos';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setaddress, setDescription, setEmail, setName, setPhone, setPhoto } from '../redux/slices/editUserSlice';
import { useDispatch } from 'react-redux';


export default function UserProfile() {
  
  const photoCopy = useSelector((state: RootState) => state.userInfo.photo)
  const nameCopy = useSelector((state: RootState) => state.userInfo.name)
  const emailCopy = useSelector((state: RootState) => state.userInfo.email)
  const phoneCopy = useSelector((state: RootState) => state.userInfo.telephone)
  const addressCopy = useSelector((state: RootState) => state.userInfo.address)
  const descriptionCopy = useSelector((state: RootState) => state.userInfo.description)

  useEffect(()=>{
    dispatch(setName(nameCopy))
    dispatch(setPhoto(photoCopy))
    dispatch(setPhone(phoneCopy))
    dispatch(setEmail(emailCopy))
    dispatch(setaddress(addressCopy))
    dispatch(setDescription(descriptionCopy))
  }, [])


  const dispatch = useDispatch()

  const photo = useSelector((state: RootState) => state.userEdit.photo)
  const name = useSelector((state: RootState) => state.userEdit.name)
  const email = useSelector((state: RootState) => state.userEdit.email)
  const phone = useSelector((state: RootState) => state.userEdit.telephone)
  const address = useSelector((state: RootState) => state.userEdit.address)
  const description = useSelector((state: RootState) => state.userEdit.description)

  const handlePhotoChange = async () =>{
    const imageUri = await pickImage()
    dispatch(setPhoto(imageUri))
  }

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.photoContainer}>
          <TouchableOpacity onPress={()=>handlePhotoChange()}>
            <Image style={styles.photo} 
            source={photo ? { uri: `data:image/jpeg;base64,${photo}` } : require('../assets/user_not_found.jpeg')} />
          </TouchableOpacity>
      </View>

      {/* Nome */}
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={(name)=>dispatch(setName(name))}
        placeholder="Nome do usuário"
        placeholderTextColor="#999"
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(email)=>dispatch(setEmail(email))}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      {/* Telefone */}
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(phone)=>dispatch(setPhone(phone))}
        placeholder="Telefone"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      {/* Endereço */}
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(address)=>dispatch(setaddress(address))}
        placeholder="Endereço"
        placeholderTextColor="#999"
      />

      {/* Descrição */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={(description)=>dispatch(setDescription(description))}
        placeholder="Descrição"
        placeholderTextColor="#999"
        multiline
      />

          {/* Botão de salvar (opcional, pode fazer algo mais funcional) */}
          <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Salvo!', 'Dados atualizados!')}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer></Footer>
        </>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginTop:90
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
