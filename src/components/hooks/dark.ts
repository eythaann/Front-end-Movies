export const useDark = () => {
  if (localStorage.getItem("dark") === "true") return true;
  return false;
};
