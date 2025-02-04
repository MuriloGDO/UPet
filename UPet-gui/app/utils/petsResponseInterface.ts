interface Cluster {
    id: number;
    name: string;
  }
  
interface PetPhoto {
  id: number;
  photo:string;
  uploaded_at: string;
}

interface Institution {
  adress: number;
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
  