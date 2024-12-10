import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Footer } from '../components/footer';
import { pickImage } from './utils/getPhotos';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setEditaddress, setEditDescription, setEditEmail, setEditName, setEditPhone, setEditPhoto } from '../redux/slices/editUserSlice';
import { useDispatch } from 'react-redux';
import { systemApiService } from '../api/api';
import { setaddress, setDescription, setEmail, setName, setPhone, setPhoto } from '../redux/slices/userInfoSlice';
import { setLoading } from '../redux/slices/uiSlice';


export default function UserProfile() {
  
  const photoCopy = useSelector((state: RootState) => state.userInfo.photo)
  const nameCopy = useSelector((state: RootState) => state.userInfo.name)
  const emailCopy = useSelector((state: RootState) => state.userInfo.email)
  const phoneCopy = useSelector((state: RootState) => state.userInfo.telephone)
  const addressCopy = useSelector((state: RootState) => state.userInfo.address)
  const descriptionCopy = useSelector((state: RootState) => state.userInfo.description)
  const userId = useSelector((state: RootState) => state.userInfo.id)

  useEffect(()=>{
    dispatch(setEditName(nameCopy))
    dispatch(setEditPhoto(photoCopy))
    dispatch(setEditPhone(phoneCopy))
    dispatch(setEditEmail(emailCopy))
    dispatch(setEditaddress(addressCopy))
    dispatch(setEditDescription(descriptionCopy))
  }, [])

  const onSave = async() =>{
    dispatch(setLoading(true))
    const response = await systemApiService.editUser(photo, name, email, phone, address, description, userId)
    dispatch(setName(response.name))
    dispatch(setaddress(response.address))
    dispatch(setDescription(response.description))
    dispatch(setEmail(response.email))
    dispatch(setPhone(response.telephone))
    dispatch(setPhoto(response.photo))
    dispatch(setLoading(false))

  }


  const dispatch = useDispatch()

  const photo = useSelector((state: RootState) => state.userEdit.photo)
  const name = useSelector((state: RootState) => state.userEdit.name)
  const email = useSelector((state: RootState) => state.userEdit.email)
  const phone = useSelector((state: RootState) => state.userEdit.telephone)
  const address = useSelector((state: RootState) => state.userEdit.address)
  const description = useSelector((state: RootState) => state.userEdit.description)

  const handlePhotoChange = async () =>{
    const imageUri = await pickImage()
    dispatch(setEditPhoto(imageUri))
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
        onChangeText={(name)=>dispatch(setEditName(name))}
        placeholder="Nome do usuário"
        placeholderTextColor="#999"
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(email)=>dispatch(setEditEmail(email))}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      {/* Telefone */}
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(phone)=>dispatch(setEditPhone(phone))}
        placeholder="Telefone"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      {/* Endereço */}
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(address)=>dispatch(setEditaddress(address))}
        placeholder="Endereço"
        placeholderTextColor="#999"
      />

      {/* Descrição */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={(description)=>dispatch(setEditDescription(description))}
        placeholder="Descrição"
        placeholderTextColor="#999"
        multiline
      />

          {/* Botão de salvar (opcional, pode fazer algo mais funcional) */}
          <TouchableOpacity style={styles.saveButton} onPress={() => onSave()}>
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
