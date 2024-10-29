import React from 'react';
import { TextInput, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'
import { setaddress, setBirth, setCpf, setDescription, setEmail, setName, setPassword, setPhone, setPhoto } from '../../redux/slices/registerUserSlice';
import { sharedStyles } from '../../app/styles/sharedStyle';
import { registerUserInputsStyles } from './style';
import { pickImage } from '../../app/utils/getPhotos';


export const RegisterUserInput = () => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.registerUser.name)
  const email = useSelector((state: RootState) => state.registerUser.email)
  const phone = useSelector((state: RootState) => state.registerUser.phone)
  const birth = useSelector((state: RootState) => state.registerUser.birth)
  const address = useSelector((state: RootState) => state.registerUser.address)
  const cpf = useSelector((state: RootState) => state.registerUser.cpf)
  const description = useSelector((state: RootState) => state.registerUser.description)
  const password = useSelector((state: RootState) => state.registerUser.password)
  const photo = useSelector((state: RootState) => state.registerUser.photo)

  const handlePhotoChange = async () =>{
    const imageUri = await pickImage()
    dispatch(setPhoto(imageUri))
  }

  const handleBirthChange = (input: string) => {

    const numbers = input.replace(/\D/g, '');

    const formatted = numbers
      .replace(/(\d{2})(\d{2})(\d{0,4})?/, '$1/$2/$3') 
      .slice(0, 10); 

    dispatch(setBirth(formatted));
  };

  return (
    <>
      <Text style={sharedStyles.inputLabels}>Nome:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Digite aqui seu Nome"
          value={name}
          onChangeText={(name)=> dispatch(setName(name))}
        />
      <Text style={sharedStyles.inputLabels}>Telefone:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Digite aqui seu Telefone"
          value={phone}
          onChangeText={(phone)=> dispatch(setPhone(phone))}
        />
      <Text style={sharedStyles.inputLabels}>Email:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Digite aqui seu Email"
          value={email}
          onChangeText={(email)=> dispatch(setEmail(email))}
        />
        <Text style={sharedStyles.inputLabels}>Data de nascimento:</Text>
      <TextInput
        style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
        placeholder="DD/MM/AAAA"
        value={birth}
        onChangeText={handleBirthChange}
        keyboardType="numeric" // Aceitar apenas números
        maxLength={10} // Limitar o comprimento a 10 caracteres (DD/MM/AAAA)
      />
      <Text style={sharedStyles.inputLabels}>Endereço:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Digite aqui seu Enderço"
          value={address}
          onChangeText={(address)=> dispatch(setaddress(address))}
        />
        <Text style={sharedStyles.inputLabels}>Cpf:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Cpf (somente números)"
          value={cpf}
          onChangeText={(cpf)=> dispatch(setCpf(cpf))}
        />
        <Text style={sharedStyles.inputLabels}>Foto:</Text>
        <TouchableOpacity onPress={handlePhotoChange} style={[sharedStyles.buttonStyle, registerUserInputsStyles.photoButtonStyle]}>
          <Text style={{color:'white'}}>{photo ? 'Trocar foto de perfil' : 'Escolha foto de perfil'}</Text>
        </TouchableOpacity>
        <Text style={sharedStyles.inputLabels}>Descrição:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Descrição detalhada sobre você"
          value={description}
          onChangeText={(description)=> dispatch(setDescription(description))}
        />
        <Text style={sharedStyles.inputLabels}>Senha:</Text>
        <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Crie uma senha"
          value={password}
          onChangeText={(password)=> dispatch(setPassword(password))}
          secureTextEntry={true}
        />
    </>
  );
}


