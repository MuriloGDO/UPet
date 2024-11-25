import React from 'react';
import { TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'
import { setSpecies, setDateOfBirth, setDescription, setName, setPhoto } from '../../redux/slices/registerPetSlice';
import { sharedStyles } from '../../app/styles/sharedStyle';
import { registerPetInputsStyles } from './style';
import { pickImage } from '../../app/utils/getPhotos';

export const RegisterPetInput = () => {
  const dispatch = useDispatch()
  const description = useSelector((state: RootState) => state.registerPet.description)
  const photo = useSelector((state: RootState) => state.registerPet.photo)
  const name = useSelector((state: RootState) => state.registerPet.name)
  const species = useSelector((state: RootState) => state.registerPet.species)
  const date_of_birth = useSelector((state: RootState) => state.registerPet.date_of_birth)

  const handleBirthChange = (input: string) => {

    const numbers = input.replace(/\D/g, '');

    const formatted = numbers
      .replace(/(\d{2})(\d{2})(\d{0,4})?/, '$1/$2/$3') 
      .slice(0, 10); 

    dispatch(setDateOfBirth(formatted));
  };

  const handlePhotoChange = async () =>{
    const imageUri = await pickImage()
    dispatch(setPhoto(imageUri))
  }

  return (
    <>
        <Image style={registerPetInputsStyles.registerImageStyle} 
        source={photo ? { uri: `data:image/jpeg;base64,${photo}` } : require('../../assets/user_not_found.jpeg')} />

        <TouchableOpacity onPress={handlePhotoChange} style={[sharedStyles.buttonStyle, registerPetInputsStyles.photoButtonStyle]}>
          <Text style={{color:'white'}}>{photo ? 'Trocar foto do pet' : 'Escolha foto do pet'}</Text>
        </TouchableOpacity>
        <TextInput
          style={[sharedStyles.input, registerPetInputsStyles.inputMargin]}
          placeholder="Digite aqui o nome do pet"
          value={name}
          onChangeText={(name)=> dispatch(setName(name))}
        />
        <TextInput
          style={[sharedStyles.input, registerPetInputsStyles.inputMargin]}
          placeholder="Digite aqui a espécie do pet"
          value={species}
          onChangeText={(species)=> dispatch(setSpecies(species))}
        />
        <TextInput
          style={[sharedStyles.input, registerPetInputsStyles.inputMargin]}
          placeholder="DD/MM/AAAA"
          value={date_of_birth}
          onChangeText={handleBirthChange}
        />
        <TextInput
          style={[sharedStyles.input, registerPetInputsStyles.inputMargin, {
            height:180,
            borderRadius:10,
            textAlignVertical:'top',
            padding:10,
          }]}
          value={description}
          placeholder='Faça aqui uma descrição do seu pet'
          onChangeText={(description)=> dispatch(setDescription(description))}
          multiline={true}
          scrollEnabled={true}
        />
    </>
  );
}