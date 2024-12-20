import React from 'react';
import { TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'
import { setaddress, setEmail, setName, setPassword, setPhone, setCnpj } from '../../redux/slices/registerInstituteSlice';
import { sharedStyles } from '../../app/styles/sharedStyle';


export const RegisterInstituteInput = () => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.registerInstitute.name)
  const email = useSelector((state: RootState) => state.registerInstitute.email)
  const phone = useSelector((state: RootState) => state.registerInstitute.phone)
  const address = useSelector((state: RootState) => state.registerInstitute.address)
  const cnpj = useSelector((state: RootState) => state.registerInstitute.cnpj)
  const password = useSelector((state: RootState) => state.registerInstitute.password)

  return (
    <>
      <Text style={sharedStyles.inputLabels}>Nome:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Nome da instituição"
          value={name}
          onChangeText={(name)=> dispatch(setName(name))}
        />
      <Text style={sharedStyles.inputLabels}>Telefone:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={(phone)=> dispatch(setPhone(phone))}
        />
      <Text style={sharedStyles.inputLabels}>Email:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Email da instituição"
          value={email}
          onChangeText={(email)=> dispatch(setEmail(email))}
        />
      <Text style={sharedStyles.inputLabels}>Endereço:</Text>
      <TextInput
          style={sharedStyles.input}
          placeholder="Enderço da instituição"
          value={address}
          onChangeText={(address)=> dispatch(setaddress(address))}
        />
        <Text style={sharedStyles.inputLabels}>CNPJ:</Text>
        <TextInput
          style={sharedStyles.input}
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={(cnpj)=> dispatch(setCnpj(cnpj))}
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


