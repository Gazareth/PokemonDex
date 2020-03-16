import { useEffect } from "react";

const useKeyDown = keyDownFunction =>
  useEffect(() => {
    document.addEventListener("keydown", keyDownFunction, false);

    return () => {
      document.removeEventListener("keydown", keyDownFunction, false);
    };
  }, [keyDownFunction]);

export default useKeyDown;
