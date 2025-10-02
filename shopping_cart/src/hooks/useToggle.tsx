import { useState } from "react";

export default function useToggle(
  defaultState: boolean
): [boolean, () => void] {
  const [isShown, setIsShown] = useState(defaultState);

  function flipToggle() {
    setIsShown((prev) => (prev ? false : true));
  }

  return [isShown, flipToggle];
}
