const useDate = () => {
  const q = new Date();
  const m = q.getMonth();
  const d = q.getUTCDate();
  const y = q.getFullYear();

  return new Date(y, m, d);
};

export default useDate;