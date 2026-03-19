import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
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

  // Слушаем кастомный event от других экземпляров хука
  useEffect(() => {
    const handleLocalStorageChange = (e: Event) => {
      const { key: eventKey, newValue } = (e as CustomEvent).detail;
      if (eventKey === key) {
        setData(newValue);
      }
    };

    window.addEventListener("local-storage-update", handleLocalStorageChange);
    return () =>
      window.removeEventListener(
        "local-storage-update",
        handleLocalStorageChange,
      );
  }, [key]);

  // При изменении data — пишем в localStorage и диспатчим event
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));

    window.dispatchEvent(
      new CustomEvent("local-storage-update", {
        detail: { key, newValue: data },
      }),
    );
  }, [key, data]);

  return [data, setData];
};
