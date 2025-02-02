import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Footer } from '../components/footer';
import { pickImage } from './utils/getPhotos';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setEditaddress, setEditEmail, setEditName, setEditPhone} from '../redux/slices/editInstitutionSlice';
import { useDispatch } from 'react-redux';
import { systemApiService } from '../api/api';
import { setInstAddress, setInstEmail, setInstName, setInstPhone } from '../redux/slices/institutionInfoSlice';
import { setLoading } from '../redux/slices/uiSlice';


export default function UserProfile() {
  
  const nameCopy = useSelector((state: RootState) => state.institutionInfo.name)
  const emailCopy = useSelector((state: RootState) => state.institutionInfo.email)
  const phoneCopy = useSelector((state: RootState) => state.institutionInfo.telephone)
  const addressCopy = useSelector((state: RootState) => state.institutionInfo.address)

  useEffect(()=>{
    dispatch(setInstName(nameCopy))
    dispatch(setInstPhone(phoneCopy))
    dispatch(setInstEmail(emailCopy))
    dispatch(setInstAddress(addressCopy))
  }, [])

  const onSave = async() =>{
    dispatch(setLoading(true))
    const response = await systemApiService.editInstitution(name, email, phone, address)
    dispatch(setInstName(response.name))
    dispatch(setInstAddress(response.address))
    dispatch(setInstEmail(response.email))
    dispatch(setInstPhone(response.telephone))
    dispatch(setLoading(false))

  }

  const dispatch = useDispatch()

  const photo = useSelector((state: RootState) => state.userEdit.photo)
  const name = useSelector((state: RootState) => state.userEdit.name)
  const email = useSelector((state: RootState) => state.userEdit.email)
  const phone = useSelector((state: RootState) => state.userEdit.telephone)
  const address = useSelector((state: RootState) => state.userEdit.address)


  return (
    <>
    <ScrollView style={styles.container}>

      {/* Nome */}
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={(name)=>dispatch(setEditName(name))}
        placeholder="Nome da instituição"
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
