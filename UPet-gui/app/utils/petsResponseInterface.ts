interface Cluster {
    id: number;
    name: string;
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
  }
  