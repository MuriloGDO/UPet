import axios from 'axios'
import { Alert } from 'react-native'
import { setLoading } from '../redux/slices/uiSlice';

export const baseUrl = 'http://127.0.0.1:8000/'
export const api = axios.create({
  baseURL: `${baseUrl}api/`,
})

interface ErrorResponse {
    response: { data: {error: string} };
}

export const systemApiService = {
    login : async (email: string, password: string) =>{
        try{
            const formData = new FormData()
            formData.append('email', email)
            formData.append('password', password)
            const response = await api.post('/login/', formData, {
                responseType:'json'
            })
            return response.data
        }catch(err) {
            const error = err as ErrorResponse;
            Alert.alert(error.response.data.error);
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
        }catch(err) {
            const error = err as ErrorResponse;
            Alert.alert(error.response.data.error);
        }
    },
    registerPet: async (name: string, description: string, species: string,
        date_of_birth: string, photo: string|undefined|null, institutionId: number|null) =>{
        try{
            const payload = {
                pet: {
                    name,
                    date_of_birth,
                    species,
                    description,
                    status: "Available",
                },
                photos: photo ? [ {photo} ] : [],
                register: {
                    institution: institutionId,
                    date_of_registration: new Date().toISOString().split("T")[0]
                }
            }
            await api.post('/pet_register/', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            Alert.alert('Pet criado com sucesso')
        }catch(err) {
            const error = err as ErrorResponse;
            Alert.alert(error.response.data.error);
            
        }
    },
    editUser: async (photo: string | undefined | null, name:string, email:string, phone:string, address:string, description:string, id: number | null) =>{
        try{
            const response = await api.patch('/user_update/',{photo: photo ? photo: '', name:name, email:email, telephone:phone, address:address, description:description, id:id}, {
                responseType:'json'
            })
            Alert.alert('Perfil editado com sucesso!')
            return response.data
        }catch(err) {
            const error = err as ErrorResponse;
            Alert.alert(error.response.data.error);

        }
    },
    registerInstitute: async (name: string, email: string, telephone: string, address: string, cnpj: string, password: string) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('telephone', telephone);
            formData.append('email', email);              
            formData.append('address', address);
            formData.append('cnpj', cnpj);
            formData.append('password', password);

            const response = await api.post('/institution_register/', formData, {
                responseType: 'json'
            });

            Alert.alert('Instituição criada com sucesso');
            return response.data;
        } catch (err) {
            const error = err as ErrorResponse;
            Alert.alert(error.response.data.error);
        }
    },
    getMatchingPets: async (user_id: number | null) => {
        try {
            const response = await api.post('/user_search_pet', {id: user_id}, {
                responseType: 'json'
            });
            return response.data
        } catch (err) {
            const error = err as ErrorResponse;
            Alert.alert(error.response.data.error);
        }
    },
    searchInstitutions: async (name: string) => {
        try {
            const response = await api.post('/institution_search_by_filters/', {name: name}, {
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            const error = err as ErrorResponse;
            Alert.alert(error.response.data.error);
        }
    },
    fetchPetCount: async (id: string | null) => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/institution_count_pets/', {
            id: id,
          });
          return response.data;
        } catch (err) {
          const error = err as ErrorResponse;
          Alert.alert(error.response.data.error);
        }
    },
}