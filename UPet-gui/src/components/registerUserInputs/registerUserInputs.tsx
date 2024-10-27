import React, { useState } from 'react';
import { TextInput, Text } from 'react-native';
import { userRegisterStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'
import { setAdress, setBirth, setCpf, setDescription, setEmail, setName, setPassword, setPhone } from '../../../redux/slices/registerUserSlice';
import { registerStyles } from '../../styles/register';


export const RegisterUserInput = () => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.registerUser.name)
  const email = useSelector((state: RootState) => state.registerUser.email)
  const phone = useSelector((state: RootState) => state.registerUser.phone)
  const birth = useSelector((state: RootState) => state.registerUser.birth)
  const adress = useSelector((state: RootState) => state.registerUser.adress)
  const cpf = useSelector((state: RootState) => state.registerUser.cpf)
  const description = useSelector((state: RootState) => state.registerUser.description)
  const password = useSelector((state: RootState) => state.registerUser.password)

  return (
    <>
      <Text style={userRegisterStyles.text}>Nome:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Digite aqui seu Nome"
          value={name}
          onChangeText={(name)=> dispatch(setName(name))}
        />
      <Text style={userRegisterStyles.text}>Telefone:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Digite aqui seu Telefone"
          value={phone}
          onChangeText={(phone)=> dispatch(setPhone(phone))}
        />
      <Text style={userRegisterStyles.text}>Email:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Digite aqui seu Email"
          value={email}
          onChangeText={(email)=> dispatch(setEmail(email))}
        />
        <Text style={userRegisterStyles.text}>Data de nascimento:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Digite aqui sua Data de nascimento"
          value={birth}
          onChangeText={(birth)=> dispatch(setBirth(birth))}
        />
      <Text style={userRegisterStyles.text}>Endereço:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Digite aqui seu Enderço"
          value={adress}
          onChangeText={(adress)=> dispatch(setAdress(adress))}
        />
        <Text style={userRegisterStyles.text}>Cpf:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Digite aqui seu Cpf"
          value={cpf}
          onChangeText={(cpf)=> dispatch(setCpf(cpf))}
        />
        <Text style={userRegisterStyles.text}>Foto:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Escolha uma foto"
          value={name}
          onChangeText={(name)=> dispatch(setName(name))}
        />
        <Text style={userRegisterStyles.text}>Descrição:</Text>
      <TextInput
          style={userRegisterStyles.input}
          placeholder="Faça uma breve descrição sobre sua casa, rotina e personalidade"
          value={description}
          onChangeText={(description)=> dispatch(setDescription(description))}
        />
        <Text style={userRegisterStyles.text}>Senha:</Text>
        <TextInput
          style={userRegisterStyles.input}
          placeholder="Crie uma senha"
          value={password}
          onChangeText={(password)=> dispatch(setPassword(password))}
          secureTextEntry={true}
        />
    </>
  );
}


