export type FilmType = type Movie = {
  status: null | string;
  externalId: {
    tmdb: number;
    kpHD: null | string;
    imdb: string;
  },
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  },
  votes: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  },
  backdrop: {
    url: null | string;
    previewUrl: null | string;
  },
  movieLength: number;
  images: {
    postersCount: number;
    backdropsCount: number;
    framesCount: number;
  },
  productionCompanies: Array<{
    name: string;
    url: null | string;
    previewUrl: null | string;
  }>,
  spokenLanguages: Array<{
    name: string;
    nameEn: string;
  }>,
  id: number;
  type: "movie" | "series" | string;
  name: null | string;
  description: null | string;
  distributors: {
    distributor: null | string;
    distributorRelease: null | string;
  },
  premiere: {
    world: string | null;
    bluray: string | null;
    cinema: string | null;
    digital: string | null;
    dvd: string | null;
    russia: string | null;
  },
  slogan: string;
  year: number;
  budget: {
    value: number;
    currency: string;
  },
  poster: {
    url: string;
    previewUrl: string;
  },
  facts: Array<unknown>;
  genres: Array<{
    name: string;
  }>,
  countries: Array<{
    name: string;
  }>,
  seasonsInfo: Array<unknown>;
  persons: Array<{
    id: number;
    photo: string;
    name: string;
    enName: string;
    description: string | null;
    profession: string;
    enProfession: string;
  }>,
  lists: Array<unknown>;
  typeNumber: number;
  alternativeName: string;
  enName: null | string;
  names: Array<unknown>;
  ratingMpaa: string;
  shortDescription: null | string;
  technology: {
    hasImax: boolean;
    has3D: boolean;
  },
  ticketsOnSale: boolean;
  updatedAt: string;
  similarMovies: Array<unknown>;
  fees: {
    world: Record<string, unknown>;
    russia: Record<string, unknown>;
    usa: Record<string, unknown>;
  },
  sequelsAndPrequels: Array<unknown>;
  ageRating: null | number;
  logo: {
    url: null | string;
  },
  top10: null | number;
  top250: null | number;
  deletedAt: null | string;
  isSeries: boolean;
  seriesLength: null | number;
  totalSeriesLength: null | number;
  networks: null | unknown;
  videos: {
    trailers: Array<unknown>;
  },
  isTmdbChecked: boolean;
  watchability: {
    items: Array<unknown>;
  },
  userRatingsParsed: boolean;
  keywordsParsed: boolean;
  studioParsed: boolean;
};