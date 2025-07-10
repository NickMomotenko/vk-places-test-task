import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const getValue = (): T => {
    const storage = localStorage.getItem(key);
    if (storage) {
      try {
        return JSON.parse(storage) as T;
      } catch (e) {
        console.warn(`Parsing error for key "${key}" in localStorage`, e);
      }
    }
    return initialValue;
  };

  const [data, setData] = useState<T>(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
};
