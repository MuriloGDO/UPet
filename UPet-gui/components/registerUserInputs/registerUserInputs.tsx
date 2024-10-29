import React from 'react';
import { TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'
import { setaddress, setBirth, setCpf, setDescription, setEmail, setName, setPassword, setPhone } from '../../redux/slices/registerUserSlice';
import { sharedStyles } from '../../app/styles/sharedStyle';
import { registerUserInputsStyles } from './style';


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
          placeholder="Digite aqui sua Data de nascimento"
          value={birth}
          onChangeText={(birth)=> dispatch(setBirth(birth))}
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
          placeholder="Digite aqui seu Cpf"
          value={cpf}
          onChangeText={(cpf)=> dispatch(setCpf(cpf))}
        />
        <Text style={sharedStyles.inputLabels}>Foto:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Escolha uma foto"
          value={name}
          onChangeText={(name)=> dispatch(setName(name))}
        />
        <Text style={sharedStyles.inputLabels}>Descrição:</Text>
      <TextInput
          style={[sharedStyles.input, registerUserInputsStyles.inputMargin]}
          placeholder="Faça uma breve descrição sobre sua casa, rotina e personalidade"
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


