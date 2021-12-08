import { useState } from "react";

export const useForceUpdate = () => {
  const set = useState(0)[1];
  return () => set((s) => s + 1);
};
