interface Cluster {
    id: number;
    name: string;
  }
  
export interface PetPhoto {
  id: number;
  photo:string;
  uploaded_at: string;
}

interface Institution {
  address: string;
  email:string;
  id: number;
  name: string;
  telephone: string;
}

export interface MatchingPet {
    id: number;
    institution: Institution | null;
    name: string;
    date_of_birth: string;
    species: string;
    description: string;
    status: string;
    clusters: Cluster[];
    percentage: number;
    photos: PetPhoto[];
  }

export interface Chat{
    id: string,
    institution: Institution
    name: string
    user: User
    pet: Pet
  }
  
export  interface User{
    id: number
    name:string
    telephone:string
    email:string
    date_of_birth: string
    adress: string
    cpf: string
    photo:string
    description: string
  }
  
export  interface Pet{
    id: number
    name:string
    date_of_birth:string
    species:string
    description: string
    status: string
    photos:PetPhoto[]
  }
  