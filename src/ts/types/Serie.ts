// src/ts/types/Serie.ts
export interface Serie {
    id: number;
    name: string;
    first_air_date: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    genres: Genre[];
    tagline?: string;
    production_companies: ProductionCompany[];
  }
  
  export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  