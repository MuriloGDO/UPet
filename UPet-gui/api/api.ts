import axios from 'axios'
import { Alert } from 'react-native'

export const baseUrl = 'http://localhost:8000/'
export const api = axios.create({
  baseURL: `${baseUrl}api/`,
})

export const systemApiService = {
    login : async (email: string, password: string) =>{
        try{
            const formData = new FormData()
            formData.append('email', email)
            formData.append('password', password)
            const response = await api.post('/login/', formData, {
                responseType:'json'
            })
            Alert.alert('Login realizado com sucesso')
        }catch(err){
            Alert.alert('Erro ao realizar login')
        }
    },
    registerUser : async (name: string, telephone: string, email:string, 
        dateOfBirth: string, address:string, cpf:string, photo: string|undefined|null, description: string, password: string) =>{
        try{
            const formData = new FormData()
            formData.append('name', name)
            formData.append('telephone', telephone)
            formData.append('email', email)
            formData.append('date_of_birth', dateOfBirth)
            formData.append('address', address)
            formData.append('cpf', cpf)
            formData.append('description', description)
            formData.append('password', password)
            photo ? formData.append('photo', photo) : undefined
            await api.post('/user_register/', formData, {
                responseType:'json'
            })
            Alert.alert('Usuário criado com sucesso')
        }catch(err){
            Alert.alert('Erro ao registrar usuário')
        }
    }
}