interface Cluster {
    id: number;
    name: string;
  }
  
interface PetPhoto {
  id: number;
  photo:string;
  uploaded_at: string;
}

export interface MatchingPet {
    id: number;
    name: string;
    date_of_birth: string;
    species: string;
    description: string;
    status: string;
    clusters: Cluster[];
    percentage: number;
    photos: PetPhoto[];
  }
  