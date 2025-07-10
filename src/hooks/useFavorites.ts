import { useLocalStorage } from "./useLocaleStorage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<any[]>("favorites", []);

  const addToFavorite = (film: any) => {
    setFavorites((prev) => {
      let searchableFilm = prev.find((f) => f.id === film.id);

      if (searchableFilm) {
        return [...prev.filter((f) => f.id !== film.id)];
      }

      return [...prev, film];
    });
  };

  const isFavorite = (filmId: number): boolean => {
    return favorites.some((f) => f.id === filmId);
  };

  return { favorites, addToFavorite, isFavorite };
};
