import React from 'react';
import { TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'
import { setAdress, setEmail, setName, setPassword, setPhone } from '../../redux/slices/registerInstituteSlice';
import { sharedStyles } from '../../app/styles/sharedStyle';


export const RegisterInstituteInput = () => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.registerInstitute.name)
  const email = useSelector((state: RootState) => state.registerInstitute.email)
  const phone = useSelector((state: RootState) => state.registerInstitute.phone)
  const adress = useSelector((state: RootState) => state.registerInstitute.adress)
  const password = useSelector((state: RootState) => state.registerInstitute.password)

  return (
    <>
      <Text style={sharedStyles.inputLabels}>Nome:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Digite aqui seu Nome"
          value={name}
          onChangeText={(name)=> dispatch(setName(name))}
        />
      <Text style={sharedStyles.inputLabels}>Telefone:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Digite aqui seu Telefone"
          value={phone}
          onChangeText={(phone)=> dispatch(setPhone(phone))}
        />
      <Text style={sharedStyles.inputLabels}>Email:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Digite aqui seu Email"
          value={email}
          onChangeText={(email)=> dispatch(setEmail(email))}
        />
      <Text style={sharedStyles.inputLabels}>Endereço:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Digite aqui seu Enderço"
          value={adress}
          onChangeText={(adress)=> dispatch(setAdress(adress))}
        />
        <Text style={sharedStyles.inputLabels}>Senha:</Text>
        <TextInput
          style={sharedStyles.input}
          placeholder="Crie uma senha"
          value={password}
          onChangeText={(password)=> dispatch(setPassword(password))}
          secureTextEntry={true}
        />
    </>
  );
}


