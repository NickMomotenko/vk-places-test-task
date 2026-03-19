import type { FilmType } from "../helpers/types";
import { useLocalStorage } from "./useLocaleStorage";

export const useComprasionData = () => {
  const [comprasionData, setComprasionData] = useLocalStorage<FilmType[]>(
    "comprasion",
    [],
  );

  const addToComprasion = (film: FilmType) => {  
    setComprasionData((prev) => {
      const isAlreadyAdded = prev.some((f) => f.id === film.id);
      if (isAlreadyAdded) {
        return prev.filter((f) => f.id !== film.id);
      }

      if (prev.length >= 2) {
        return [...prev.slice(1), film]; 
      }

      return [...prev, film];
    });
  };

  const isCompresed = (filmId: number): boolean => {
    return comprasionData.some((f) => f.id === filmId);
  };

  return { comprasionData, addToComprasion, isCompresed };
};
