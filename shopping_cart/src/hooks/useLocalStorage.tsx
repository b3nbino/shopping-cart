import { useEffect, useState } from "react";

export default function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
  const [keyValue, setKeyvalue] = useState(() => localStorage.getItem(key));

  useEffect(() => {
    if (keyValue === null) {
      setStorage(defaultValue);
    }
  });

  function setStorage(value: string) {
    localStorage.setItem(key, value);

    setKeyvalue(value);
  }

  return [keyValue || defaultValue, setStorage];
}
